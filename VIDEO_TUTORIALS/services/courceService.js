const Cource = require("../schemes/Cource");

function create(data, userId) {
    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if(data.title < 4){
        throw { message: "Title should be at least 4 characters" }
    }

    if(data.description < 4){
        throw { message: "Description should be at least 20 characters" }
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
        ownerId: userId,
    }


    let courceObj = new Cource(dataObj);
    return courceObj.save()
}

async function update(data, id){
    if (data.title == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are requred" }
    }

    if(data.title < 4){
        throw { message: "Title should be at least 4 characters" }
    }

    if(data.description < 4){
        throw { message: "Description should be at least 20 characters" }
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
    }

    return Cource.updateOne({_id: id}, dataObj);
}

async function getAllCourcesForUsers(userId) {
    return Cource.find({}).sort({ createdAt: -1 }).lean()
        .then(x => x.filter((e) => {
            if (e.ownerId == userId) {
                return true;
            } else {
                return e.isPublic == true
            }
        }));
}

async function searchCource(userId, value){
    return Cource.find({}).sort({ createdAt: -1 }).lean()
        .then(x => x.filter((e) => {
            if (e.ownerId == userId) {
                return true;
            } else {
                return e.isPublic == true
            }
        })
        .filter((x) => x.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())));
}

async function getTopThree(){
    return Cource.find({}).sort({ createdAt: -1 }).lean()
        .then(x => x.filter((e) => e.isPublic == true))
}

async function getOneById(id, userId) {
    let data = await Cource.findOne({ _id: id }).lean();
    data.isOwner = data.ownerId == userId;

    data.usersEnroled.forEach(user => {
        if (user == userId) {
            data = Object.assign({ isEnroll: true }, data)
        }
    });

    return data
}

async function enrollUser(courceId, userId){
    let data = await Cource.findOne({ _id: courceId });
    data.usersEnroled.push(userId);
    return Cource.replaceOne({ _id: courceId }, data);
}

function deleteCource(id) {
    return Cource.deleteOne({_id: id});
}

module.exports = {
    create,
    getAllCourcesForUsers,
    getOneById,
    enrollUser,
    deleteCource,
    update,
    getTopThree, 
    searchCource
}