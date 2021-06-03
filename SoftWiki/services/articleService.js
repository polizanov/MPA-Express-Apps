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

async function getLeastThree() {
    return Article.find({})
        .sort({ creationDate: -1 })
        .lean()
        .then(obj => obj
            .map(x => Object.assign(x, { description: x.description.split(" ").slice(0, 50).join(" ") + "..." }))
            .slice(0, 3)
        )
}


function getArticleById(id, user = "") {
    return Article.findOne({ _id: id }).lean()
        .then(data => Object.assign(data, {
            isOwner: data.author == user,
            description: data.description.split("\r\n\r\n")
        }))
}

function getArticleForEdit(id) {
    return Article.findOne({ _id: id }).lean();
}

function getAll() {
    return Article.find({}).lean();
}

function editArticle(id, data) {
    if (data.description.trim().length < 20) {
        throw { message: "Description should be at least 20 characters long" };
    }

    return Article.findByIdAndUpdate(id, { description: data.description })
}

function deleteArticle(id){
    return Article.deleteOne({_id: id});
}

function search(data){
    return Article.find({}).lean()
        .then(x => x.filter(x => x.title.toLocaleLowerCase().includes(data.search.toLocaleLowerCase())))
        
}


module.exports = {
    create,
    getLeastThree,
    getArticleById,
    getAll,
    getArticleForEdit,
    editArticle,
    deleteArticle,
    search,
}


