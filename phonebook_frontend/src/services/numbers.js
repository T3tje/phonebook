import axios from "axios";

const baseUrl = 'http://localhost:3001/numbers'


const addAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNumber = newPersonObject => {
    const request = axios.post(baseUrl,newPersonObject)
    return request.then(response => response.data)
}

const delNumber = personId => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const updateNumber = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default {
    addAll, addNumber, delNumber, updateNumber
}