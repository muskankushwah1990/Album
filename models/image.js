const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
    {
        image: {
            public_id: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            }
        },
        imageID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
    },
    {
        timestamps: true
    }
)

const imageModel = mongoose.model("image", imageSchema)
module.exports = imageModel

