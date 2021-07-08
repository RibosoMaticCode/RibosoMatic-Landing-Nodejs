const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// dashboard
router.get('/', (req, res) => {
    res.render('layouts/main');
});

// enviar formulario
router.post('/sendmail', (req, res) => {
    const { Names, Email, Whatsapp, Consult } = req.body;

    const content_html = `
        <h1>Informacion del formulario</h1>
        <li>Nombres: ${Names}</li>
        <li>Telefono: ${Whatsapp}</li>
        <li>E-mail: ${Email}</li>
        <li>Consulta: ${Consult}</li>
    `;

    var transporter = nodemailer.createTransport({
        host: 'smtp.yourhost.com',
        port: '465',
        secure: true,
        auth: {
            user: 'hello@yourhost.com',
            pass: 'YourPass'
        }
    });
      
    var mailOptions = {
        from: 'RibosoMatic Landing <no-reply@yourhost.com>',
        to: 'yourpersonal@gmail.com',
        subject: 'Formulario contacto',
        html: content_html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            const result = {
                result: false,
                msg: error
            };
            res.json(result);
        } else {
            const result = {
                result: true,
                msg: 'Mensaje enviado',
                info: info.response
            };
            res.json(result);
        }
    });
});

module.exports = router;