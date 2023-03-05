const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = async (fileName, content) => {
  const data = {
    fileName,
    content,
  };

  const result = dataValidator(data);

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

  const filePath = path.join(__dirname, "./files", fileName);

  try {
    await fsPromises.writeFile(filePath, content, "utf8");

    console.log(chalk.green(`File "${fileName}" created successfully`));
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const getFiles = async () => {
  try {
    const data = await fsPromises.readdir(path.join(__dirname, "./files"));

    if (!data.length) {
      console.log(chalk.red("There are no files in this directory"));
      return;
    }

    data.forEach((file) => console.log(chalk.blueBright(file)));
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const getFile = async (file) => {
  const dirPath = path.join(__dirname, "./files");
  const filePath = path.join(__dirname, "./files", file);

  try {
    const data = await fsPromises.readdir(dirPath);

    if (!data.includes(file)) {
      console.log(chalk.red(`The file "${file}" wasn't found`));
      return;
    }

    const content = await fsPromises.readFile(filePath, "utf8");
    const fileDetails = await fsPromises.stat(filePath);

    console.log({
      message: "Success",
      fileName: file,
      content,
      extention: checkExtention(file).extention,
      size: `${fileDetails.size} bytes`,
      date: fileDetails.birthtime.toString(),
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};

module.exports = { createFile, getFiles, getFile };
