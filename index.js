const express = require('express');
const mongoose = require('mongoose');
const User = require('./user'); 
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send("user deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});


mongoose.connect('mongodb+srv://fazzyboo:7156213111566@cluster0.lcqxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err)
});