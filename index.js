import express from 'express';
import 'dotenv/config';
import usersRoutes from './Routes/user.route.js';


const app = express();

app.use(express.json());

app.use('/users', usersRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on PORT: ${process.env.PORT}`);
});