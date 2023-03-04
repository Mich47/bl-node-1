const { createFile, getFiles, getFile } = require("./files");
const argv = require("yargs").argv;

const invokeEction = ({ action, fileName, content }) => {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;

    case "get":
      getFiles();
      break;

    case "find":
      getFile(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
};

invokeEction(argv);
