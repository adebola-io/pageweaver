module.exports = generatePageID = (fileName, source = "pageweaver.apps") => {
  return `${fileName.slice(0, 4)}.${Math.pow(fileName.length, 3.3)
    .toString()
    .slice(0, 10)}.${source.slice(0, 5) + source.charCodeAt(0)}.${
    (fileName + source).length * 22
  }.wbpg`
    .slice(0, 23)
    .toUpperCase()
    .split(".")
    .reverse()
    .join("");
};
