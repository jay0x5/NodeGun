//requirments
const db = require('gun')();
const express = require('express');
const dotenv = require('dotenv');
const {v4: uuidv4} = require("uuid")

/*Conventions:
1. CAT = Client Access Token
2. RGAK = Randomly Generated Access Key
*/


//middlewares
app = express();
dotenv.config({path: './.env'})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

async function RegisterUser(user,pass){

    //Lets create a Unique RGAK
    GeneratorVariable = uuidv4()
    RandomlyGeneratedAccessKey = "TESTBYGUNJSWITHJAYANDMANAS-!@$" + GeneratorVariable + "-!@$USERONDAPPXD" 
    // console.log(RandomlyGeneratedAccessKey)

    ClientAccessToken = uuidv4() //will generate a universally unique CAT

    const data = await db.get(RandomlyGeneratedAccessKey).put({
        username: user,  //manually putting JSON key[username] and value[user]
        password: pass  //manually putting JSON key and value
    });
    /*To access a specific content from the key RandomlyGeneratedAccessKey:
       const noderesult = db.get(RandomlyGeneratedAccessKey).once(v =>console.log(v.username));

       ~ TODO1: Write a code here with which we can store the console.log result from above line in a global variable so we can use it somewhere else too
       ~ TODO2: Store CAT as a key and RGAK as its value inside of a "Parent-Document"
       ~ TODO3: Create a function which will keep updating Parent-Document JSON FORMAT with more and more CAT and RGOK key-value pairs as more and more people register
       
    */ 
}

//app waiting for frontend to post request user credentials
app.post('/register',async(req,res)=>{
    res.send("register part")
    const {user,pass} = req.body //gives username to constructor user and password to constructor pass
    // console.log(user);
    // console.log(pass);
    RegisterUser(user,pass)  // passed user credentials to the function to process the data and put it in GunJS Network                    
 })



//app listening to port
app.listen(process.env.PORT, ()=>{
    console.log("Running on: http://localhost:" + process.env.PORT)
});
