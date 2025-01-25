import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod"
import { UserModel } from "./db";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
    try {
        const signupSchema = z.object({
            username: z.string().min(1, "Username is required").max(20, "Username is too long"),
            password: z.string().min(6, "Password must be at least 6 characters long")
        });

        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Enter username and password correctly"

            });
            return;
        }

        const { username, password } = result.data;

        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            res.status(403).json({
                success: false,
                message: "Username already exits"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username: username,
            password: hashedPassword
        })
        res.status(200).json({
            success: true,
            message: "SignUp Successful"
        });

    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"

        });
    };
})

app.post("/api/v1/signin", async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            res.status(403).send({
                success: false,
                message: "You need to sign up first!"
            })
            return;
        }
        if (typeof existingUser.password !== 'string') {
            res.status(500).send({
                success: false,
                message: "Internal Server Error: Password is invalid"
            });
            return;
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (matchPassword) {
            const token = jwt.sign({
                id: existingUser._id.toString()
            }, process.env.JWT_SECRET)

            res.status(200).send({
                success: true,
                token: token
            })
            return;
        }
        res.status(403).send({
            successs: false,
            message: "Wrong Password"
        })
    } catch (e) {
        res.status(500).send({
            success:false,
            message:"Internal Server Error"
        })
    }
})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

async function main() {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("app started");
    app.listen(process.env.PORT);

}
main();

