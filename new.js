/*Modified Logic =>
    ClientAccessToken[CAT]=>1. User Access Key[UAK]
                
                Basically SecuredLayered CAT will have a small part as UAK 
                

    UserDeviceID as UserRecoveryKey[URK] =>
        We will use this and pair the string to a uniquely generated hash or salt or some gibberish string and use it as a key to each user's Recovery file for recovery purposes, incase the CAT is lost but device id is still retained
        Even if user tried to search for recovery file on GunDb with his device ID then he wont find it since there is some unique hash or salt or gibberish string attached to the recovery file which only server knows


    Recovery-Doc=> Relations of username and CAT
              => Example:= Jay0x5: jay0x5_CAT
                                    *Where Jay0x5[username] is the key and jay0x5_CAT is the CAT value assigned to my account[as whole encrypted form]
              
              =>Recovery Doc can only be accessed by URK

 
    Each single User-Document can be accessed only by specific UAK which is unique in every user's CAT

    *Structure Model of CAT:
            Uniquely generated UAK + Server Known CAT[To be added while authenticating by server] == Whole CAT

            Encrypting CAT[for every user]: 
                        We will take a part of User Hardware/Device ID as a passphrase for encryption of cat
                        For Example:
                            DeviceIDString = "Akwedeofwpclemvnwowpokwdo3"
                            We will take a specific part like from 4th index to 10th index for every user
                            use that part as a passphrase for encryption

    *Structure Model of URK:
                Server Generated + Server known hash mixed with User Device/Hardware ID


    
    *Structure Model of UAC:
                Uniquely Generated UUID for every user


    *CAT Processing during login(LoginLogic)[TO be done on Python side]:
                    CAT = UAK + UUID so string[0:36] thats ur UAK which can be sent to server and used to access user creds
    

    *Encryption model of CAT[to be sent from python]:
                    take user UUID and split it and take an index of it, remove all hyphens

    PROS: We dont follow the direct hash exposing parent doc system
        : If CAT properly structured and UAK is proper embedded within it then its 99% tamper proof
        : Nearly impossible to access a central data storage{Parent-Doc system had this vulnerability since Parent Doc was one big central decentralized data storage}
        : Even if one user credentials are leaked, they are of no use since there is no direct login page and login is based off CAT existence in user device

    CONS: Couldnt Spot any yet particularly from the backend side
        : One would be incase source code gets leaked then hackers might know how to break certain hashes,gibberish-word-jumbles and encryptions
        
*/

const express = require('express')
const dotenv = require('dotenv');
const {v4: uuidv4} = require("uuid")
const db = require('gun')();
const CryptoJS = require("crypto-js");

app = express();
dotenv.config({path: './.env'})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

async function CreateRecoveryDoc(u,userN,encat,urk){
    const USEKEY = userN
    const ENCAT = encat
    u[USEKEY] = ENCAT
    const data = await db.get(ENCAT).put({
        u
    });
    const noderesult = db.get(urk).once(v =>console.log(v));
}

async function RegisterUser(user,pass,email,HID,ED){
    var userN = user

    //create a unique user data access key(UAK)
    UserUAK = uuidv4()
    console.log("UAK: " + UserUAK)


    //create a CAT for user and concatenate UAK into CAT //could be improved in future
    const CATTOKEN = uuidv4()
    const CAT = UserUAK + CATTOKEN
    console.log("CAT: " + CAT)
    //encrypt the cat and send it ahead instead of sending plain cat
    const EDDfraze = ED
    var encrypted = CryptoJS.AES.encrypt(CAT, EDDfraze);  //encryption
    console.log("Encryption: "+ encrypted.toString()) //to view encrypted
    const encat = encrypted.toString()
    // var decrypted = CryptoJS.AES.decrypt(encrypted, key); //decryption
    //console.log("Encryption: "+ decrypted.toString(CryptoJS.enc.Utf8)) //to view decrypted

    
    //put user cred into a file with UAK as its access hash
    const cred = await db.get(UserUAK).put({
        username: user,
        password: pass
    })
    
    // const noderesult1 = db.get(UserUAK).once(v =>console.log(v.username))
    //put username as KEY and CAT as value into a file with URK as its access hash
    //create a default key-value first since we cannot put real data in null files
    //create a unique recovery doc access key of user(URK)
    const ID = HID // Get Hardware UUID 
    const SKID = process.env.SECRET2
    const URK = ID + SKID //generate unique URK for every user
    console.log("URK: " + URK)
    const defdata = await db.get(URK).put({
        default: 'defaultID'
    })
    const data = await db.get(URK).once(v =>{
        var u = v
        // console.log(u)
        CreateRecoveryDoc(u,userN,encat,URK)
    });
}

//receiving inputs from python or unity
app.post('/register',async(req,res)=>{
    res.send("register-part")
    const {email,username,password,HID,EID} = req.body
    console.log(email)
    console.log(username)
    console.log(password) 
    console.log(HID)
    console.log("EID: "+ EID )
    RegisterUser(username,password,email,HID,EID)
     // passed user credentials to the function to process the data and put it in GunJS Network                    
 })



app.listen(process.env.PORT, ()=>{
    console.log("Running on: http://localhost:" + process.env.PORT)
});
