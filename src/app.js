import express from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import { connectDB } from './database';

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
connectDB();

// Routes setup
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

export default app;
