const http = require("http");
const https = require("https");
const axios = require("axios");

const limit1 = 200;

const config = require("./config");
const { apiKeySrc, apiKeyDest } = config;

let emailsToMigrate = [];
const getSuppressions = async () => {
  let data = "";
  start = 0;

  let limit = 50;
  let iterations = 3;
  for (i = 0; i < iterations; i++) {
    start = i * limit1;
    let blocksObj = await dogetBlocksRequest(start, limit);
    console.log("blocksObj");
    console.log(blocksObj);
    if (blocksObj.length == 0) {
      console.log("break");
      break;
    }
    let blocksEmails = blocksObj.map(getEmailFunction);
    emailsToMigrate.push(...blocksEmails);
  }

  start = 0;

  limit = 50;
  iterations = 3;
  for (i = 0; i < iterations; i++) {
    start = i * limit1;
    let bouncesObj = await dogetBouncesRequest(start, limit);

    if (bouncesObj.length == 0) {
      console.log("break");
      break;
    }

    let bouncesEmails = bouncesObj.map(getEmailFunction);
    emailsToMigrate.push(...bouncesEmails);
  }

  start = 0;

  limit = 50;
  iterations = 3;
  for (i = 0; i < iterations; i++) {
    start = i * limit1;
    let globalUnsubscribeObj = await dogetGlobalUnsubscribeRequest(
      start,
      limit
    );

    console.log("globalUnsubscribeObj");
    console.log(globalUnsubscribeObj);
    if (globalUnsubscribeObj.length == 0) {
      console.log("break");
      break;
    }

    let globalUnsubEmails = globalUnsubscribeObj.map(getEmailFunction);
    emailsToMigrate.push(...globalUnsubEmails);
  }

  start = 0;

  limit = 50;
  iterations = 3;
  for (i = 0; i < iterations; i++) {
    start = i * limit1;
    let invalidsObj = await dogetInvalid_emailsRequest(start, limit);

    console.log("invalidsObj");
    console.log(invalidsObj);
    if (invalidsObj.length == 0) {
      console.log("break");
      break;
    }

    let invalidEmails = invalidsObj.map(getEmailFunction);
    emailsToMigrate.push(...invalidEmails);
  }

  start = 0;

  limit = 50;
  iterations = 3;
  for (i = 0; i < iterations; i++) {
    start = i * limit1;
    let spamsObj = await dogetSpamReports_emailsRequest(start, limit);

    console.log("spamsObj");
    console.log(spamsObj);
    if (spamsObj.length == 0) {
      console.log("break");
      break;
    }

    let spamsEmails = spamsObj.map(getEmailFunction);
    emailsToMigrate.push(...spamsEmails);
  }

  //Recreate the Suppressions!
  console.log("emailsToMigrate Final List:");
  console.log(emailsToMigrate);

  //To Uncomment if you want to execute POST Request
  //let postSuppObj = await doPostSuppressionsRequest(emailsToMigrate);

  //console.log(postSuppObj);
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

const dogetBlocksRequest = async (start, limit) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrc}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/suppression/blocks?offset=" +
    start +
    "&limit=" +
    limit;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  //console.log("data")
  //console.log(url)
  return data;
};

const dogetBouncesRequest = async (start, limit) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrc}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/suppression/bounces?offset=" +
    start +
    "&limit=" +
    limit;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  //console.log("data")
  //console.log(url)
  return data;
};

const dogetGlobalUnsubscribeRequest = async (start, limit) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrc}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/suppression/unsubscribes?offset=" +
    start +
    "&limit=" +
    limit;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  return data;
};

const dogetInvalid_emailsRequest = async (start, limit) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrc}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/suppression/invalid_emails?offset=" +
    start +
    "&limit=" +
    limit;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  return data;
};

const dogetSpamReports_emailsRequest = async (start, limit) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrc}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/suppression/spam_reports?offset=" +
    start +
    "&limit=" +
    limit;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  return data;
};

const getEmailFunction = (jsonItem) => jsonItem.email;

getSuppressions();
