#!/usr/bin/env node

const axios = require("axios");
const inquirer = require("inquirer");
const program = require("commander");
program.version("0.0.1");
async function getCryptoPrices() {
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

  // get values from user for conversion
  // https://github.com/SBoudrias/Inquirer.js/#documentation
  const { from, to } = await promptUser();

  // make request
  const value = await fetchPrices({ from, to });

  // convert object to key's array
  const keys = Object.keys(value);

  // store returned values as string
  let values = ``;

  // iterate over object
  keys.forEach((key, index) => {
    values += ` ${value[key]} ${key} | `;
  });

  // return our conversion
  console.log(`
  ${from} is worth: ${values} at ${createTimestamp()}`);
}

function promptUser() {
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

async function fetchPrices({ from = "ETH", to = "USD" }) {
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

// kick off our cli program
// https://github.com/tj/commander.js

program
  .alias("stonks")
  .description("Get current crypto prices") // command
  .action(async function () {
    await getCryptoPrices();
  });

// allow commander to parse `process.argv`
program.parse(process.argv);
