"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");
const auth = require("../middlewares/authentication.js");

let _ctrl = new controller();

router.post("/register", _ctrl.post);
router.post("/authenticate", _ctrl.authenticate);

router.get("/", _ctrl.get);
router.put("/:id", _ctrl.put);
router.delete("/:id", _ctrl.delete);

module.exports = router;
