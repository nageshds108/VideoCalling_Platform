import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import http from "http"
import { connectTosocket } from "./Controllers/SocManager.js";
import mongoose from  "mongoose"
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express()
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/users",userRoutes);

const server=http.createServer(app)

const io = connectTosocket(server);

const port = Number(process.env.PORT) || 5000;
const M_url= process.env.Mongo_URL;


const main= async()=>{
    try {
    await mongoose.connect(M_url)
    console.log("Connected to MDB")
        
    } catch (error) {
        console.log(error)
        
    }
  
};

main();

app.get("/",(req,res)=>{
    res.send("Server Running...")

})

let currentPort = port;

server.listen(port, () => {
    console.log(`Server Listening On port ${currentPort}`);
})




