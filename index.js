//  Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// array of questions for user input
const questions = [
   // user info
   {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "username",
      message: "What is your Github username?",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "email",
      message: "What is your email address?",
      validate: (promptInput) => validateInput(promptInput),
   },
   // project info
   {
      type: "input",
      name: "title",
      message: "Enter the title of your project",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "description",
      message: "Write a description of your project",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "installation",
      message: "Write the installation instructions for your project",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "uses",
      message: "Describe how to use your project",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "guidelines",
      message: "Write the contribution guidelines for your project",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "input",
      name: "test",
      message: "Write the test instructions for your project",
      validate: (promptInput) => validateInput(promptInput),
   },
   {
      type: "list",
      name: "license",
      message: "Which license do you wish to use for your project?",
      choices: [
         "None",
         "GNU AGPLv3",
         "GNU GPLv3",
         "GNU LGPLv3",
         "Mozilla Public License 2.0",
         "Apache License 2.0",
         "MIT License",
         "Boost Software License 1.0",
         "The Unlicense",
      ],
   },
];

// function to validate input
const validateInput = (string) => {
   if (string) {
      return true;
   } else {
      console.log("An answer is required!");
      return false;
   }
};

// function to write README file
const writeToFile = (fileName, data) => {
   // init filepath
   const filePath = "./dist/" + fileName + "/README.md";
   // promise
   return new Promise((resolve, reject) => {
      // create folder if doesn't exist
      if (!fs.existsSync("./dist/" + fileName)) {
         fs.mkdirSync("./dist/" + fileName, { recursive: true });
      }
      // write file
      fs.writeFile(filePath, generateMarkdown(data), (err) => {
         // if error, reject the Promise and send error to the Promise's `.catch()` method
         if (err) {
            reject(err);
            return;
         }
         // if success, resolve the Promise and send successful data to the `.then()` method
         resolve(
            "README file successfully created! Save location: " + filePath
         );
      });
   });
};

// function to initialize app
const init = () => {
   inquirer
      .prompt(questions)
      .then((answers) => writeToFile(answers.title, answers))
      .then((writeReponse) => console.log(writeReponse))
      .catch((error) => console.log(error));
};

// Function call to initialize app
init();
