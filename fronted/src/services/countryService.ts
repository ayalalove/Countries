import axios from 'axios';

const API_URL = 'http://localhost:5000/api/countries';

export const getCountries = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getCountry = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/${id}`);

  return data;
};

export const createCountry = async (country: any) => {
  const { data } = await axios.post(API_URL, country);
  return data;
};

export const updateCountry = async (id: string, country: any) => {
  const { data } = await axios.put(`${API_URL}/${id}`, country);
  return data;
};

export const deleteCountry = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
