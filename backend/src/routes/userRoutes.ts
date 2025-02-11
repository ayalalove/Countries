import { Router } from 'express';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  loginUser,  
} from '../controllers/userController';
import upload from '../services/userService';  
const router = Router();


router.get('', getUsers);

router.get('/:id', getUserById);


router.post('', createUser);

router.post('/login',loginUser);

router.put('/:id', updateUser);


router.delete('/:id', deleteUser);


export default router;
