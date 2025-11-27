import { catchAsync } from "../utils/catchAsync"


export const register = catchAsync(async (req, res, next) => {
    res.json({ message: "User registered" });
})