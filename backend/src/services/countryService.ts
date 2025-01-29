import axios from 'axios';
import Country from '../models/Country';
import { error } from 'console';



//

const API_URL = "https://restcountries.com/v3.1/all";

const getCountriesFromAPI = async () => {
  try {
    // const response = await axios.get(API_URL);
    


    const response = await axios.get('https://restcountries.com/v3.1/all', {
      timeout: 10000, // זמן קצוב ב-10 שניות
    });
    return response.data;
  } catch (error) {
    console.error('Error details:', error);
    throw new Error('Error fetching countries from API');
  }
};



const saveCountriesToDB = async (countries: any[]) => {
  console.log('Total countries to save:', countries.length);
  for (let country of countries) {
    const { name, flags, population, region } = country;

    console.log('Processing country:', name.common);
    const existingCountry = await Country.findOne({ name: name.common });
    if (!existingCountry) {
      const newCountry = new Country({
        name: name.common,
        // flag: flags?.png || flags?.svg || '',
        flag: flags || '',
        population: population || 0,
        region: region || 'Unknown',
      });

      try {
        await newCountry.save();
        console.log(`Country saved: ${name.common}`);
      } catch (saveError) {
        console.error(`Error saving country ${name.common}:`, error);
      }
    }
  }
};






// const fetchAndSaveCountries = async () => {
//   const countries = await getCountriesFromAPI();
//   await saveCountriesToDB(countries);
// };

// export { fetchAndSaveCountries };










export const clearCountriesCollection = async () => {
  try {
    await Country.deleteMany({}); // מוחק את כל הנתונים באוסף
    console.log("אוסף המדינות נמחק בהצלחה!");
  } catch (error) {
    console.error("שגיאה במחיקת האוסף:", error);
  }
};

export const fetchAndSaveCountries = async () => {
  try {
    await clearCountriesCollection(); // מחיקת כל הנתונים הקיימים
    const countries = await getCountriesFromAPI();
    await saveCountriesToDB(countries);
    console.log("כל המדינות נשמרו בהצלחה!");
  } catch (error) {
    console.error("שגיאה בתהליך הבאת ושמירת המדינות:", error);
  }
};