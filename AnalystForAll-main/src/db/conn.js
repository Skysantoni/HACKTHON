
const mongoose=require('mongoose');                                                          /*requiring mongoose Package*/ 
mongoose.connect('mongodb+srv://Saanvi_Singh:root@cluster0.njqri.mongodb.net/test');                       /*Connecting to mongodb database*/    

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error Connecting to database'));         /*Print error in console if occur*/

db.once('open',function(){                                                          /*Print in console if succesfully connected to database*/
    console.log('Succesfully connected to database');
});