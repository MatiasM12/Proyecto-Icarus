const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function enviarMail(titulo, texto) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "proyectoaguila.byicarus@gmail.com", // generated ethereal user
            pass: "pyqycfosksvimcvf", // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Notificacion de Special Flights SA" <specialflights.com>', // sender address
        to: "proyectoaguila.byicarus@gmail.com", // list of receivers
        subject: titulo, // Subject line
        text: texto, // plain text body
    });


}

module.exports = { enviarMail }
