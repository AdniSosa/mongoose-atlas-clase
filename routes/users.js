const express = require("express");
const router = express.Router();
const User = require("../models/user"); 


router.post("/create", async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a user" });
    }
});

router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find();  
        //console.log(users);
        
        if(users.length === 0) {
        res.send('There is no users in the data base')
        } else {    
        res.status(200).send(users);
        }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem getting users" });
    }
})

router.put('/update/:username', async (req, res) => {
    
    try {
        const userUpdate = await User.findOneAndUpdate({username: req.params.username}, req.body);
        //console.log(userUpdate)
      
       if(!userUpdate) {
        res.json({message:'The user couldn´t be found'})
      } else {
        res.status(200).send(userUpdate);
      }
    
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem updating the user" });
    }
})

router.delete('/delete/:username', async (req, res) => {
    
    try {
        const userDelete = await User.findOneAndDelete({username: req.params.username});
            //console.log(userDelete)
        
        if(!userDelete) {
            res.json({message:'The user couldn´t be found'})
          } else {
            res.status(200).json({message:'The user has been deleted'});
          }

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem deleting the user" });
    }
})

module.exports = router;