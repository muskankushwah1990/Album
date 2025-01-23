const mongoose = require("mongoose")

const documentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        fname: {
            type: String,
            require: true
        },
        dob: {
            type: String, 
            require: true
        },
        gender: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        address: {
            type: String, 
            require: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },

    },
    {timestamps: true}
)

const documentModel = mongoose.model("document", documentSchema)

module.exports = documentModel;