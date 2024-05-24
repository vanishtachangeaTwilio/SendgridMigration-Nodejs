const axios = require("axios");
const assert = require('assert');

const limit1 = 200;

const config = require("./config");
const { apiKeyDest, csvFilePath } = config;


const fs = require('fs');
const { parse } = require('csv-parse/sync');

const records = [];
// Function to read CSV file and convert content to an array of objects
const csvToArrayOfObjects = (csvFilePath) => {
  try {
    // Read the CSV file content
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    //console.log("csvContent", csvContent)

    const records = parse(csvContent, {
      columns: false,
      skip_empty_lines: true
    });



    return records;

  } catch (error) {
    console.error('Error reading or parsing CSV file:', error);
    return [];
  }
};


let emailsToMigrate = [];

// Function to get a subArray based on start and end positions
const getSubarray = (array, startPos, endPos) => {
  // The endPos is exclusive, so if you want to include the element at endPos,
  // you need to add 1 to endPos.
  return array.slice(startPos, endPos + 1);
};

const getSuppressionsFromCSV = async () => {

  // Usage example
  //const csvFilePath = 'path/to/your/Twilio Programmable Wireless - SIMs.csv';
  const arrayOfObjects = csvToArrayOfObjects(csvFilePath);
  //console.log("arrayOfObjects", arrayOfObjects);

  start = 0;

  let limit = 500;
  let arrayLength = arrayOfObjects.length;
  console.log("arrayLength", arrayLength)
  let iterations = 3;
  let currentIterations = Math.round(arrayLength / limit);
  console.log("currentIterations", currentIterations)
  let startPosition = start; // Assuming positions are 0-based
  let endPosition = startPosition + 500;
  for (i = 0; i < currentIterations; i++) {
    console.log("startPosition", startPosition)
    console.log("endPosition", endPosition)
    let subArray = getSubarray(arrayOfObjects, startPosition, endPosition);
    startPosition = endPosition + 1;
    endPosition = startPosition + 500;
    //console.log("subArray", subArray.flat(1))
    let subArrayMerged = subArray.flat(1);

    //To Uncomment if you want to execute POST Request
    //let postSuppObj = await doPostSuppressionsRequest(subArrayMerged);

    //console.log(postSuppObj);
  }


};

const doPostSuppressionsRequest = async (emailsArray) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeyDest}`,
    },
  };

  const url = "https://sendgrid.com/v3/asm/suppressions/global";

  let payload = {
    recipient_emails: emailsArray,
  };
  let res = await axios.post(url, payload, config);
  let data = res.data;
  console.log(data);
  return data;
};


getSuppressionsFromCSV();
