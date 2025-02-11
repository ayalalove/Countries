
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import countryRoutes from './routes/countryRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path';
import { clearCountriesCollection, fetchAndSaveCountries } from './services/countryService';
import { corsMiddleware } from './middlewares/corsMiddleware';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { rateLimitMiddleware } from './middlewares/rateLimitMiddleware';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();





connectDB();



app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());

app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(rateLimitMiddleware);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
