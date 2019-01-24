#!/usr/bin/env node
const Fs = require("fs");
const Sox = require("sox-stream");
const DeepSpeech = require("deepspeech");
const MemoryStream = require("memory-stream");
const Wav = require("node-wav");
const { Duplex } = require("stream");
require("dotenv").config();

module.exports = filePath => {
  const AUDIO = filePath || "./audio/4507-16021-0012.wav";

  const modelsPath = process.env.DEEPSPEECH_MODEL_PATH || "./models";
  const MODEL = modelsPath + "/output_graph.pb";
  const ALPHABET = modelsPath + "/alphabet.txt";
  const LM = modelsPath + "/lm.binary";
  const TRIE = modelsPath + "/trie";
  // These constants control the beam search decoder

  // Beam width used in the CTC decoder when building candidate transcriptions
  const BEAM_WIDTH = 500;

  // The alpha hyperparameter of the CTC decoder. Language Model weight
  const LM_ALPHA = 0.75;

  // The beta hyperparameter of the CTC decoder. Word insertion bonus.
  const LM_BETA = 1.85;

  // These constants are tied to the shape of the graph used (changing them changes
  // the geometry of the first layer), so make sure you use the same constants that
  // were used during training

  // Number of MFCC features to use
  const N_FEATURES = 26;

  // Size of the context window used for producing timesteps in the input vector
  const N_CONTEXT = 9;

  function totalTime(hrtimeValue) {
    return (hrtimeValue[0] + hrtimeValue[1] / 1000000000).toPrecision(4);
  }

  const audioBuffer = Fs.readFileSync(AUDIO);
  const result = Wav.decode(audioBuffer);

  if (result.sampleRate < 16000) {
    console.error(
      `Warning: original sample rate (${
        result.sampleRate
      }) is lower than 16kHz. Up-sampling might produce erratic speech recognition.`
    );
  }

  function bufferToStream(buffer) {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  const audioStream = new MemoryStream();
  bufferToStream(audioBuffer)
    .pipe(
      Sox({
        global: {
          "no-dither": true
        },
        output: {
          bits: 16,
          rate: 16000,
          channels: 1,
          encoding: "signed-integer",
          endian: "little",
          compression: 0.0,
          type: "raw"
        }
      })
    )
    .pipe(audioStream);

  audioStream.on("finish", () => {
    const streamBuffer = audioStream.toBuffer();

    console.error("Loading model from file %s", MODEL);
    const modelLoadStart = process.hrtime();
    const model = new DeepSpeech.Model(
      MODEL,
      N_FEATURES,
      N_CONTEXT,
      ALPHABET,
      BEAM_WIDTH
    );
    const modelLoadEnd = process.hrtime(modelLoadStart);
    console.error("Loaded model in %ds.", totalTime(modelLoadEnd));

    if (LM && TRIE) {
      console.error("Loading language model from files %s %s", LM, TRIE);
      const lmLoadStart = process.hrtime();
      model.enableDecoderWithLM(ALPHABET, LM, TRIE, LM_ALPHA, LM_BETA);
      const lmLoadEnd = process.hrtime(lmLoadStart);
      console.error("Loaded language model in %ds.", totalTime(lmLoadEnd));
    }

    const inferenceStart = process.hrtime();
    console.error("Running inference.");
    const audioLength = (streamBuffer.length / 2) * (1 / 16000);

    // We take half of the buffer_size because buffer is a char* while
    // LocalDeepSpeechSTT() expected a short*
    console.log(
      model.stt(streamBuffer.slice(0, streamBuffer.length / 2), 16000)
    );
    const inferenceStop = process.hrtime(inferenceStart);
    console.error(
      "Inference took %ds for %ds audio file.",
      totalTime(inferenceStop),
      audioLength.toPrecision(4)
    );
  });
};
