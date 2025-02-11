
import mongoose from 'mongoose';


interface IUser {
    firstName: string;
    lastName: String,
    username: string;
    email: string;
    phone: string;
    profileImage: string | null;
    password: string;
    role: string| "user";
  }


  const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String,required: true },
    username: { type: String,required: true },
    email: { type: String,required: true },
    phone: { type: String,required: true },
    profileImage: { type: String }, 
    password: { type: String },
    role: { type: String}
  });

  

const User = mongoose.model<IUser>('User', UserSchema)

export default User;











