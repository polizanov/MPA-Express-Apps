let data = require("../db.json");

module.exports = (obj) => {
    let finded = [];

    finded = data
        .filter(x => x.name.toLocaleLowerCase().includes(obj.search.toLocaleLowerCase()))
        .filter(x => {
            if(obj.from == ""){
                obj.from = 0;
            }

            if(obj.to == ""){
                obj.to = 6;
            }

            return Number(x.difficultyLevel) >= Number(obj.from) && Number(x.difficultyLevel) <= Number(obj.to);
        })

        if(finded.length == 0){
            return data;
        }

        return finded;
}