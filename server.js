const express = require('express');
const app = express();

app.listen(8000, function(){
    console.log('listening on 8000')
});

app.get('/',function(req,res){
    res.render('index.html')
});