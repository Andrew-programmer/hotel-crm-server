const jwt = require('jsonwebtoken');

const getUserIdFromJWT = (auth) =>{
    const token = auth.split(' ')[1];
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    return decodedData.id;
}


module.exports = {
    getUserIdFromJWT
}
