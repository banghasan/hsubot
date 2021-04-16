module.exports = (status, message, data = false) => {
    let hasil =  {
        status: status,
        message: message
    }
        
    if (data) hasil.data = data

    return hasil
}