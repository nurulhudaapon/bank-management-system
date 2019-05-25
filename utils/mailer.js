const config = require('config');
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport(config.get('email'));

module.exports.sendMail = async function (to, sub, html) {

  let info = await transporter.sendMail({
    from: `"Bank-PONSRIK" <${config.get('email.auth.user')}>`,
    // from: `"Bank-PONSRIK" <bank@ponsrik.cf>`,
    to: to,
    subject: sub,
    html: html
    
  });
}
// module.exports.sendMail('nurulhuda859g@gmail.com', 'Testfrom nodefdgdfgmailer module', 'htmlgfg');

