// const EventEmitter = require("events");
// const streamServer = require("./sample_streaming");

const dsb = require("./dsBuffer");
const dsf = require("./dsFile");
// const dss = require("./dsStreaming");

function dsBuffer(buffer) {
  if (buffer == null) return 1;
  dsb(buffer);
}

function dsFile(filepath) {
  if (filepath == null) return 1;
  dsf(filepath);
}

// function dsStreaming(emmiter) {
//   const myEmitter = emmiter || new EventEmitter();
//   const audioStreamCb = dss(myEmitter);
//   streamServer(audioStreamCb, myEmitter);
// }

module.exports = {
  dsBuffer: dsBuffer,
  dsFile: dsFile
  // dsStreaming: dsStreaming
};
