const nodemailer = require("nodemailer");
const nodemailMailgun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

let transporter = nodemailer.createTransport(nodemailMailgun(auth));

module.exports = transporter;
