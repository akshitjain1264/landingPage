const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://codewithakshit:akshit@sih.i9bfa.mongodb.net/?retryWrites=true&w=majority&appName=SIH")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Mongoose schema and model
const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// API route to handle form submission
app.post("/api/contact", async (req, res) => {
  try {
    const { email, phone } = req.body;
    const newContact = new Contact({ email, phone });
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
