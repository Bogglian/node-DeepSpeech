import dsf from "./dsFile";

function dsFile(filepath) {
  if (!filepath) return 1;
  dsf(filepath);
}

module.exports = {
  dsFile: dsFile
};
