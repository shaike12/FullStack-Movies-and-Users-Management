let axios = require('axios')

exports.getAllDocs = (collectionName) => {
    return axios.get('http://localhost:3000/api/' + collectionName)
}


exports.getDocByID = (collectionName, id) => {
    return axios.get('http://localhost:3000/api/' + collectionName + '/' + id)
}

exports.addDoc = (collectionName, doc) => {
    return axios.post('http://localhost:3000/api/' + collectionName, doc)
}
exports.updateDoc = (collectionName, id, doc) => {
    return axios.put('http://localhost:3000/api/' + collectionName + '/' + id, doc)
}
exports.deleteDoc = (collectionName, id) => {
    return axios.delete('http://localhost:3000/api/' + collectionName + '/' + id)
}

