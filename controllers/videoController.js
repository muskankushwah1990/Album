const videoModel = require("../models/video");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dg6g8fnii",
  api_key: "364626995131484",
  api_secret: "HF5XJowO_L21gOejLPjOORKI_ts",
});

class videoController {
  static insert = async (req, res) => {
    try {
      // console.log(req.files.video)
      const { title } = req.body;
      const file = req.files.video;
      const videoUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "GalleryVideo",
        resource_type: "video",  // Ensure this is set for videos
        chunk_size: 6000000,  // Set chunk size to handle large videos (optional)
      });
      const result = new videoModel({
        title,
        video: {
          public_id: videoUpload.public_id,
          url: videoUpload.secure_url,
        },
      });
      

      const newVideo = await result.save();
      console.log(newVideo);

      if (newVideo) {
        return res.status(200).json({
          status: "success",
          message: "Video insert successfully!",
          newVideo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static display = async (req, res) => {
    try {
      const videos = await videoModel.find();
      res.statur(200).json({ status: "success", videos });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: "Error fetching video" });
      }
  };

  static view = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await videoModel.findById(id);

      if (!video) {
        return res
          .status(404)
          .json({ status: "error", message: "Video not found" });
      }

      res.status(200).json({
        status: "success",
        video,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Error fetching video" });
    }
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedVideo = await videoModel.findByIdAndDelete(id);

      if (!deletedVideo) {
        return res
          .status(404)
          .json({ status: "error", message: "Video not found" });
      }

      res.status(200).json({
        status: "success",
        message: "Video deleted successfully!",
        deletedVideo,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "error", message: "Error deleting video" });
    }
  };
}

module.exports = videoController;
