import express from 'express';
import connetToDataBase from './databse/mongodb.js';
import cors from 'cors';    
import registerRouter from './routes/register.js';
import userDetailsRouter from './routes/userDetails.js';
import testRouter from './routes/test.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const corsOptions = {
    origin: "*", // Allow only frontend running on port 5174
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies or authentication headers
  };
app.use(cors(corsOptions))

app.use('/api/v1',registerRouter)
app.use('api/v1',userDetailsRouter) //this route is not working idk y 
app.use('/api/v1',testRouter) // this was wrttiten to replace userDetailsRouter
app.get('/',(req,res)=>{
    res.send("Server is running on port 5000")
})


app.listen(5000,()=>{
    console.log("Server is running on port 5000")
    connetToDataBase();
})