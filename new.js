/*Modified Logic =>
    ClientAccessToken[CAT]=>1. User Access Key[UAK]
                            2. User Recovery Key[URK]

                Basically CAT = UAK + URK

    Recovery-Doc=> Relations of username and CAT
              => Example:= Jay0x5: jay0x5_CAT
                                    *Where Jay0x5[username] is the key and jay0x5_CAT is the CAT value assigned to my account
              
              =>Recovery Doc can only be accessed by URK[this is same in every user's CAT]

 
    Each single User-Document can be accessed only by specific UAK which is unique in every user's CAT

    *Structure of CAT*[VERY IMP]{

        We need to structure CAT very precisely as a combination of UAK and URK and to be tamper-proof by the outsider or user
    }





    PROS: We dont follow the direct hash exposing parent doc system
        : If CAT properly structured and UAK and URK are properly embedded within it then its 99% tamper proof
        : Nearly impossible to access a central data storage{Parent-Doc system had this vulnerability since Parent Doc was one big central decentralized data storage}
        : Even if one user credentials are leaked, they are of no use since there is no direct login page and login is based off CAT existence in user device

    CONS: Couldnt Spot any yet particularly from the backend side
        : One would be incase source code gets leaked then hackers might know how to break certain hashes,gibberish-word-jumbles and encryptions
        








*/
