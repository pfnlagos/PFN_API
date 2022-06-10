const express = require('express')
let nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const creds = require('./credential.json')
const PORT = process.env.PORT || 5000
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose")

let app = express()
dotenv.config()

const path = require('path');
const connectDb = require('./config/db');

//Use cors

//Connect database
connectDb()

//Configs
app.use(cors());
// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('Hello, App is running')
  });

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: creds.auth.user,
        pass: creds.auth.pass
    }
})

app.post('/mail', (req, res, next)=> {
    var email = req.body.email
    var message = req.body.message
    // var subject = req.body.subject
    var name = req.body.name
    // var company = req.body.company
    var phone = req.body.phone
    var location = req.body.location
    var content= `${name} from ${location} \n name: ${name} \n email: ${email} \n phone: ${phone} \n location: ${location} \n message: ${message}`

    const mailOption = {
        from: email,
        to: "pfnlagostate@gmail.com",
        subject: `New message from ${name} via contact page`,
        text: content
        // html: `${name} from ${company} <noreply@${name}.com> <br /> ${phone} <br /> ${location} <br /> ${message}`
    }

    transporter.sendMail(mailOption, (err, data)=> {
        if (err) {
            res.json({ status: err })
            console.log(err);
        }else{
            res.json({status: "success"})
            console.log("Email Sent" + data.response);
        }
    })

})

app.post('/directorate', (req, res, next)=> {
    var email = req.body.email
    var message = req.body.message
    var province = req.body.province
    var fullname = req.body.fullname
    var address = req.body.address
    var phone = req.body.phone

    var content= `${fullname} from ${province} \n Full name: ${fullname} \n Email: ${email} \n Phone: ${phone} \n Province: ${province} \n Address: ${address} \n Message: ${message}`

    const mailOption = {
        from: email,
        to: "pfnlagostate@gmail.com",
        subject: `New message from ${fullname} via PFN Directorate Page`,
        text: content
        // html: `${name} from ${company} <noreply@${name}.com> <br /> ${phone} <br /> ${location} <br /> ${message}`
    }

    transporter.sendMail(mailOption, (err, data)=> {
        if (err) {
            res.json({ status: err })
            console.log(err);
        }else{
            res.json({status: "success"})
            console.log("Email Sent" + data.response);
        }
    })

})

app.post('/prayer-request', (req, res, next)=> {
    var email = req.body.email
    var request = req.body.request
    var name = req.body.name
    var address = req.body.address

    var content= `${name} from ${address} \n Full name: ${name} \n Email: ${email} \n Request: ${request}`

    const mailOption = {
        from: email,
        to: "pfnlagostate@gmail.com",
        subject: `New message from ${name} via PFN Directorate Page`,
        text: content
        // html: `${name} from ${company} <noreply@${name}.com> <br /> ${phone} <br /> ${location} <br /> ${message}`
    }

    transporter.sendMail(mailOption, (err, data)=> {
        if (err) {
            res.json({ status: err })
            console.log(err);
        }else{
            res.json({status: "success"})
            console.log("Email Sent" + data.response);
        }
    })

})

transporter.verify(function (err, success) {
    if (err) {
        console.log(err);
    }else{
        console.log("Server is ready to take the emails " + success);
    }
})


//Controller
app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/post"));
app.use("/post", require("./routes/posts"));

app.use('/cloudUser', require('./routes/cloudUser'))
app.use('/upcomingEvent', require('./routes/upcomingEvent'))
app.use('/currentEvent', require('./routes/currentEvent'))
app.use('/pastEvent', require('./routes/pastEvent'))

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))

process.on("unhandledRejection", (err, promise)=> {
    console.log(`Logged Error: ${err}`);
    server.close(()=> process.exit(1))
})