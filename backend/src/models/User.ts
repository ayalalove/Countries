



import mongoose from 'mongoose';


interface IUser {
    firstName: string;
    lastName: String,
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string
  }


  const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String,  unique: true },
    lastName: { type: String },
    username: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    role: { type: String }
  });

  

const User = mongoose.model<IUser>('User', UserSchema)

export default User;











