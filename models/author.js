const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

const authorsList= new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'Bookies' },
        title: String,
        fans: [{ type: Schema.Types.ObjectId, ref: 'Bookies' }] 
        
    });


    const Authors = mongoose.model("Authors", authorsList);

    module.exports = Authors;