const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const uploadCloud = require('../configs/cloudinary-setup');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// RUTA PARA OBTENER LAS OFERTAS QUE HAYA CREADO EL USUARIO

router.get("/:id", async (req, res, next) => {
 
  // preguntar com relacionem la oferta amb l'usuari que l'ha creat
  let myUserFounded = await User.findById(req.params.id);
  try {
    res.json(myUserFounded);
  } catch (error) {
    console.log(error);
  }
});



router.get("/game/:id", async (req, res, next) => {
  let myGames = await Game.find({ owner: req.params.id });
  console.log(req.params.id, "console de req.params.id")
  console.log(myGames, "console de myGames")
  try {
    res.status(200).json(myGames);
  } catch (error) {
    console.log(error);
  }
});

// RUTA PARA PODER EDITAR LA INFORMACION DEL USUARIO

router.put("/:id/editUser", (req, res, next) => {
  console.log(req.body, "console log de reqbody")
  User.findByIdAndUpdate(
     req.params.id ,
    {
      username: req.body.username,
      age: req.body.age,
      gender: req.body.gender,
      email: req.body.email,
      image: req.body.image,
    },
    { new: true }
  )
    .then((updateUser) => {
      res.locals.currentUserInfo = updateUser;
      res.status(200).json(updateUser);
    })
    .catch((error) => {
      console.log(error);
    });
});


//CREAR EL JUEGO

router.post("/:id/createGame", async (req, res, next) => {
 
   try {
    const newGame = await Game.create({
      name: req.body.name,
      type: req.body.type,
      owner: req.params.id,
      players: req.body.players,
      image: req.body.image
    })
    await User.findByIdAndUpdate(req.params.id)
    
     res.json(newGame)
   } catch (error) {
     console.log(error)
   }
});


// RUTA PARA BORRAR UN JUEGO

router.delete('/delete/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
  }
  Game.findByIdAndRemove(req.params.id)
  .then(() => {
      res.json({message: `The Game with ${req.params.id} is removed successfully.`})
  })
  .catch(err => {
      res.json(err)
  })
});

router.get("/user/:id", async (req, res, next) => {
  // preguntar com relacionem la oferta amb l'usuari que l'ha creat
  let myOffers = await Offer.find({ offerCreator: req.params.id });
  try {
    res.status(200).json(myOffers);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
