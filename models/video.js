const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    video: {
        public_id: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            require: true,
        }
    }
  },
  {
    timestamps: true,
  }
);

const videoModel = mongoose.model("video", videoSchema);
module.exports = videoModel;
