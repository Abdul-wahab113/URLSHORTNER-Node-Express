import express from 'express';
import 'dotenv/config';
import usersRoutes from './Routes/user.route.js';
import urlsRoutes from './Routes/urls.routes.js';
import {userAutenticationMiddleware} from './Middlewares/auth.middleware.js';


const app = express();

app.use(express.json());
app.use(userAutenticationMiddleware);
// Routes 
app.use('/users', usersRoutes);
app.use(urlsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on PORT: ${process.env.PORT}`);
});