
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import countryRoutes from './routes/countryRoutes';
import { clearCountriesCollection, fetchAndSaveCountries } from './services/countryService';

dotenv.config();

const app = express();

connectDB();

//כשרוצים למחוק את כל הארצות מהדאטה ואז להנכניס מחדש
// clearCountriesCollection()
// fetchAndSaveCountries()


app.use(cors({
  origin: 'http://localhost:5173', 
}));


app.use(express.json());


app.use('/api', countryRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
