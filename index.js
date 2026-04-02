import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT;
const app = express();



app.listen(PORT, () => { `Server is up and Running on PORT: ${PORT}` });