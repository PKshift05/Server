import express from 'express'
import {createTour, getAllTour, getSingleTour, updateTour, deleteTour, searchTour} from '../controllers/tourController.js'

const router = express.Router();
router.post('/', createTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);
router.get('/:id', getSingleTour);
router.get('/', getAllTour);

router.post('/search/:city/:distance/:maxGroupSize', searchTour)
export default router;


