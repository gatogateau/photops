const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

const myBooks= new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: String,
        age: Number,
        stories: [{ type: Schema.Types.ObjectId, ref: 'Authors' }]

    });


    const Bookies = mongoose.model("Bookies", myBooks);

    module.exports = Bookies;