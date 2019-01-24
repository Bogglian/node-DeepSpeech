import dsb from "./dsBuffer";
import dsf from "./dsFile";

function dsBuffer(buffer) {
  if (!buffer) return 1;
  dsb(buffer);
}

function dsFile(filepath) {
  if (!filepath) return 1;
  dsf(filepath);
}

module.exports = {
  dsBuffer: dsBuffer,
  dsFile: dsFile
};
