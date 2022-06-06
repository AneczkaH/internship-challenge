const {
  readFile,
  dataFromFileToMap,
} = require("./generateDictionary.js");
const {
  joinMaps,
  formatContent,
  saveToFile,
  generateDictionary,
} = require("./generateDictionary.js");

const nameOfFile = "output.dsv";
const plToEnPath = "./dictionaries/PLtoEN.dsv";
const enToItPath = "./dictionaries/ENtoIT.dsv";
const plToITPath = `./dictionaries/${nameOfFile}`;

//test readFile() function
console.log("Read file PLtoEN.dsv");
const data = readFile(plToEnPath);
const dataPattern = "piłka|ball\nsłońce|sun\n";

if (data) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("Check content PLtoEN.dsv an compare with pattern: dataPattern");
if (data === dataPattern) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("Read file ENtoIT.dsv");
const data2 = readFile(enToItPath);
const data2Pattern = "ball|palla\nsun|sole\n";

if (data2) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log(
  "Check content ENtoIT.dsv and compare with pattern: data2 = data2Pattern"
);

if (data2 === data2Pattern) {
  console.log("Pass");
} else {
  console.log("Fail");
}

//test dataFromFileToMap() function
console.log("DataFromFileToMap content to map from PLtoEN.dsv");
const map = dataFromFileToMap(data);
const mapPattern = new Map();
mapPattern.set("piłka", "ball"),
  mapPattern.set("słońce", "sun"),
  console.log(`Map size is equal mapPattern size: ${mapPattern.size}`);
if (map.size === mapPattern.size) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("The Map has a keys: piłka and słońce:");
if (map.has("piłka") === true && map.has("słońce") === true) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log(
  "Check that for key = piłka -> value = ball, and for key = słońce -> value = sun:"
);
if (map.get("piłka") === "ball" && map.get("słońce") === "sun") {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("DataFromFileToMap content to map from ENtoIT.dsv");
const map2 = dataFromFileToMap(data2);

console.log(`Map2 size is equal: 2`);
if (map2.size === 2) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("The map2 contains the keys:  ball and sun:");
if (map2.has("ball") === true && map2.has("sun") === true) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log(
  "Check that for key= ball value = palla , and for key = sun value = sole:"
);
if (map2.get("ball") === "palla" && map2.get("sun") === "sole") {
  console.log("Pass");
} else {
  console.log("Fail");
}

//test jaoinMaps() function
console.log(
  "Checking if the maps have been connected correctly.\nThe third map should contain a translation from Polish into Italian"
);

const map3 = joinMaps(map, map2);

console.log("Map3 size is equal 2");
if (map3.size === 2) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log("The map contains the keys: piłka i słońce:");
if (map.has("piłka") === true && map.has("słońce") === true) {
  console.log("Pass");
} else {
  console.log("Fail");
}

console.log(
  "Check that for key = piłka, the value = palla, and for key = słońce, the value = sole:"
);
if (map3.get("piłka") === "palla" && map3.get("słońce") === "sole") {
  console.log("Pass");
} else {
  console.log("Fail");
}

//test formatContent() function
console.log(`Checking the content to create a file: content = contentPattern`);
const content = formatContent(map3);
const contentPattern = "piłka|palla\nsłońce|sole";

if (content === contentPattern) {
  console.log("Pass");
} else {
  console.log("Fail");
}
// test saveToFile() function
saveToFile(plToITPath, content);
console.log(
  `Checking if the file has been saved to the specified path:\n ${plToITPath}`
);
const data3 = readFile(plToITPath);
if (data3 === contentPattern) {
  console.log("Pass");
} else {
  console.log("Fail");
}

//test generateDictionary() function
console.log(
  `Check if the path will be returned after generating the dictionary ${plToITPath}`
);

if (plToITPath === generateDictionary(plToEnPath, enToItPath)) {
  console.log("Pass");
} else {
  console.log("Fail");
}
