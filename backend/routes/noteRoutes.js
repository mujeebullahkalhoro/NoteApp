import express from 'express';
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  toggleFavorite,
  toggleImportant, 
} from '../controllers/noteController.js';

import { authenticateUser } from '../middlewares/auth.js'; 

const router = express.Router();

// Protect all note routes so only logged-in users can access
router.use(authenticateUser);

router.post('/', createNote);

router.get('/', getNotes);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);


router.patch('/:id/favorite', toggleFavorite);
router.patch('/:id/important', toggleImportant);

export default router;
