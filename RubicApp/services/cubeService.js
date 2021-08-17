const Cube = require("../models/schemes/Cube.js");
const NAME_AND_DESCRIPTION_PATTERN = /^[a-zA-Z0-9 ]+$/;

async function create(data, userId) {
    if (data.name == "" || data.description == "" || data.imageUrl == "") {
        throw { message: "All fields are required!", data };
    }

    if (data.name.length < 5) {
        throw { message: "Name should be at least 5 characters long!", data };
    }

    if (!NAME_AND_DESCRIPTION_PATTERN.test(data.name)) {
        throw { message: "Name should consist only with English letters, digits and whitespaces!", data };
    }

    if (data.description.length < 20) {
        throw { message: "Description should be at least 20 characters long!", data };
    }

    if (!NAME_AND_DESCRIPTION_PATTERN.test(data.description)) {
        throw { message: "Description should consist only with English letters, digits and whitespaces!", data };
    }

    if (data.description.length > 100) {
        throw { message: "Description cannot be more than 100 characters", data };
    }

    if (!data.imageUrl.startsWith('http')) {
        throw { message: "Invalid URL!", data };
    }

    let cube = new Cube({ ...data, userId: userId });
    return cube.save();
}

async function getAll(query) {
    let cubes = await Cube.find({}).lean();

    if (query.search) {
        cubes = cubes.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        cubes = cubes.filter(x => Number(x.difficultyLevel) >= Number(query.from));
    }

    if (query.to) {
        cubes = cubes.filter(x => Number(x.difficultyLevel) <= Number(query.to));
    }

    return cubes;
}

async function findOne(id) {   
    return Cube.findById(id).lean();
}

async function findOneWithAccesssories(id) {
    return Cube.findById(id).populate('accessories').lean();
}

async function attachAccessory(cubeId, accessoryId) {
    let cube = await Cube.findById(cubeId);
    cube.accessories.push(accessoryId);
    return cube.save();
}

async function editCube(cubeId, data, user) {
    let cube = await Cube.findOne({_id: cubeId});

    if(cube.userId !== user){
        throw {
            message: "Unothorized!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (data.name == "" || data.description == "" || data.imageUrl == "") {
        throw {
            message: "All fields are required!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (data.name.length < 5) {
        throw {
            message: "Name should be at least 5 characters long!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (!NAME_AND_DESCRIPTION_PATTERN.test(data.name)) {
        throw {
            message: "Name should consist only with English letters, digits and whitespaces!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (data.description.length < 20) {
        throw {
            message: "Description should be at least 20 characters long!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (!NAME_AND_DESCRIPTION_PATTERN.test(data.description)) {
        throw {
            message: "Description should consist only with English letters, digits and whitespaces!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (data.description.length > 100) {
        throw {
            message: "Description cannot be more than 100 characters",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    if (!data.imageUrl.startsWith('http')) {
        throw {
            message: "Invalid URL!",
            data: Object.assign(data, { _id: cubeId })
        };
    }

    return await Cube.updateOne({ _id: cubeId }, data);
}

async function deleteCube(cubeId, user) {
    let cube = await Cube.findOne({_id: cubeId});

    if(cube.userId !== user){
        throw {
            message: "Unothorized!",
        };
    }

    return Cube.deleteOne({ _id: cubeId });
}

module.exports = {
    create,
    getAll,
    findOne,
    attachAccessory,
    findOneWithAccesssories,
    editCube,
    deleteCube
}