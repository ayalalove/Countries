 
 
 
 
 
 export  interface IUser {
    firstName: string;
    lastName: String,
    username: string;
    email: string;
    phone: string;
    profileImage: string | undefined;
    password: string;
    role: string| "user";
  }