import request from 'supertest';
import express from 'express';
import countryRoutes from '../routes/countryRoutes'; // הנתיב למודול route שלך
import { getCountries, createCountry, updateCountry, deleteCountry, fetchCountries } from '../controllers/countryController';
import connectDB from '../config/db';
import mongoose from 'mongoose';

//הטסיים עובדים


connectDB();





afterAll(async () => {
  // סוגר את החיבור למסד הנתונים
  await mongoose.connection.close();
  console.log('mongoDB connection closed');
});



const app = express();
jest.setTimeout(10000); // 10 שניות
// להשתמש בנתיבי ה-API שלך
app.use(express.json());
app.use('/api', countryRoutes);

describe('Test API routes', () => {

  // בדיקה לנתיב GET /api/countries
  // it('should fetch all countries', async () => {
   
  //   const response = await request(app).get('/api/countries');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expect.arrayContaining([])); 
  // });


  it('should fetch all countries', (done) => {
    request(app)
      .get('/api/countries')
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([]));
        done(); // מסיים את הטסט
      })
      .catch(error => done(error));
  }, 40000);



// כשאני עשה פעמיים פוסט הוא לא נותן לי את אותם נתונים לכן צריך לשנות בכל פעם

  // בדיקה לנתיב POST /api/countries
  // it('should create a new country', async () => {
  //   const newCountry = {
  //     name: 'Israelaz',
  //     flag: 'IL'
  //   };
  //   const response = await request(app)
  //     .post('/api/countries')
  //     .send(newCountry);
  //   expect(response.status).toBe(201);
  //   expect(response.body.name).toBe('Israelaz');
  //   expect(response.body.flag).toBe('IL');
  // });

  // // בדיקה לנתיב PUT /api/countries/:id
  // it('should update an existing country', async () => {
  //   const updatedCountry = {
  //     name: 'Israel Updated',
  //     flag: 'ILU'
  //   };
  //   const response = await request(app)
  //     .put('/api/countries/67961e4f416f9c73ea0b42fa') 
  //     .send(updatedCountry);
  //   expect(response.status).toBe(200);
  //   expect(response.body.name).toBe('Israel Updated');
  //   expect(response.body.flag).toBe('ILU');
  // });

  // // בדיקה לנתיב DELETE /api/countries/:id
  // it('should delete a country', async () => {
  //   const response = await request(app)
  //     .delete('/api/countries/67961e4f416f9c73ea0b42fa'); 
  //   expect(response.status).toBe(200);
  //   expect(response.body.message).toBe('Country deleted');
  // });

  // // בדיקה לנתיב GET /api/fetch-countries
  // it('should fetch countries from external API', async () => {
  //   const response = await request(app).get('/api/fetch-countries');
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expect.arrayContaining([])); // תתאם לתוצאה הצפויה
  // });

});
