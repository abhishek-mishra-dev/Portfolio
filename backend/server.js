import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cors from "cors"
import { config } from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import multer from 'multer'
import fs from 'fs'

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log("directory",__dirname);
// console.log("fileName",__filename);
const PORT = process.env.PORT || 1400;

mongoose.connect(process.env.mongoUri)
    .then(() => console.log("mongodb connected successfully"))
    .catch((err) => console.log(`An Erro has Occurred to connect :${err}`));


const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, "uploads")));
console.log("Static folder path:", path.join(__dirname, "uploads"));
console.log("check the path");
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String }
})

const User = mongoose.model("User", userSchema);

app.post("/api/user/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(201).json({ success: false, message: 'User Already Exists Try Login...' })
        }
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, { expiresIn: "7d" });
        res.status(200).json({ success: true, message: "register successfully", token, user });
    }
    catch (e) {
        res.status(500).json({ success: false, message: `something went wrong:${e.message}` })
    }

})

app.post("/api/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(202).json({ success: false, message: "User not found" });

        const confirmPassword =bcrypt.compare(password, user.password);
        if (!confirmPassword) {
            return res.status(202).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.jwt_secret_key, { expiresIn: "7d" });
        const userData = {
            name: user.name,
            email: user.email,
        }
        res.status(200).json({ success: true, message: "logged In successfully", token, userData });

    } catch (error) {
        res.status(500).json({ success: false, message: `${error.message}` });
    }
})

const isAfzal = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(501).json({ success: false, message: "No token provided" });
        }
        const decode = jwt.verify(token, process.env.jwt_secret_key);
        const user = await User.findById(decode.id).select('-password');

        if (!user) {
            return res.status(201).json({ success: false, message: "User Not found with the token" });
        }
        if (user.email !== 'mohammedafzal1213@gmail.com') {
            return res.json({ success: false, message: "You are not Afzal" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `isAfzal mdlware error ${error.message}` });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    }
});

const upload = multer({ storage });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    url1: { type: String, required: true },
    url2: { type: String },
})
const Project = mongoose.model("Project", projectSchema);

app.post("/add-project", isAfzal, upload.single("image"), async (req, res) => {
    try {
        const { title, description, url1, url2 = undefined } = req.body;
        const image = req.file;//object has many things
        const project = new Project({
            title,
            description,
            url1,
            url2,
            image: image.filename
        })
        await project.save();
        res.status(200).json({success:true,message:"Project added successfully",project});
    }
    catch (e) {
        res.status(500).json({success:false,mesaage:`${e.message}`});
    }
})

app.get("/get-projects",async(req,res)=>{
    try {
        const projects=await Project.find();
        res.status(200).json({success:true,projects});
    } catch (error) {
        res.status(500).json({success:false,mesaage:"Couldn't get the projects"});     
    }
})


app.delete("/projects/:id",isAfzal,async(req,res)=>{
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    const imagePath = path.join(__dirname, "uploads", project.image);

   fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err.message);
      }
    });

    

    res.status(200).json({ success: true, message: "Project and image deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Couldn't delete the project" });
  }

})


app.get("/", (req, res) => {
    res.send(`<p>Server is working don't worry about it </p>`)
})
app.get("/loads",(req,res)=>{
    res.send("All of them are not working properly");
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})