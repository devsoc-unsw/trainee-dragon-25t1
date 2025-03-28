import express from "express";
import cors from 'cors';

const EXPRESS_PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('spotz backend says hello');
});

// TODO 
// ROUTES TO BE IMPLEMENTED

app.listen(EXPRESS_PORT, () => {
    console.log(
      `🤝📆 spotz backend listening on port ${EXPRESS_PORT} 📆🤝`
    );
});
