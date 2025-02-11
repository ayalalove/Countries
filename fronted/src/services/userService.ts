import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';


export const getUsers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};


export const getUser = async (id: string) => {
  console.log("getUser");
  console.log(id);
  const { data } = await axios.get(`${API_URL}/${id}`);

  
  return data;
};



export const createUser = async (user: FormData) => {

  
  const { data } = await axios.post(API_URL, user, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  
  return data;
};




export const updateUser = async (id: string, user: any) => {
  const { data } = await axios.put(`${API_URL}/${id}`, user);
  return data;
};


export const deleteUser = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};


export const loginUser = async (credentials: { username: string; password: string }) => {
  console.log("loginUser");
  
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  return data;
};
