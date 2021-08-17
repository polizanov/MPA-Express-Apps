const Play = require('../schemes/Play');

function create(data, userId) {
    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred", data };
    }

    if (data.title < 4) {
        throw { message: "Title should be at least 4 characters", data };
    }

    if (data.description < 4) {
        throw { message: "Description should be at least 4 characters", data };
    }

    if (!data.imageUrl.startsWith("http") || !data.imageUrl.startsWith("https")) {
        throw { message: "ImageUrl should be starts with http or https", data };
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
    return playObj.save();
}

function getAll(userId = "", isAuthenticated) {
    return Play.find({}).lean().sort({ createdAt: -1 })
        .then(x => x.filter(x => {
            if (x.creator == userId) {
                return true;
            } else {
                return x.isPublic == true;
            }
        }).map(x => Object.assign(x, { isAuthenticated })));

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

async function edit(id, data, user) {
    let play = await Play.findOne({_id: id});

    if(play.creator.toString() !== user) {
        throw { message: "Unothorised!", data };
    }

    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred", data };
    }

    if (data.title < 4) {
        throw { message: "Title should be at least 4 characters", data };
    }

    if (data.description < 4) {
        throw { message: "Description should be at least 4 characters", data };
    }

    if (!data.imageUrl.startsWith("http") || !data.imageUrl.startsWith("https")) {
        throw { message: "ImageUrl should be starts with http or https", data };
    }

    let isPublic = data.isPublic == "on";

    let dataObj = {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        isPublic,
    }

    return Play.updateOne({ _id: id }, dataObj);
}

async function deleteTeather(id, user) {
    let play = await Play.findOne({_id: id});

    if(play.creator.toString() !== user) {
        throw { message: "Unothorised!"};
    }

    return Play.deleteOne({ _id: id });
}

async function like(playId, userId) {
    let data = await Play.findOne({ _id: playId });
    data.usersLiked.push(userId);
    return Play.updateOne({ _id: playId }, data);
}

async function getAllForGuest() {
    let data = await Play.find({}).lean();

    data = data
        .sort((a, b) => b.usersLiked.length - a.usersLiked.length)
        .filter(x => x.isPublic == true)
        .slice(0, 3);

    return data
}

function sortByLikes(userId, isAuthenticated) {
    return Play.find({}).lean().sort({ createdAt: -1 })
        .then(x => x.filter(x => {
            if (x.creator == userId) {
                return true;
            } else {
                return x.isPublic == true;
            }
        }).map(x => Object.assign(x, { isAuthenticated })).sort((a, b) => b.usersLiked.length - a.usersLiked.length));
}

module.exports = {
    create,
    getAll,
    getById,
    edit,
    deleteTeather,
    like,
    getAllForGuest,
    sortByLikes,
}