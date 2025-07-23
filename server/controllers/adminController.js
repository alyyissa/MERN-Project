import imagekit from "../configs/imageKit.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";

export const changeRoleToOwner = async (req,res) =>{
    try {
        const{_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success:true, message: "Now you can list cars"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}

// API to list cars

export const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        //Upload to image kit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalName,
            folder: '/cars'
        })

        // For URL Generation, works for both images and videos
    var optimizedImageURL = imagekit.url({
        path : response.filePath,
        transformation : [
            {width:'1280'}, // width resizing
            {quality: 'auto'}, // auto compression
            {format: 'webp'} // Convert to modern format
        ]
    });

    const image = optimizedImageURL;
    await Car.create({...car, admin: _id, image});
    res.json({success: true, message: "Car created successfully"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}
