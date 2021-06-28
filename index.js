#!/usr/bin/env node

const axios = require("axios");
const inquirer = require("inquirer");

async function run() {
  console.log("Launching Crypto...");

  const { from, to  } = await askQuestions();

  const value = await calculateValue({ from, to  });
  let values = ``
    // convert object to key's array
    const keys = Object.keys(value);

    // print all keys
    // console.log(keys);    

    // iterate over object
    keys.forEach((key, index) => {
        // console.log(`${key}: ${value[key]}`);
        values+=`\n${key} ${value[key]}`
    });

  

  
  console.log(`${from} is worth ${values}`);
}

function askQuestions() {
  const questions = [
    {
      name: "from",
      type: "list",
      message: "What currency are you converting from? (3 digit code)",
      choices: ["ETH", "BTC", "USD"]
    },
    {
      name: "to",
      // type: "list",
      type: "input",
      message: "What currency are you converting to?",
      // choices: ["USD", "ETH", "BTC"]
      
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

async function calculateValue({ from = 'ETH', to = 'USD' }) {

  const {data} = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`)
  
  return data
}

run();
