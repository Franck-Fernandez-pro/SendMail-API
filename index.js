const express = require('express')
const nodemailer = require("nodemailer");
const app = express()
const cors = require("cors")({ origin: true });
const bodyParser = require('body-parser');
// const GMAIL = require("./constants");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.post('/sendMail', (req, res) => {
  cors(req, res, () => {
    const name = req.body.name;
    const mail = req.body.mail;
    const phone = req.body.phone;
    const message = req.body.message;
    
    if (name && mail && phone && message) {
      const mailOptions = {
        from: "Perso Website <franck-fernandez.com>",
        to: process.env.DEST,
        subject: `Website contact form - ${name}`,
        html: `<p>
          name: ${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}<br>
          mail: ${mail.replace(/</g, "&lt;").replace(/>/g, "&gt;")}<br>
          phone: ${phone.replace(/</g, "&lt;").replace(/>/g, "&gt;")}<br><br>
          ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        </p>`
      };

      return transporter.sendMail(mailOptions, (err, info) => {
        console.log('transporter.sendMail');
        if (err) {
          console.error(err);
          return res.send(err.toString());
        }

        return res.send({ status: 200, message: "Sended" });
      });
    }

    return res.send({ status: 400, message: "🤔" });
  });
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})