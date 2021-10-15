import { combineReducers } from 'redux'

import movies from './moviesReducer'
import members from './membersReducer'
// import users from './usersReducer'
// import auth from './authReducer'


export default combineReducers({
    movies,
    members,
    // users,
    // auth
})