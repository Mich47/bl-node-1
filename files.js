const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = (fileName, content) => {
  const data = {
    fileName,
    content,
  };

  const result = dataValidator(data);
  //   console.log("result ", result);
  if (result.error) {
    console.log(
      chalk.red(
        `Please specify "${result.error.details[0].context?.key}" parameter`
      )
    );
    return;
  }

  if (!checkExtention(fileName).isCorrected) {
    console.log(
      chalk.red(
        `Sorry, application doesn't support "${
          checkExtention(fileName).extention
        }" extention`
      )
    );
    return;
  }

  fsPromises
    .writeFile(path.join(__dirname, "./files", fileName), content, "utf8")
    .then(() => {
      console.log(chalk.green(`File "${fileName}" created successfully`));
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
};

const getFiles = () => {
  fsPromises
    .readdir(path.join(__dirname, "./files"))
    .then((data) => {
      if (!data.length) {
        console.log(chalk.red("There are no files in this directory"));
      }
      data.forEach((file) => console.log(chalk.blueBright(file)));
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
};

const getFile = (file) => {
  fsPromises.readdir(path.join(__dirname, "./files")).then((data) => {
    if (!data.includes(file)) {
      console.log(chalk.red(`The file "${file}" wasn't found`));
      return;
    }
    fsPromises
      .readFile(path.join(__dirname, "./files", file), "utf8")
      .then((text) => {
        fsPromises.stat(path.join(__dirname, "./files", file)).then((data) => {
          console.log({
            message: "Success",
            fileName: file,
            content: text,
            extention: checkExtention(file).extention,
            size: data.size,
            data: data.birthtime.toString(),
          });
        });
      });
  });
};

module.exports = { createFile, getFiles, getFile };
