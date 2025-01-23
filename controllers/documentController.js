const documentModel = require("../models/document");


class documentController {
    static insert = async(req, res) => {
        try {
            const userID = req.userdata._id
            const {name, fname, dob, gender, phone, address} = req.body

            const result = new documentModel({
                name: name,
                fname: fname,
                dob: dob,
                gender: gender,
                phone: phone,
                address: address,
                userID: userID
            })

            const documents = await result.save()

            res.status(200).json({status: "success", message: "Document insert successfully!", documents})

        } catch (error) {
            console.log(error)
        }
    }

    static display = async(req, res) => {
        try {
            const {_id} = req.userdata;
            const displayAllDocument = await documentModel.find({
                "userID": _id
            })
            console.log(displayAllDocument);

            res.status(200).json({status: "success",  displayAllDocument})

        } catch (error) {
            console.log(error)
        }
    }

    static view = async(req, res) => {
        try {
            const {id} = req.params
            const viewDocument = await documentModel.findById(id)

            res.status(200).json({status: "success",  viewDocument})

        } catch (error) {
            console.log(error)
        }
    }

    static update = async(req, res) => {
        try {
            const {id} = req.params
            const {name, fname, dob, gender, phone, address} = req.body
           const updateResult = await documentModel.findByIdAndUpdate(id, {
            name: name,
            fname: fname,
            dob: dob,
            gender: gender,
            phone: phone,
            address: address
           });

        //console.log(updateResult);

            res.status(200).json({status: "success", message: "Documents Updated Successfully!", updateResult})

        } catch (error) {
            console.log(error)
        }
    }

    static delete = async(req, res) => {
        try {
            const {id} = req.params
            const deleteDocument = await documentModel.findByIdAndDelete(id)
            // console.log(deleteDocument)
            res.status(200).json({status: "success", message: "Document deleted successfully!",  deleteDocument})

        } catch (error) {
            console.log(error)
        }
    }












}

module.exports = documentController;