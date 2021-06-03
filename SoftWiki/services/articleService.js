const Article = require("../schemes/Article")

function create(data, user) {
    if (data.title == "" || data.description == "") {
        throw { message: "All fields are requred" }
    }

    if (data.title.length < 5) {
        throw { message: "Title should be at least 5 characters long" }
    }

    if (data.description.length < 20) {
        throw { message: "Description should be at least 20 characters long" }
    }


    const articleObj = new Article({
        title: data.title,
        description: data.description,
        author: user,
        creationDate: new Date()
    });
    return articleObj.save()
}


module.exports = {
    create,
}


