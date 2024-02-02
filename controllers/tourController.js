import Tour from '../models/Tour.js'

// create new tour

export const  createTour = async(req, res)=>{
    const newTour = new Tour(req.body)

    try{
        const savedTour = await newTour.save()

        res.status(200).json({success:true, message:'Successfully created'})
    }catch(err){
        res.status(500).json({success:false, message:'Failed to create'})
    }
}


// update Tour
export const updateTour = async(req, res)=>{

        const id = req.params.id
    try {
        
        const updateTour = await Tour.findByIdAndUpdate(id,{
            $set: req.body
        }, {new:true})

        res.status(200).json({success:true, message:'Successfully updated', data: updateTour})

    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update', data: savedTour})
        
    }
}

export const deleteTour = async(req, res)=>{
    const id = req.params.id
    try {
        
        await Tour.findByIdAndDelete(id)

        res.status(200).json({success:true, message:'Successfully deleted'})

    } catch (err) {
        res.status(500).json({success:false, message:'Failed to delete'})
        
    }
}

export const getSingleTour = async(req, res)=>{
    const id = req.params.id
    try {
        
        const tour = await Tour.findById(id)

        res.status(200).json(tour)

    } catch (err) {
        res.status(404).json({success:false, message:'Not found'})
        
    }
}
export const getAllTour = async(req, res)=>{
    try {
        
        const tours = await Tour.find({})

        res.status(200).json(tours)

    } catch (err) {
        res.status(404).json({success:false, message:'Not found'})
        
    }
}

export const searchTour = async(req, res)=>{
    const cityName = req.params.city;

    try {
        const data = await Tour.find({ city: { $regex: cityName, $options: 'i' } }).limit(8);
        res.send(data);
    } catch (error) {
        console.error('Error searching data:', error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}
