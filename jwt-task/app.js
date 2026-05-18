const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
app.use(express.json());

const users = [
    {email: "alik@gmail.com", password: bcrypt.hashSync("alikavetisyan", 10)},
    {email: "saqo@gmail.com", password: bcrypt.hashSync("saqoaper", 10)},
    {email: "tiko@gmail.com", password: bcrypt.hashSync("tigoaper", 10)},
]
const posts = [
    {
    id: 1,
    title: "Welcome Post",
    content: "This is your first protected post",
    author: "Admin"
  },
  {
    id: 2,
    title: "JWT Guide",
    content: "Learn how JWT authentication works",
    author: "System"
  },
  {
    id: 3,
    title: "Backend Tips",
    content: "Always hash passwords and protect routes",
    author: "Dev"
  }
]

function auth(req, res, next) {
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({message: "Not authorized"});
    }



    const token = authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Token missing"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Token expired"})
    }


}



app.post("/api/register" , (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Required data"});

    }

    const match = users.some(user => user.email === email);

    if(match) {
        return res.status(400).json({message: "Email already exists..."});
    }

    const newUser = {email, password: bcrypt.hashSync(password, 10)};

    users.push(newUser);

    res.status(201).json({message: "User successfully created...", 
        user: email
    })
})

app.get("/", auth, (req, res) => {
    res.send("hello")
})

app.get("/api/posts", auth, (req, res) => {
    res.status(200).json({
        message: "Fetched Successfully",
        user: req.user,
        posts
    });
})

app.post("/api/login", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Required data"});
    }

    const user = users.find(user => user.email === email);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    const match = bcrypt.compareSync(password, user.password);

    if(!match){
        return res.status(401).json({message: "Invalid password"});
    }


    const token = jwt.sign(
        {email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
)

res.status(200).json({message: "Login successfully", 
    token
})

})

app.get("/api/me", auth, (req, res) => {
    res.status(200).json(
        {
            message: "Your Profile",
            user: req.user
        }
    )
})


app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
})



