import axios from 'axios'

const apiUrl = 'https://restcountries.com/v3.1'

const getAll = () => {
    const request = axios.get(apiUrl + '/all')
    return request.then(response => response.data)
}

export default {getAll}