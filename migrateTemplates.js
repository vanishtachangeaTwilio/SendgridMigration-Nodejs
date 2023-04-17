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
    await setTimeout(10);
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

  console.log("Templates");
  console.log(allTemplates);
  Promise.all(
    allTemplates.map(async (temp) => {
      //Create New Template!!!
      //To Uncomment if you want to execute POST Request
      /*
      await setTimeout(10);
      let postTemplateResponse = await doPostTemplateRequest(
        temp.name,
        "dynamic"
      );
*/
      let dataVersions = "";

      //Get List Of Versions
      dataVersions = await doGetTemplateVersionsRequest(temp.id);
      let versions = dataVersions.versions;
      Promise.all(
        versions.map(async (version) => {
          //Create New Version!!!
          //To Uncomment if you want to execute POST Request
          /*
          let dataVersionsCreateResponse = await doPostTemplateVersionRequest(
            version.name,
            postTemplateResponse.id,
            version.active,
            version.html_content,
            version.generate_plain_content,
            version.subject,
            version.editor
          );*/
        })
      );
    })
  );
};

const doPostTemplateRequest = async (name, generation) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeyDestTemplate}`,
    },
  };

  const url = "https://api.sendgrid.com/v3/templates";
  let payload = { name: name, generation: generation };
  let res = await axios.post(url, payload, config);
  let data = res.data;
  //console.log(data);
  return data;
};

const doPostTemplateVersionRequest = async (
  name,
  template_id,
  active,
  html_content,
  generate_plain_content,
  subject,
  editor
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeyDestTemplate}`,
    },
  };

  const url =
    "https://api.sendgrid.com/v3/templates/" + template_id + "/versions";
  let payload = {
    name,
    template_id,
    active,
    html_content,
    generate_plain_content,
    subject,
    editor,
  };
  let res = await axios.post(url, payload, config);
  let data = res.data;
  //console.log(data);
  return data;
};

const doGetTemplateVersionsRequest = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKeySrcTemplate}`,
    },
  };

  const url = "https://api.sendgrid.com/v3/templates/" + id;
  let payload = {};
  let res = await axios.get(url, config);
  let data = res.data;
  //console.log(data);
  return data;
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

getTemplates();
