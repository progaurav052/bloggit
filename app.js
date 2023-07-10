//express server
require('dotenv').config();


const express =require("express");
const expressLayout=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo');
const session = require('express-session');
const connectDB=require('./server/config/db');
const methodOverride=require('method-override');


const app=express();
const PORT=5000 || process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    }),
}));

//connect to database
connectDB();




app.use(express.static('public'));



app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');


app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));

app.listen(PORT,()=>{
    console.log(`server started and running at port ${PORT}`);
});

