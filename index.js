#!/usr/bin/env node

const axios = require("axios");
const inquirer = require("inquirer");

const program = require("commander");

async function run() {
  console.log(
    `%c
  ________________________.___._____________________________   
  \\_   ___ \\______   \\__  |   |\\______   \\__    ___/\\_____  \\  
  /    \\  \\/|       _//   |   | |     ___/ |    |    /   |   \\ 
  \\     \\___|    |   \\\\____   | |    |     |    |   /    |    \\
   \\______  /____|_  // ______| |____|     |____|   \\_______  /   
          \\/       \\/ \\/                                    \\/`,
    `font-family: monospace`
  ); // generated https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20

  const { from, to } = await askQuestions();

  const value = await calculateValue({ from, to });
  let values = ``;
  // convert object to key's array
  const keys = Object.keys(value);

  // print all keys
  // console.log(keys);

  // iterate over object
  keys.forEach((key, index) => {
    // console.log(`${key}: ${value[key]}`);
    values += `\n${key} ${value[key]}`;
  });

  console.log(`${from} is worth:
              ${values} at ${createTimestamp()}`);
}

function askQuestions() {
  const questions = [
    {
      name: "from",
      type: "list",
      message: "What currency are you converting from?",
      choices: ["ETH", "BTC", "USD"],
    },
    {
      name: "to",
      type: "input",
      message:
        "What currencies are you converting to? - 3 digit code, comma separated 'USD', 'ETH', 'BTC'",
    },
    // {
    //   name: "amount",
    //   type: "text",
    //   message: "How much would you like to convert?",
    //   validate: value => {
    //     const number = parseFloat(value);

    //     return new Promise((resolve, reject) => {
    //       if (isNaN(number)) {
    //         reject("The value needs to be a number");
    //       }
    //       resolve(true);
    //     });
    //   }
    // }
  ];

  return inquirer.prompt(questions);
}

async function calculateValue({ from = "ETH", to = "USD" }) {
  const { data } = await axios.get(
    `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
  );

  return data;
}

function createTimestamp() {
  let date_ob = new Date(Date.now());

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  // // prints date in YYYY-MM-DD format
  // console.log(year + "-" + month + "-" + date);

  // // prints time in HH:MM format
  // console.log(hours + ":" + minutes);

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

program
  // .command("crypto") // sub-command name
  .alias("stonks") // alternative sub-command is `stonks`
  .description("Get current crypto prices") // command description
  // function to execute when command is uses
  .action(function () {
    run();
  });

// allow commander to parse `process.argv`
program.parse(process.argv);
