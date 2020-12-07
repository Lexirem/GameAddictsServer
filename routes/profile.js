const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Offer = require("../models/offer");
const Boat = require("../models/boat");
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



router.get("/boat/:id", async (req, res, next) => {
  let myBoat = await Boat.find({ owner: req.params.id });
  console.log(req.params.id, "console de req.params.id")
  console.log(myBoat, "console de myBoat")
  try {
    res.status(200).json(myBoat);
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
      disponibility: req.body.disponibility,
      email: req.body.email,
      languages: req.body.languages,
      country: req.body.country,
      city: req.body.city,
      experience: req.body.experience,
      lookingForSailAsCrew : req.body.lookingForSailAsCrew,
      hasBoat: req.body.hasBoat,
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

// RUTA PARA PODER EDITAR LA INFORMACION DEL USUARIO

router.put("/:id/editBoat", (req, res, next) => {
  console.log(req.body, "console log de req.body")
  //preguntar si es fa servir el id del parametre owner o id del model boat
  Boat.findByIdAndUpdate(
    req.params.id,
    
    {
      boatName: req.body.boatName,
      year: req.body.year,
      typeBoat: req.body.typeBoat,
      country: req.body.country,
      currentLocation: req.body.currentLocation,
      crewNumber: req.body.crewNumber,
      rooms: req.body.rooms,
      length: req.body.length,
      image: req.body.image
    },
    { new: true }
  )
    .then((updateBoat) => {
      res.locals.currentUserInfo = updateBoat;
      res.status(200).json(updateBoat);
    })
    .catch((error) => {
      console.log(error);
    });
});

//CREAR EL MODELO DEL BARCO



router.post("/:id/createBoat", async (req, res, next) => {
 
   try {
    const newBoat = await Boat.create({
      boatName: req.body.boatName,
      year: req.body.year,
      typeBoat: req.body.typeBoat,
      country: req.body.country,
      currentLocation: req.body.currentLocation,
      crewNumber: req.body.crewNumber,
      rooms: req.body.rooms,
      owner: req.params.id,
      length: req.body.length,
      image: req.body.image
    })
    await User.findByIdAndUpdate(req.params.id, {$set:{hasBoat : true}})
    
     res.json(newBoat)
   } catch (error) {
     console.log(error)
   }
});

// RUTA PARA PODER CREAR UNA OFERTA


router.post("/:id/createoffer", async (req, res, next) => {
 
  try {
   const newOffer = await Offer.create({
      crewNumber : req.body.crewNumber,
      boardingLocation : req.body.boardingLocation,
      destiny :req.body.destiny,
      costs:req.body.costs,
      start:req.body.start,
      estimatedTime:req.body.estimatedTime,
      description:req.body.description,
      nationality:req.body.nationality,
      ageCrew:req.body.ageCrew,
      journey:req.body.journey,
      experience:req.body.experience,
      seaMiles:req.body.seaMiles,
      offerImage:req.body.offerImage,
      offerCreator:req.params.id,
      contactEmail:req.body.contactEmail
   })
   await User.findByIdAndUpdate(req.params.id, {$set:{hasBoat : true}})
   
    res.json(newOffer)
  } catch (error) {
    console.log(error)
  }
});



// RUTA PARA BORRAR UNA OFERTA

router.delete('/delete/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
  }
  Offer.findByIdAndRemove(req.params.id)
  .then(() => {
      res.json({message: `Offer with ${req.params.id} is removed successfully.`})
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
