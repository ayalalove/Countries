
import { Request, Response } from 'express';
import Country from '../models/Country';
import { fetchAndSaveCountries } from '../services/countryService';




export const getCountries = async (req: Request, res: Response): Promise<void> => {
  
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  
  try {
    const countries = await Country.find();  
     res.status(200).json(countries);  
     console.log("The data has been uploaded successfully");
  } catch (error) {
     res.status(500).send('Error fetching countries');
  }
};





export const getCountryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const country = await Country.findById(id);
    if (!country) {
      res.status(404).send('Country not found');
      console.log('Country not found');
      return;
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).send('Error fetching country');
    console.log('Error fetching country');
  }
};




export const createCountry = async (req: Request, res: Response): Promise<void> => {
    const { name, flag, population, region } = req.body;
    try {
      const newCountry = new Country({ name, flag, population, region });
      await newCountry.save();
      res.status(201).json(newCountry); 
    } catch (error) {
      res.status(500).send('Error creating country');
    }
  };


export const updateCountry = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, flag, population, region } = req.body;
  try {
    const updatedCountry = await Country.findByIdAndUpdate(id, { name, flag, population, region }, { new: true });
    if (!updatedCountry) {
       res.status(404).send('Country not found');
       console.log('Country not found');
       
    }
     res.status(200).json(updatedCountry);  
  } catch (error) {
     res.status(500).send('Error updating country');
     console.log('Error updating country');
     
  }
};


export const deleteCountry = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
       res.status(404).send('Country not found');
       console.log('Country not found');
    }
     res.status(200).json({ message: 'Country deleted' });  
     console.log('Country deleted');
  } catch (error) {
     res.status(500).send('Error deleting country');
     console.log('Error deleting country');
  }
};


export const fetchCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    await fetchAndSaveCountries();  
     res.status(200).send('Countries fetched and saved to DB');  
  } catch (error) {
     res.status(500).send('Error fetching countries');
  }
};
