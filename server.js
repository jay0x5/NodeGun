//requirments
const db = require('gun')();
const express = require('express');
const dotenv = require('dotenv');
const {v4: uuidv4} = require("uuid")
let d
/*Conventions:
1. CAT = Client Access Token
2. RGAK = Randomly Generated Access Key
*/


//middlewares
app = express();
dotenv.config({path: './.env'})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Function to update ParentDoc everytime a user is created
async function updateParentDoc(u){
    const CATKEY = ClientAccessToken
    u[CATKEY] = RandomlyGeneratedAccessKey
    const data = await db.get(RandomlyGeneratedAccessKey).put({
        u
    });
    console.log("User registered")
    const noderesult = db.get('e6d8d5c1-7959-400c-9c4b-de4e1dc81625').once(v =>console.log(u));
}

//Function to update Register a user
async function RegisterUser(user,pass){
    //Lets create a Unique RGAK
    GeneratorVariable = uuidv4()
    RandomlyGeneratedAccessKey = "TESTBYGUNJSWITHJAYANDMANAS-!@$" + GeneratorVariable + "-!@$USERONDAPPXD" 
    // console.log(RandomlyGeneratedAccessKey)
    ClientAccessToken = uuidv4() //will generate a universally unique CAT

    //storing user credentials
    const data = await db.get(RandomlyGeneratedAccessKey).put({
        username: user,  //manually putting JSON key[username] and value[user]
        password: pass  //manually putting JSON key and value
    });
    // const noderesult = db.get(RandomlyGeneratedAccessKey).once(v =>console.log(v.username));

    //retrieve the current state of parentdoc
    const modres = db.get('e6d8d5c1-7959-400c-9c4b-de4e1dc81625').once(v =>{

        //assign it to a variable u and pass it to update function
        var u = v
        updateParentDoc(u)


        // const hashresult = db.get(RandomlyGeneratedAccessKey).once(v =>console.log(v));
    });
    

    /*

       ~ TODO2: Whenever a certain CAT key value is matched, server should be able to fetch the corresponding RGAK value inside of a "Parent-Document"
       ~ TODO3: Clean the code a bit
       
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
