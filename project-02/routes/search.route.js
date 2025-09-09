const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.get("/", async (req, res, next) => {
  const user = req.session.currentUser;
  const specialty = req.query.search_query;

  try {
    await Doctor.find({
      specialty: { $regex: new RegExp(specialty), $options: "i" }
    }).then(doctors => {
      if (user) {
        res.render("search", { user, doctors });
      } else {
        res.render("search", { doctors });
      }
    });
  } catch (error) {
    console.log(error);
    res.render("not-found");
  }
});

router.get("/advanced", async (req, res, next) => {
  const user = req.session.currentUser;
  const isEmpty = Object.entries(req.query).length === 0;

  if (isEmpty) {
    if (user) {
      res.render("search-advanced", { user, empty: true });
    } else {
      res.render("search-advanced");
    }
  } else {
    try {
      const data = {
        "address.borough": req.query.borough,
        specialty: req.query.specialty
      };

      await Doctor.find(data).then(doctors => {
        if (user) {
          res.render("search-advanced", { user, doctors, empty: true });
        } else {
          res.render("search-advanced", { doctors, empty: true });
        }
      });
    } catch (error) {
      console.log(error);
      res.render("not-found");
    }
  }
});

module.exports = router;
