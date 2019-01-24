const EventEmitter = require("events");
const streamServer = require("./sample_streaming");

import dsb from "./dsBuffer";
import dsf from "./dsFile";
import dss from "./dsStreaming";

function dsBuffer(buffer) {
  if (!buffer) return 1;
  dsb(buffer);
}

function dsFile(filepath) {
  if (!filepath) return 1;
  dsf(filepath);
}

function dsStreaming(emmiter) {
  const myEmitter = emmiter || new EventEmitter();
  const audioStreamCb = dss(myEmitter);
  streamServer(audioStreamCb, myEmitter);
}

module.exports = {
  dsBuffer: dsBuffer,
  dsFile: dsFile,
  dsStreaming: dsStreaming
};
