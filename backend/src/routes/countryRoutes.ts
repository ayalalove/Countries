



import { Router } from 'express';
import { getCountries, createCountry, updateCountry, deleteCountry, fetchCountries, getCountryById } from '../controllers/countryController';

const router = Router();


router.get('/', getCountries);

router.get('/:id', getCountryById);


router.post('/', createCountry);


router.put('/:id', updateCountry);



router.delete('/:id', deleteCountry);


router.get('/fetch-countries', fetchCountries);

export default router;
