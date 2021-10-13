let axios = require('axios')

exports.getAllMoviesFromRestApi = async () => {
    return axios.get('https://api.tvmaze.com/shows')
}

