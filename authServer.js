const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "mysecretkey";

mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);


// ===============================
// 📝 REGISTER ROUTE
// ===============================
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });

  } catch (error) {
    res.status(500).json({ error: "Registration Failed" });
  }
});


// ===============================
// 🔐 LOGIN ROUTE
// ===============================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});


// ===============================
// 🔒 PROTECTED ROUTE (Example)
// ===============================
app.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    const verified = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(verified.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
