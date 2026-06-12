const express = require("express");
require("dotenv").config();
const cors = require("cors")
const app = express();
const authRoutes = require("./routes/auth/auth")


app.use(express.json())
app.use(cors())
app.use("/auth", authRoutes)

app.get("/", (req, res)  => {
    return res.json({message: "Api is running"})    
})


app.listen(process.env.PORT, () => {
    console.log(`Server is runnig on Port ${process.env.PORT}`)
})