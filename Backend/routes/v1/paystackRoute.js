import express from 'express';
import { handleInitializeTransaction, handleVerifyTransaction } from '../../controllers/paystackController.js';

const router = express.Router();


router.post('/initialize', handleInitializeTransaction);
router.get('/verify/:reference', handleVerifyTransaction);


export default router;