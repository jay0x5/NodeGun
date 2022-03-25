//requirments
const db = require('gun')();
const express = require('express');
const dotenv = require('dotenv');
const {v4: uuidv4} = require("uuid")




//middlewares
app = express();
dotenv.config({path: './.env'})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

async function RegisterUser(user,pass){
    GeneratorVariable = uuidv4()
    ModifyGeneratorVariable = "TESTBYGUNJSWITHJAYANDMANAS-!@$" + GeneratorVariable + "-!@$USERONDAPP"
    RandomlyGeneratedAccessKey = "Paraverse2022$" //we will change this later to some result which is generated more uniquely everytime since we will need it unique for every user
    ClientAccessToken = uuidv4() //will generate a universally unique CAT
    const data = await db.get(RandomlyGeneratedAccessKey).put({
        username: user,  //manually putting JSON key[username] and value[user]
        password: pass  //manually putting JSON key and value
    });
    /*To access a specific content from the key RandomlyGeneratedKey:
       const noderesult = db.get(RandomlyGeneratedKey).once(v =>console.log(v.username));

       ~ TODO1: Write a code here with which we can store the console.log result from above line in a global variable so we can use it somewhere else too
       ~ TODO3: Store CAT as a key and RGAK as its value inside of a "Parent-Document" [basically a big JSON document which keeps updating with more CAT keys and RGAK values as more and more user registers]
       ~ TODO4: Store the AccessKey to ParentDocument as a env variable for server to access at times of login
    */ 
}

//app waiting for frontend to post request user credentials
app.post('/register',async(req,res)=>{
    res.send("register part")
    const {user,pass} = req.body //gives username to user and password to pass
    // console.log(user);
    // console.log(pass);
    RegisterUser(user,pass)  // passed user credentials to the function to process the data and put it in GunJS Network                    
 })



//app listening to port
app.listen(process.env.PORT, ()=>{
    console.log("Running on: http://localhost:" + process.env.PORT)
});
