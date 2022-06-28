const express = require('express');
const Dron = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
 
  Dron.find()
  .then((dron) => {
    
    res.render("drones/list.hbs", { dron });
  })
  .catch((err) => {
    console.log(err)
    
  });
});

router.get('/drones/create', (req, res, next) => {
 
  res.render("drones/create-form.hbs");
});

router.post('/drones/create', (req, res, next) => {
 
 const {name, propellers, maxSpeed} = req.body
 

  Dron.create({
    name,
    propellers,
    maxSpeed
  })
  
  .then(()=>{
    
    res.redirect("/drones")
  })
  .catch((e)=>res.render("drones/create-form.hbs"))

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  
  const {id}=req.params
  
  Dron.findById(id)
  .then((dron) => {
    
    res.render("drones/update-form.hbs", { dron });
  })
  .catch((err) => {
    next(err);
  });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
 
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Dron.findByIdAndUpdate(id, { name, propellers, maxSpeed })
  .then(() => res.redirect("/drones"))
  .catch((error) => {
    Dron.findById(id)
        .then((dron) => res.render("drones/update-form.hbs", dron))
        .catch((error) => {
          console.log(error);
        });

      });
    });





router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
 
  const { id } = req.params;

  Dron.findByIdAndDelete(id)
    .then(() => res.redirect("/drones"))
    .catch((error) => next(error));

});

module.exports = router;
