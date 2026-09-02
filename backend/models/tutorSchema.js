const express = require("express");
const { default: mongoose } = require("mongoose");

const tutorModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    timing: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
    },
    availability: {
        type: String,
    }
})
module.exports = mongoose.model("Tutor", tutorModel);
