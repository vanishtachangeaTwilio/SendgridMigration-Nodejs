const axios = require("axios");
const { setTimeout } =require("timers/promises");

const limit1 = 200;

const config = require("./config");
const { apiKeySrcTemplate, apiKeyDestTemplate } = config;


const getTemplates = async () => {


  let allTemplates = [];
  let data = "";
  let page_size = 200;
  let metadata = {};
  let next = false;
  
  let url =
    "https://api.sendgrid.com/v3/templates?generations=legacy,dynamic&page_size=" +
    page_size;
  do {
   // await setTimeout(10);
    let templatesObj = await doGetTemplatesRequest(url);

    templates = [];
    templates = templatesObj.result;
    allTemplates.push(...templates);
    let metadata = templatesObj._metadata;

    next = metadata.hasOwnProperty("next");
    if (!next) break;

    url = metadata.next;
    //console.log(url);
  } while (next);

console.log("templates");
console.log(templates)

//If you want to delete a particular template you can uncomment next line and pass on the specific template Id. 
// const filteredTemplates = allTemplates.filter(tp => tp.id=='a8d95a52-2e4f-404c-94d6-34f7ae6ef8c8');
 const filteredTemplates = allTemplates;
  console.log("filteredTemplates");
  console.log(filteredTemplates);



  //Uncomment To Delete All templates In destination Account
  /*
  console.log('Start')

  const promises = filteredTemplates.map(async temp => {
    await setTimeout(10);
    let deleteResponse="";
    deleteResponse = await doDeleteTemplateRequest(
     temp.id
   );
   console.log("deleteResponse")
   console.log(deleteResponse)
   return deleteResponse;
  })

  const deleteResult = await Promise.all(promises)


  console.log('End')
  */
};






const doGetTemplatesRequest = async (url) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrcTemplate}`,
    },
  };

  //const url = "https://api.sendgrid.com/v3/templates?page_size="+page_size;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  //console.log(data);
  return data;
};

const doDeleteTemplateRequest = async (
  template_id

) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeyDestTemplate}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/templates/" + template_id;

  let res = await axios.delete(url, config);
  let data = res.data;
  //console.log(data);
  return data;
};

getTemplates();
