# INTRODUCTION
* **BEWARE THESE CODES ARE NOT PRODUCTION READY; HAVE NOT BEEN FULLY TESTED;**
* **THEY CAN JUST BE USED AS A GUIDE**
* **PLEASE READ THE CODE.**
* **THERE ARE COMMENTED CODE WHICH CREATE RECORD!!**

## Steps To Run MigrateTemplates.js
_This script gives an example of which APIs could be used to migrate templates from one account to another programmatically._
> This is just an example which has not been fully optimised and tested. 

1. Read the Code to uncomment the lines of code to execute the POST requests to create template and template versions 
2. run the following in the terminal 
```
export  apiKeySrcTemplate="<sgKeySource>"
export  apiKeyDestTemplate="<sgKeyDestination>"
```
3. run following 
```npm run migrate-templates
```


## Steps To Run MigreateSuppressions.js
_This script gives an example of which APIs could be used to migrate suppressions (blocks, bounces, global unsubscribes, invalid, spam reports) from one account to another programmatically._
> This is just an example which has not been fully optimised and tested. 

1. run the following in the terminal 
```
export  apiKeySrc="<sgKeySource>"
export  apiKeyDest="<sgKeyDestination>"
```
2. run following in the terminal 
```
npm run migrate-sup
```

## Limitations - Next Steps To do 
* There is no code for migrating suppressions group. For that we need to:
 * Create suppression group 
 * Get the suppressions from previous group in old account 
 * Add those suppressions in the new group in new account. 