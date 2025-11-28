import * as bcrypt from "bcryptjs";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../config/database";


export const register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Hash Password 
    const hashedPass:string = await bcrypt.hash(password, 15)

    // Create user in db 
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPass
        }
    })

    res.json({ message: "User registered", data: {user}});
})

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    // Check user 
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user) res.status(404).json({message: "User not found!"})

    // Check user pass 
    const checkPass = await bcrypt.compare(password, user?.password || "");

    if (!checkPass) res.status(404).json({message: "Email/Password is wrong!"});

    res.status(200).json({message: "Logined successfully!", data: user})
})