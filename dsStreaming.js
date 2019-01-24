#!/usr/bin/env node

const Sox = require("sox-stream");
const DeepSpeech = require("deepspeech");
const MemoryStream = require("memory-stream");
require("dotenv").config();

module.exports = emitter => {
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

  console.log("Loading model from file %s", MODEL);
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

  return function(stream) {
    const audioStream = new MemoryStream();
    stream
      .pipe(
        Sox({
          output: {
            bits: 16,
            rate: 16000,
            channels: 1,
            type: "raw"
          }
        })
      )
      .pipe(audioStream);

    audioStream.on("finish", () => {
      const audioBuffer = audioStream.toBuffer();
      console.log("Running inference...");
      const text = model.stt(
        audioBuffer.slice(0, audioBuffer.length / 2),
        16000
      );
      console.log("Inference finished: %s", String(text));
      emitter.emit("text", { text });
    });
  };
};
