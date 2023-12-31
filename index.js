import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import image from "./models/image.js";

console.log('Deployed')

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/get-all", async function (req, res) {
  try {
    res.status(200).json({
      data: await image.find(),
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post("/save-new", async function (req, res) {
  try {
    const { url } = req.body;

    const newImage = new image({ url });
    await newImage.save();

    res.status(201).send();
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.delete("/delete-one/:id", async function (req, res) {
  try {
    console.log(req, "req............");
    await image.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const startServer = async () => {
    try {
        try {
            await mongoose.connect('mongodb+srv://Developer:3RwoqNORAnMG8XBG@cluster0.inbyuy1.mongodb.net/?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }

        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

startServer();
