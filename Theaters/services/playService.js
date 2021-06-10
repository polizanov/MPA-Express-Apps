const Play = require('../schemes/Play');

function create(data, userId) {
    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if(data.title < 4){
        throw { message: "Title should be at least 4 characters" }
    }

    if(data.description < 4){
        throw { message: "Description should be at least 4 characters" }
    }

    if(!data.imageUrl.startsWith("http") || !data.imageUrl.startsWith("https")){
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

module.exports = {
    create,
}