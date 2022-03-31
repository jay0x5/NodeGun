//This Script is to just create a parent document, thats it (wont be used once we create one)

const db = require('gun')();
const {v4: uuidv4} = require("uuid")

/*Conventions:
1. CAT = Client Access Token
2. RGAK = Randomly Generated Access Key
*/



const RGAK0 = " U2FsdGVkX1/h5D6v2armlChrytIUU99hKzrksr8ZIGoX0C9vvlybUKSG8RZK15QRUaADqBm/e/SB+36ifZm6q605H696jXkO+PdHP14bym1iuKyk863mi0MYKT8iSPEz"
// ParentAccessKey = uuidv4()
// console.log(ParentAccessKey)

//STRUCTURE
const data =  db.get("wssw3").put({
    ExampleOfCatKey:RGAK0, //manually putting JSON key[CAT0] and value[RGAK0] 
      
});
const noderesult = db.get("wssw3").once(v =>console.log(v.ExampleOfCatKey));
//ParentAccessKey will be stored in ENV variable

// e6d8d5c1-7959-400c-9c4b-de4e1dc81625