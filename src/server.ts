import dotenv from 'dotenv'
dotenv.config();

import app from "./index";

const port = process.env.NODE_PORT || 8000;

app.listen(port, () => {
    console.log("App is running on port: ", port, process.env.NODE_PORT)
})