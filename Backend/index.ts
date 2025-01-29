import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod"
import { ContentModel, LinkModel, UserModel } from "./db";
import { UserMiddleware } from "./middleware";
import { random } from "./utilis";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req: Request, res: Response): Promise<void> => {
    try {
        const signupSchema = z.object({
            username: z.string().min(1, "Username is required").max(20, "Username is too long"),
            password: z.string().min(5, "Password must be at least 6 characters long")
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
            if (typeof process.env.JWT_SECRET !== 'string') {
                res.status(500).send({
                    success: false,
                    message: "Internal Server Error: Password is invalid"
                });
                return;
            }
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
            success: false,
            message: "Internal Server Error"
        })
    }
})

app.post("/api/v1/content", UserMiddleware, async (req, res) => {
    const { title, link,type } = req.body;
    await ContentModel.create({

        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.status(200).send({
        success: true,
        message: "Content added"
    })
})

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.status(200).send({
        success: true,
        content
    })

})

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    console.log(contentId);
    //@ts-ignore

    console.log(req.userId);

    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId,
    })

    res.status(200).send({
        success: true,
        message: "content deleted"
    })
})

app.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
    try {
        const { share } = req.body;
        if (share) {
            const existingLink = await LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            })
            if (existingLink) {
                res.send({
                    success: true,
                    message: "/share/" + existingLink.hash
                })
                return;
            }
            const hash = random(20);
            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash,
            })
            res.send({
                success: true,
                message: "/share/" + hash
            })
        } else {
            await LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            })
            res.send({
                success: true,
                message: "Link deleted"
            })
        }
    } catch (e) {
        res.status(403).send({
            success: false,
            message: "You have already created a link. Delete that to create a new one"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash,
    })
    if (!link) {
        res.status(411).send({
            success: false,
            message: "Link doesn't exists"
        })
        return;
    }
    const content = await ContentModel.find({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId

    })
    if (!user) {
        res.status(411).send({
            success: false,
            message: "User does not exists"
        })
        return;
    }
    res.send({
        success: true,
        username: user.username,
        content: content
    })
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

