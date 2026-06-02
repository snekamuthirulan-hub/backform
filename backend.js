import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["https://frontform.vercel.app","http://localhost:5173/"]
}));
app.use(json());

// MongoDB Connection
connect("mongodb+srv://snekamuthirulan27_db_user:pSQBijTxewxi9oWh@cluster0.vpvo9jg.mongodb.net/userformdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const UserSchema = new Schema({
  name: String,
  phone: String,
  email: String,
});

const User = model("User", UserSchema);


app.get("/", (req, res) => {
  res.send("Backend is running");
});
/* CREATE */
app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* READ ALL */
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* READ SINGLE */
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE */
app.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE */
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});