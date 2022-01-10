import axios from "axios";

const baseUrl = '/api/persons'


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

const exportedObject = {
    addAll, addNumber, delNumber, updateNumber
}
export default exportedObject