const Hotel = require("../schemes/Hotel");

async function create(data, userId) {
    if (data.name == "" || data.city == "" || data.freeRooms == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if (data.title < 4) {
        throw { message: "Title should be at least 4 characters" }
    }

    if (data.name < 4) {
        throw { message: "Description should be at least 20 characters" }
    }

    if (!data.imageUrl.startsWith("http") || !data.imageUrl.startsWith("https")) {
        throw { message: "ImageUrl should be starts with http or https" }
    }

    if (Number(data.freeRooms) < 1 || Number(data.freeRooms) > 100) {
        throw { message: "Free rooms should be between 1 and 100" };
    }

    let dataObj = {
        name: data.name,
        city: data.city,
        imageUrl: data.imageUrl,
        freeRooms: data.freeRooms,
        ownerId: userId,
    }


    let hotelObj = new Hotel(dataObj);
    return hotelObj.save()
}

function getAll() {
    return Hotel.find({}).lean();
}

function getHotelById(id, userId) {
    return Hotel.findOne({ _id: id })
        .lean()
        .map(x => Object.assign(x, { isAuthor: x.ownerId == userId }))
}

module.exports = {
    create,
    getAll,
    getHotelById
}