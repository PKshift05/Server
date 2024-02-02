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
   
    try {
        let { city, distance, maxGroupSize } = req.params;

        // Tạo một đối tượng query rỗng
        const query = {};

        // Nếu city được truyền vào, thêm điều kiện tìm kiếm cho city
        if (city) {
            query.city = { $regex: city, $options: 'i' };
        } else{
            city = ""
            query.city = { $regex: city, $options: 'i' };
        }

        // Nếu distance được truyền vào, thêm điều kiện tìm kiếm cho distance
        if (distance!=0) {
            query.distance = { $lte: distance };
        }else{
            distance=10000
            query.distance = { $lte: distance };
        }

        // Nếu maxGroupSize được truyền vào, thêm điều kiện tìm kiếm cho maxGroupSize
        if (maxGroupSize!=0) {
            query.maxGroupSize = {$lte: maxGroupSize};
        }else{
            maxGroupSize=100
            query.maxGroupSize = {$lte: maxGroupSize};

        }

        // Thực hiện truy vấn với các điều kiện tìm kiếm đã xây dựng
        const data = await Tour.find(query).limit(8);

        if (data.length === 0) {
            res.status(404).send({ success: false, message: "No tours found with the specified criteria." });
        } else {
            res.send(data);
        }
    } catch (error) {
        console.error('Error searching data:', error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}
