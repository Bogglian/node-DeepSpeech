const ds = require("./index");
require("dotenv");

const yourDsFileFunction = async () => {
  console.log(await ds.dsFile("./audio/4507-16021-0012.wav"));
};

yourDsFileFunction();
