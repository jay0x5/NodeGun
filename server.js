/*
Author: Jay
Developement Purpose: Research
*/
//Thanks to Mark Nadal for making GunDb open source :))
//Note: SEA Authentication is not used, We are using GunDb just as a decentralized file storage


//requirments
const db = require('gun')();
const express = require('express');
const dotenv = require('dotenv');
const {v4: uuidv4} = require("uuid")


/*Conventions:
1. CAT = Client Access Token
2. RGAK = Randomly Generated Access Key
*/


app = express();
dotenv.config({path: './.env'})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Function to login user
async function LoginUser(CatTokenValue){
    const ParentDocResult = db.get(process.env.PARENT_DOC_SECRET_KEY).once(v =>{
        data = v[CatTokenValue]
        console.log("CAT value: " + data)

    
    });
}

//Function to update ParentDoc everytime a user is created
async function updateParentDoc(u){
    const CATKEY = ClientAccessToken
    u[CATKEY] = RandomlyGeneratedAccessKey
    const data = await db.get(RandomlyGeneratedAccessKey).put({
        u
    });
    console.log("User registered")
    const noderesult = db.get(process.env.PARENT_DOC_SECRET_KEY).once(v =>console.log(u));
}

//Function to Register a user
async function RegisterUser(user,pass){
    //Lets create a Unique RGAK
    GeneratorVariable = uuidv4()
    RandomlyGeneratedAccessKey = process.env.SECRET1 + GeneratorVariable + process.env.SECRET2 
    // console.log(RandomlyGeneratedAccessKey)
    ClientAccessToken = uuidv4() //will generate a universally unique CAT

    //storing user credentials
    const data = await db.get(RandomlyGeneratedAccessKey).put({
        username: user,  //manually putting JSON key[username] and value[user]
        password: pass  //manually putting JSON key and value
    });
    // const noderesult = db.get(RandomlyGeneratedAccessKey).once(v =>console.log(v.username));

    //retrieve the current state of parentdoc
    const modres = db.get(process.env.PARENT_DOC_SECRET_KEY).once(v =>{

        //assign it to a variable u and pass it to update function
        var u = v
        updateParentDoc(u)


        // const hashresult = db.get(RandomlyGeneratedAccessKey).once(v =>console.log(v));
    });
    

    /*

       ~ TODO2: try chaining the node to store relations based on specific users
       ~ TODO3: Clean the code a bit
       ~ TODO4: fix unity frontend for testing purposes
       
    */ 
}


//app waiting for frontend to post request user credentials via the register route
app.post('/register',async(req,res)=>{
    res.send("register-part")
    const {user,pass} = req.body //gives username to constructor user and password to constructor pass
    // console.log(user);
    // console.log(pass);
    RegisterUser(user,pass)  // passed user credentials to the function to process the data and put it in GunJS Network                    
 })

//app waiting for frontend to post request CAT Token from user for login purpose
app.post('/login', async(req,res)=>{
    console.log(req.token)
    LoginUser(process.env.TESTACCESSKEY)
})


//app listening to port
app.listen(process.env.PORT, ()=>{
    console.log("Running on: http://localhost:" + process.env.PORT)
});
