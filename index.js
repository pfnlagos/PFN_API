const express = require("express");
let nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

let app = express();
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const path = require("path");
const connectDb = require("./config/db");

const cloudinary = require("cloudinary").v2;

//Use cors

//Connect database
connectDb();

//Configs
app.use(cors());
// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, App is running");
});

let transporter = nodemailer.createTransport({
  host: "pfnlagosstate.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

app.post("/mail", (req, res, next) => {
  var email = req.body.email;
  var message = req.body.message;
  // var subject = req.body.subject
  var name = req.body.name;
  // var company = req.body.company
  var phone = req.body.phone;
  var location = req.body.location;
  var content = `${name} from ${location} \n\n name: ${name} \n\n email: ${email} \n\n phone: ${phone} \n\n location: ${location} \n\n message: ${message}`;

  const mailOption = {
    from: email,
    to: "info@pfnlagosstate.org",
    subject: `New message from ${name} via PFN Lagos State Contact Page`,
    text: content
    // html: `${name} from ${company} <noreply@${name}.com> <br /> ${phone} <br /> ${location} <br /> ${message}`
  };

  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      res.json({ status: err });
      console.log(err);
    } else {
      res.json({ status: "success" });
      console.log("Email Sent" + data.response);
    }
  });
});

app.post("/directorate", (req, res, next) => {
  var email = req.body.email;
  var message = req.body.message;
  var province = req.body.province;
  var fullname = req.body.fullname;
  var address = req.body.address;
  var phone = req.body.phone;
  var directorat = req.body.directorat;

  var content = `${fullname} from ${province} \n\n To ${directorat} \n\n Full name: ${fullname} \n\n Email: ${email} \n\n  Phone: ${phone} \n\n Province: ${province} \n\n Address: ${address} \n\n Message: ${message}`;

  const mailOption = {
    from: email,
    to: "info@pfnlagosstate.org",
    subject: `New message from ${fullname} via PFN Lagos state Directorate Page`,
    text: content
    // html: `${name} from ${company} <noreply@${name}.com> <br /> ${phone} <br /> ${location} <br /> ${message}`
  };

  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      res.json({ status: err });
      console.log(err);
    } else {
      res.json({ status: "success" });
      console.log("Email Sent" + data.response);
    }
  });
});

app.post("/prayer-request", (req, res, next) => {
  var email = req.body.email;
  var request = req.body.request;
  var name = req.body.name;
  var address = req.body.address;

  var content = `${name} from ${address} \n\n Full name: ${name} \n\n Email: ${email} \n\n Request: ${request}`;

  const mailOption = {
    from: email,
    to: "info@pfnlagosstate.org",
    subject: `New message from ${name} via Prayer Request`,
    text: content
    // html: `${name} from ${company} <noreply@${name}.com> <br /> ${phone} <br /> ${location} <br /> ${message}`
  };

  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      res.json({ status: err });
      console.log(err);
    } else {
      res.json({ status: "success" });
      console.log("Email Sent" + data.response);
    }
  });
});

transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to take the emails " + success);
  }
});

// ================================================================= //

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get("/api/images", async (req, res) => {
  try {
    const { next_cursor } = req.query;
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "pfn-gallery",
      max_results: 500,
      next_cursor: next_cursor || undefined
    });

    res.status(200).json({
      success: true,
      images: result.resources,
      next_cursor: result.next_cursor
    });
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch images",
      error
    });
  }
});

//Controller
app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use("/post", require("./routes/posts"));
app.use("/auth2", require("./routes/auth2"));

app.use("/cloudUser", require("./routes/cloudUser"));
app.use("/upcomingEvent", require("./routes/upcomingEvent"));
app.use("/currentEvent", require("./routes/currentEvent"));
app.use("/pastEvent", require("./routes/pastEvent"));
app.use("/chairmanMsg", require("./routes/chairmanMsg"));

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}!`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
