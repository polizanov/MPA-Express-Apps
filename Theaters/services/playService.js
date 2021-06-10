const Play = require('../schemes/Play');

function create(data, userId) {
    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if (data.title < 4) {
        throw { message: "Title should be at least 4 characters" }
    }

    if (data.description < 4) {
        throw { message: "Description should be at least 4 characters" }
    }

    if (!data.imageUrl.startsWith("http") || !data.imageUrl.startsWith("https")) {
        throw { message: "ImageUrl should be starts with http or https" }
    }

    let isPublic = data.isPublic == "on";

    let dataObj = {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        isPublic,
        createdAt: new Date(),
        creator: userId,
    }


    let playObj = new Play(dataObj);
    return playObj.save()
}

function getAll(userId = "") {
    return Play.find({}).lean().sort({ createdAt: -1 })
        .then(x => x.filter(x => {
            if (x.creator == userId) {
                return true;
            } else {
                return x.isPublic == true;
            }
        }))

}

async function getById(id, userId) {
    let data = await Play.findOne({ _id: id })
        .lean()
        .then(x => Object.assign(x, { isOwner: x.creator == userId }));

    data.usersLiked.forEach(e => {
        if (e == userId) {
            data = Object.assign(data, { isLiked: true });
        }
    });

    return data;
}

function edit(id, data) {
    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if (data.title < 4) {
        throw { message: "Title should be at least 4 characters" }
    }

    if (data.description < 4) {
        throw { message: "Description should be at least 4 characters" }
    }

    if (!data.imageUrl.startsWith("http") || !data.imageUrl.startsWith("https")) {
        throw { message: "ImageUrl should be starts with http or https" }
    }

    let isPublic = data.isPublic == "on";

    let dataObj = {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        isPublic,
    }

    return Play.updateOne({ _id: id }, dataObj)
}

function deleteTeather(id) {
    return Play.deleteOne({ _id: id });
}

async function like(playId, userId){
    let data = await Play.findOne({_id: playId});
    data.usersLiked.push(userId);
    return Play.updateOne({_id: playId}, data);
}


module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteTeather,
    like
}