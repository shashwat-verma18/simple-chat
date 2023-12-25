const express = require('express');
const router = express.Router();
const fs = require('fs');

var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

router.get('/login', (req,res,next) =>{
    res.send('<form action="/" method="POST"><input type="text" name="username" style="padding:5px; margin:5px"/><button style="padding:5px; margin:5px" type="submit">Login</button></form>');
});

router.post('/', (req,res) =>{
    if(req.body.username!= null){
        localStorage.setItem('username', req.body.username);
    }
    else{
        var username = localStorage.getItem('username');
        var message = req.body.message;
        var msg = `${username} : ${message}`;

        fs.readFile('msg.txt', 'utf8', (err, data) =>{
            if(!err) {
                msg = data+" "+msg;
            }
            fs.writeFile('msg.txt', msg, err =>{
                console.log('Written successfully : ', msg);
            })
        });
        
    }
    res.redirect('/');
});

router.get('/', (req,res)=>{
    fs.readFile('msg.txt', 'utf8', (err, data) =>{
        if(!err) {
            res.send(`<p style="padding:5px; margin:5px"> ${data} </p> <form action="/" method="POST"><input type="text" name="message" style="padding:5px; margin:5px"/><button style="padding:5px; margin:5px" type="submit">Send message</button></form>`);
        }
        else
        res.send(`<form action="/" method="POST"><input type="text" name="message" style="padding:5px; margin:5px"/><button style="padding:5px; margin:5px" type="submit">Send message</button></form>`);
    });
});

module.exports = router;