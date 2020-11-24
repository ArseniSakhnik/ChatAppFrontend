import axios from 'axios'

export default class UserService {

    _apiBase = 'https://localhost:44353'

    isAuthorized = false;

    constructor() {

        const delay = 3600000;
        const timeRefreshToken = () => {
            console.log('user service: token updated')
            axios.post(this._apiBase + '/users/refresh-token', {}, {
                withCredentials: true
            }).then(tokenRefreshResponse => {
                localStorage.setItem('jwtToken', tokenRefreshResponse.data.jwtToken)
                this.isAuthorized = true;
            }).catch(err => {
                console.log('user service: ', err.message)
                if (err.status == 401) {
                    this.isAuthorized = false
                }
            })
            setTimeout(function () {
                timeRefreshToken()
            }, delay)
        }

        timeRefreshToken()

    }

    authentication = (username, password) => {
        return axios.post(this._apiBase + '/users/authenticate', {
                username,
                password
            },
            {
                withCredentials: true
            }).then(response => {
            console.log('user service: authentication ', response)
            localStorage.setItem('jwtToken', response.data.jwtToken)
            const user = {
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.username
            }
            localStorage.setItem('username', JSON.stringify(user))
        })
    }

    registration = (username, password) => {
        return axios.post(this._apiBase + '/users/registration', {
            username,
            password
        }, {
            withCredentials: true
        }).then(response => {
            console.log('user service: registration ', response)
        })
    }

    userExists = (username) => {
        return axios.post(this._apiBase + '/users/get', {
            username
        }, {
            withCredentials: true
        })
    }
}