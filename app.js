require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

//Servir contenido estático
app.use( express.static('public') );

app.get('/',function(req,res){
    res.send('Hola puto')
})


app.get('*', ( req , res ) => {
    res.sendFile(__dirname+'/public/404.html')
})

app.listen(port, () => {
    console.log('DB online - port ' + port);
});