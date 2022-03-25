//This Script is to just create a parent document, thats it (wont be used once we create one)

const db = require('gun')();
const {v4: uuidv4} = require("uuid")

/*Conventions:
1. CAT = Client Access Token
2. RGAK = Randomly Generated Access Key
*/



const RGAK0 = "Sub-Example-Of-RGAK"
// ParentAccessKey = uuidv4()
// console.log(ParentAccessKey)

//STRUCTURE
const data =  db.get(ParentAccessKey).put({
    ExampleOfCatKey:RGAK0, //manually putting JSON key[CAT0] and value[RGAK0] 
      
});
const noderesult = db.get(ParentAccessKey).once(v =>console.log(v.ExampleOfCatKey));
//ParentAccessKey will be stored in ENV variable

// e6d8d5c1-7959-400c-9c4b-de4e1dc81625