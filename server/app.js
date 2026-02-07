import express from "express";
import dotenv from "dotenv";
dotenv.config()
// import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// import database
import "./utils/dbConnect.js";

// import public routers;
import publicRouter from "./controllers/public/public.js"

// import middleware
import middleware from "./auth/auth.js";

// import private routers
import privateRouter from "./controllers/private/private.js"

const app = express()
app.use(express.json());
// let corsObject = {
//     origin : ["http://localhost:5173", "http://localhost:5174"],
//     methods : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders : ["Content-Type", "Authorization"]
// }
// app.use(cors(corsObject))
const port = process.env.PORT;
// app.get("/",(req,res)=>{
//     try {
//         res.status(200).json({msg : "server is running"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
// })
app.use("/public",publicRouter);
app.use(middleware);
app.use("/private",privateRouter);
const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));
app.get("*",(req,res)=>{
    res.sendFile(path.join(buildPath, "index.html"));
});
app.listen(port,()=>{
    console.log(`sever is running atr http://localhost:${port}`)
})