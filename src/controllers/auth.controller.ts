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