const checkExtention = (fileName) => {
  const EXTENTIONS = ["json", "txt", "js", "xml", "yaml"];

  const extention = fileName.slice(fileName.lastIndexOf(".") + 1);
  const isCorrected = EXTENTIONS.some((item) => item === extention);

  return {
    isCorrected,
    extention,
  };
};

module.exports = checkExtention;
