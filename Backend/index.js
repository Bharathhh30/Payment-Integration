import express from 'express';
import connetToDataBase from './databse/mongodb.js';
import cors from 'cors';    
import registerRouter from './routes/register.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
    origin: "http://localhost:5174", // Allow only frontend running on port 5174
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies or authentication headers
  };
app.use(cors(corsOptions))

app.use('/api/v1',registerRouter)
app.get('/',(req,res)=>{
    res.send("Server is running on port 5000")
})


app.listen(5000,()=>{
    console.log("Server is running on port 5000")
    connetToDataBase();
})