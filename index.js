var http=require('http');
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.get('/', function(req, res){
   res.sendFile(__dirname+'/formpage.html');
});	

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   const sgMail = require('@sendgrid/mail');
   var apikey="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";
	sgMail.setApiKey(apikey);
	var mesg = {
  	to: req.body.emailid,
  	from: 'donotreply@test.com',
  	subject: req.body.subject,
  	text: req.body.msg
	};
	sgMail.send(mesg);
	const Nexmo = require('nexmo');
	const nexmo = new Nexmo({
  		apiKey: '9243c873',
  		apiSecret: 'jnPWhw97eoCAMPNA'
	})
	var text=req.body.subject+" "+req.body.msg;
	nexmo.message.sendSms("DCC-NoReply", req.body.mobile, text)
		res.send("Mail and SMS Sent");
	});
app.listen(process.env.PORT);

