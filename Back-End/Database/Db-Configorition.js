const mongoose = require('mongoose');

const ConnectDB = async  ()=>{
    try {
        const ConnectiomInstanse = await mongoose.connect('mongodb://localhost:27017/Authentecation');
        console.log("Database Was Conncted")
    } catch (error) {
        console.log('Mongo DB was Not Connected.')
    }
}

module.exports = ConnectDB;