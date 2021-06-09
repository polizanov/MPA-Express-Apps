const Hotel = require("../schemes/Hotel");
const User = require("../schemes/User");

async function create(data, userId) {
    if (data.name == "" || data.city == "" || data.freeRooms == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if (data.name < 4) {
        throw { message: "Name should be at least 4 characters" }
    }

    if (data.city < 3) {
        throw { message: "City should be at least 3 characters" }
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

async function getHotelById(id, userId) {
    let data = await Hotel.findOne({ _id: id })
        .lean()
        .map(x => Object.assign(x, { isAuthor: x.ownerId == userId }))

    data.usersBooked.forEach(curUser => {
        if (curUser == userId) {
            data = Object.assign(data, { isBooked: true })
        }
    })

    return data;
}

function deleteHotel(id) {
    return Hotel.deleteOne({ _id: id });
}

function editHotel(data, id) {
    if (data.name == "" || data.city == "" || data.freeRooms == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if (data.name < 4) {
        throw { message: "Name should be at least 4 characters" }
    }

    if (data.city < 3) {
        throw { message: "City should be at least 3 characters" }
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
    }


    return Hotel.updateOne({ _id: id }, dataObj)
}

async function bookHotel(userId, hotelId) {
    [hotelData, userData] = await Promise.all([
        Hotel.findOne({ _id: hotelId }),
        User.findOne({ _id: userId })
    ])

    hotelData.usersBooked.push(userId);
    userData.bookedHotels.push(hotelId);

    if (hotelData.freeRooms <= 0) {
        throw { message: 'Sorry, all rooms are occupied' };
    }

    hotelData.freeRooms--;

    return Promise.all([
        Hotel.updateOne({ _id: hotelId }, hotelData),
        User.updateOne({ _id: userId }, userData)
    ])
}

module.exports = {
    create,
    getAll,
    getHotelById,
    deleteHotel,
    editHotel,
    bookHotel
}