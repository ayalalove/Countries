



import { Router } from 'express';
import { getCountries, createCountry, updateCountry, deleteCountry, fetchCountries, getCountryById } from '../controllers/countryController';

const router = Router();


router.get('/countries', getCountries);

router.get('/countries/:id', getCountryById);


router.post('/countries', createCountry);


router.put('/countries/:id', updateCountry);



router.delete('/countries/:id', deleteCountry);


router.get('/fetch-countries', fetchCountries);

export default router;
