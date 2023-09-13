import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import image from './models/image.js';

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
const PORT = 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.get('/get-all-images', async function (req, res) {
    try {
        res.status(200).json({
            data: await image.find()
        });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/get-one-image/:id', async function (req, res) {
    try {
        res.status(200).json({
            data: await image.findById(req.params.id)
        });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post('/save-new-image/:url', async function (req, res) {
    try {
        const newImage = new image({ url: req.params.url });
        await newImage.save();

        res.status(201).send();
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.delete('/delete-one-image/:id', async function (req, res) {
    try {
        await image.deleteOne({ _id: new ObjectId(req.params.id) });

        res.status(200).send();
    } catch (error) {
        res.status(500).send(error.toString());
    }
})

const startServer = async () => {
    try {
        try {
            await mongoose.connect('mongodb+srv://workayushverma02:biYeKAAihzO1OSU2@cluster0.ftk2bgt.mongodb.net/paddytest', {
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
