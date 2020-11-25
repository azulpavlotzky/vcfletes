var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', async (req, res, next) => {
  console.log(req.body);
   let nombre = req.body.nombre;
   let email = req.body.email;
   let tel = req.body.tel;
   let mensaje = req.body.mensaje;

   let obj = {
    to: 'vc.fletes@gmail.com',
    subjet: 'CONTACTO WEB',
    html: nombre + ' se contacto a traves de la web y quiere mas información a este correo: '
      + email + ' .<br> Ademas, hizo este comentario: ' + mensaje + '. <br> Su tel es: ' + tel
  }
  let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  let info = await transport.sendMail(obj);
  
  res.render('index', {
    message:'Mensaje enviado correctamente'
  })
});
  

module.exports = router;
