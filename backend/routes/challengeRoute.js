import express from 'express';
import {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
} from '../controllers/challengeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();


router.post('/upload' , upload,  createChallenge); 
router.get('/', getChallenges);
router.get('/:id', getChallengeById);    
router.put('/:id', updateChallenge);      
router.delete('/:id', deleteChallenge);

export default router;
