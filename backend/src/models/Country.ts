import mongoose from 'mongoose';

interface ICountry {
  name: string;
  flag: string;
  population: number;
  region: string;
}



const CountrySchema = new mongoose.Schema<ICountry>({
    name: { type: String,  unique: true },
    flag: { type: String },
    population: { type: Number },
    region: { type: String }
  });
  

const Country = mongoose.model<ICountry>('Country', CountrySchema);

export default Country;
