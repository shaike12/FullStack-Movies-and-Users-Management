let axios = require('axios')

exports.getAllMembersFromRestApi = async () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
}

