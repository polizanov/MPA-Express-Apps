const Accessory = require("../models/schemes/Accessory.js");
const NAME_AND_DESCRIPTION_PATTERN = /^[a-zA-Z0-9 ]+$/

function create(data) {
    if (data.name == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are required!" }
    }

    if(data.name.length < 5){
        throw { message: "Name should be at least 5 characters long!" }
    }

    if (!NAME_AND_DESCRIPTION_PATTERN.test(data.name)) {
        throw { message: "Name should consist only with English letters, digits and whitespaces!" }
    }

    if(data.description.length < 20){
        throw { message: "Description should be at least 20 characters long!" }
    }

    if (!NAME_AND_DESCRIPTION_PATTERN.test(data.description)) {
        throw { message: "Description should consist only with English letters, digits and whitespaces!" }
    }

    if(data.description.length > 100){
        throw { message: "Description cannot be more than 100 characters" }
    }

    if (!data.imageUrl.startsWith('http')) {
        throw { message: "Invalid URL!" }
    }

  
    let accessory = new Accessory(data);
    return accessory.save();
}

async function getAll(id) {
    return Accessory.find({ _id: { $nin: id } }).lean();
}

module.exports = {
    create,
    getAll,
}