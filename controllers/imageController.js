const imageModel = require("../models/image")
const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: "dg6g8fnii",
    api_key: "364626995131484",
    api_secret: "HF5XJowO_L21gOejLPjOORKI_ts",
  })



class imageController {

    static insert = async(req, res) => {
        try {
            // console.log(req.files.image)
            const imageID = req.userdata._id;
            const file = req.files.image;
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {folder: "Album"});
            const result = new imageModel({
                image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                },
                imageID: imageID
            });

            const newImg = await result.save()

            if(newImg) {
                return res.status(200).json({status: "success", message: "Image insert successfully!", newImg})
            }
           
        } catch (error) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {
            const {_id} = req.userdata;
            const allImage = await imageModel.find({
                "imageID": _id
            })

            if(allImage) {
                return res.status(200).json({status: "success", allImage})
            }else{
                return res.status(404).json({ status: "failure", message: "No images found" });
            }
        } catch (error) {
            console.log(error)
        }
    }

    static view = async(req, res) => {
        try {
            const {id} = req.params
            const viewImg = await imageModel.findById(id)
            // console.log(viewImg)

            if(viewImg) {
                return res.status(200).json({status: "success", viewImg})
            }
        } catch (error) {
            console.log(error)
        }
    }

    static delete = async(req, res) => {
        try {
            const {id} = req.params
            const imageDelete = await imageModel.findById(id)
            const imageId = imageDelete.image.public_id
            // console.log(imageId)
            await cloudinary.uploader.destroy(imageId)
          const destroyImg = await imageModel.findByIdAndDelete(id)

          if(destroyImg) {
            return res.status(200).json({status: "success", message: "Image deleted successfully!"})
        }
        } catch (error) {
            console.log(error)
        }
    }


    


























}

module.exports = imageController