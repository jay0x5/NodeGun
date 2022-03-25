//This Script is to just create a parent document, thats it (wont be used once we create one)

const db = require('gun')();
const {v4: uuidv4} = require("uuid")

/*Conventions:
1. CAT = Client Access Token
2. RGAK = Randomly Generated Access Key
*/

//LETS DISCUSS THE STRUCTURE OF PARENTDOCUMENT SO WE CAN DO EASY SEARCHES AND FETCHING?




const CAT0 = "Example-Of-CAT"
const RGAK0 = "Sub-Example-Of-RGAK"
ParentAccessKey = uuidv4()

//STRUCTURE
const data = await db.get(ParentAccessKey).put({
    CAT0:RGAK0,  //manually putting JSON key[CAT0] and value[RGAK0]
      
});

//ParentAccessKey will be stored in ENV variable