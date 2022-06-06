const nameOfFile = "output.dsv";
const plToEnPath = "./dictionaries/PLtoEN.dsv";
const enToItPath = "./dictionaries/ENtoIT.dsv";
const plToITPath = `./dictionaries/${nameOfFile}`;

const fs = require("fs");
function readFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");

  return data;
}

function dataFromFileToMap(data) {
  const map = new Map();
  data
    .split(/\r?\n/)
    .filter((element) => element)
    .forEach((element) => {
      let [key, value] = element.split("|");
      map.set(key, value);
    });

  return map;
}

function joinMaps(map1, map2) {
  const map = new Map();
  map1.forEach((value, key) => {
    map.set(key, map2.get(value));
  });

  return map;
}

function formatContent(map) {
  let data = [];
  map.forEach((value, key) => {
    data.push(`${key}|${value}`);
  });
  return data.join("\n");
}

function saveToFile(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function generateDictionary(plToEnPath, enToItPath) {
  try {
    let data = readFile(plToEnPath);
    let mapPlToEn = dataFromFileToMap(data);
    let data2 = readFile(enToItPath);
    let mapEnToIt = dataFromFileToMap(data2);
    let mapPlToIt = joinMaps(mapPlToEn, mapEnToIt);

    const content = formatContent(mapPlToIt);

    saveToFile(plToITPath, content);
  } catch (err) {
    console.error(err);
  }
  return plToITPath;
}


module.exports.readFile = readFile;
module.exports.dataFromFileToMap = dataFromFileToMap;
module.exports.joinMaps = joinMaps;
module.exports.formatContent = formatContent;
module.exports.saveToFile = saveToFile;
module.exports.generateDictionary = generateDictionary;
