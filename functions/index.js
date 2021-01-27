const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

/**
* Here we're using Gmail to send
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'presales.everteam@gmail.com',
        pass: 'P@$$W0rd123'

    }});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const data = req.body;

        const mailOptions = {
            from: 'Presales EverteamGs-Intalio <presales.everteam@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: req.body.mazenemail,
            cc: req.body.stephanieemail,
            subject: 'New Presales Request From '+data.country+'-'+data.appreviation, // email subject
            html: `<html><body>
                  Dear,<br/><br/>
                  New opportunity has been added:<br/><br/>
                  <b>Account Manager</b>:<br/>
                  <u><b>First Name:</b></u> ${data.first_name},<br/>
                  <u><b>Last Name:</b></u> ${data.last_name},<br/>
                  <u><b>Country:</b></u> ${data.country}<br/><br/>
                  <b>Client Info</b>:<br/>
                  <u><b>Client fullname:</b></u> ${data.clientname}<br/><br/>
                  <b>Opportunity Details</b>:<br/>
                  <u><b>Project Description:</b></u> ${data.projectdesc},<br/>
                  <u><b>Submission Date:</b></u> ${data.clientsubmissiondate},<br/>
                  <u><b>Budget Range:</b></u> ${data.budgetrange}<br/><br/>
                  <b>Opportunity Documents</b>:<br/>
                  <u><b>File Url Link:</b></u><br/> ${data.urls}<br/><br/>
                  <b>Opportunity View</b>:<br/>
                  <br/><a href="http://presales-etgs.com/#/viewopportunity/${data.first_name}/${data.last_name}/${data.id}"><b>Click me</b></a><br/><br/>
                  Thank you, <br/>
                  Presales EverteamGs-Intalio,<br/>
                  <img width="180" src="https://img.techpowerup.org/200324/output-onlinepngtools.png" />
              </html></body> ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});
exports.sendMailsales = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const data = req.body;
        // getting dest email by query string
        const dest = req.body.currentuseremail;

        const mailOptions = {
            from: 'Presales EverteamGs-Intalio <presales.everteam@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Presales Request Received', // email subject
            html: `<html><body>
                  Dear,<br/><br/>
                  Opportunity sent to presales,below a summary of the submitted request:<br/><br/>
                  <b>Account Manager</b>:<br/>
                  <u><b>First Name:</b></u> ${data.first_name},<br/>
                  <u><b>Last Name:</b></u> ${data.last_name},<br/>
                  <u><b>Country:</b></u> ${data.country}<br/><br/>
                  <b>Client Info</b>:<br/>
                  <u><b>Client fullname:</b></u> ${data.clientname}<br/><br/>
                  <b>Opportunity Details</b>:<br/>
                  <u><b>Project Description:</b></u> ${data.projectdesc},<br/>
                  <u><b>Submission Date:</b></u> ${data.clientsubmissiondate},<br/>
                  <u><b>Budget Range:</b></u> ${data.budgetrange}<br/><br/>
                  <b>Opportunity Documents</b>:<br/>
                  <u><b>File Url Link:</b></u><br/> ${data.urls}<br/><br/>
                  Thank you, <br/>
                  Presales EverteamGs-Intalio,<br/>
                  <img width="180" src="https://img.techpowerup.org/200324/output-onlinepngtools.png" />
              </html></body> ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});

exports.sendMailbackup= functions.https.onRequest((req, res) => {
  cors(req, res, () => {
      const data = req.body;

      const mailOptions = {
          from: 'Presales EverteamGs-Intalio <presales.everteam@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: 'presales.everteam@gmail.com',
          subject: 'New Presales Request From '+data.country, // email subject
          html: `<html><body>
                Dear,<br/><br/>
                New opportunity has been added:<br/><br/>
                <b>Account Manager</b>:<br/>
                <u><b>First Name:</b></u> ${data.first_name},<br/>
                <u><b>Last Name:</b></u> ${data.last_name},<br/>
                <u><b>Country:</b></u> ${data.country}<br/><br/>
                <b>Client Info</b>:<br/>
                <u><b>Client fullname:</b></u> ${data.clientname},<br/>
                <u><b>Client appreviation:</b></u> ${data.appreviation},<br/>
                <u><b>Contact Name:</b></u> ${data.contactname},<br/>
                <u><b>Contact Title:</b></u> ${data.contacttitle},<br/>
                <u><b>Contact Email:</b></u> ${data.contactemail},<br/>
                <u><b>Contact Number:</b></u> ${data.contactnumber},<br/>
                <u><b>Previous Project Description:</b></u> ${data.previousprojectinfo},<br/>
                <u><b>Number of Employees:</b></u> ${data.numberofemployees},<br/>
                <u><b>Client Type:</b></u> ${data.clienttype},<br/>
                <u><b>Client Industry:</b></u> ${data.clientindustry}<br/><br/>
                <b>Opportunity Details</b>:<br/>
                <u><b>Project Description:</b></u> ${data.projectdesc},<br/>
                <u><b>Received Date:</b></u> ${data.recieveddate},<br/>
                <u><b>Submission Date:</b></u> ${data.clientsubmissiondate},<br/>
                <u><b>Other Observation:</b></u> ${data.otherobservation},<br/>
                <u><b>Delivery Timeline:</b></u> ${data.deliverytimeline},<br/>
                <u><b>Required Technology:</b></u> ${data.requiredtechnology},<br/>
                <u><b>Chance Of Winning:</b></u> ${data.chanceofWinning},<br/>
                <u><b>Competitors:</b></u> ${data.competitors},<br/>
                <u><b>How did we learn about the opportunity?:</b></u> ${data.learn},<br/>
                <u><b>Budget Range:</b></u> ${data.budgetrange}<br/><br/>
                <b>Opportunity Documents</b>:<br/>
                <u><b>File Url Link:</b></u><br/> ${data.urls}<br/><br/>
                <b>Submission Details</b>:<br/>
                <u><b>Proposal Type:</b></u> ${data.proposaltype},<br/>
                <u><b>Due Date:</b></u> ${data.dueDate}<br/><br/>
                <b>Opportunity View</b>:<br/>
                <br/><a href="http://presales-etgs.com/#/viewopportunity/${data.first_name}/${data.last_name}/${data.id}"><b>Click me</b></a><br/><br/>
                Thank you, <br/>
                Presales EverteamGs-Intalio,<br/>
                <img width="180" src="https://img.techpowerup.org/200324/output-onlinepngtools.png" />
            </html></body> ` // email content in HTML
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
  });
});

exports.sendMaillara = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
      const data = req.body;
      // getting dest email by query string

      const mailOptions = {
          from: 'Presales EverteamGs-Intalio <presales.everteam@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: 'georges.aramouny@intalio.com',
          subject: 'Presales Request Received', // email subject
          html: `<html><body>
                Dear,<br/><br/>
                Opportunity sent to presales,below a summary of the submitted request:<br/><br/>
                <b>Account Manager</b>:<br/>
                <u><b>First Name:</b></u> ${data.first_name},<br/>
                <u><b>Last Name:</b></u> ${data.last_name},<br/>
                <u><b>Country:</b></u> ${data.country}<br/><br/>
                <b>Client Info</b>:<br/>
                <u><b>Client fullname:</b></u> ${data.clientname}<br/><br/>
                <b>Opportunity Details</b>:<br/>
                <u><b>Project Description:</b></u> ${data.projectdesc},<br/>
                <u><b>Submission Date:</b></u> ${data.clientsubmissiondate},<br/>
                <u><b>Budget Range:</b></u> ${data.budgetrange}<br/><br/>
                <b>Opportunity Documents</b>:<br/>
                <u><b>File Url Link:</b></u><br/> ${data.urls}<br/><br/>
                Thank you, <br/>
                Presales EverteamGs-Intalio,<br/>
                <img width="180" src="https://img.techpowerup.org/200324/output-onlinepngtools.png" />
            </html></body> ` // email content in HTML
      };

      // returning result
      return transporter.sendMail(mailOptions, (erro, info) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
  });
});
