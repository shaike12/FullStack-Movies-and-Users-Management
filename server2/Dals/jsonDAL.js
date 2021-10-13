const jsonFile = require('jsonfile')


exports.readJsonFile = (fileName) => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(__dirname + '/' + fileName, (err, data) => {
            if (err){
                reject(err)
            } 
            resolve(data)
        })
    })
}


exports.writeJsonFile = (fileName, obj) => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(__dirname + '/' + fileName, obj, (err, data) => {
            if (err){
                reject(err)
            } 
            resolve(data)
        })
    })
}