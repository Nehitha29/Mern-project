var jwt = require('jsonwebtoken');

const JWT_SECRET = 'thisisforblog';

const fetchuser = (req,res, next) => {

    const token = req.header("authtoken");

    if(!token){
        res.status(401).send({error : "Please do a valid authentication"})
    }
  else{
    try {
        
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user ;

    } catch (error) {
        res.status(401).send({error : "Please do a valid authentication"})
    }
}
next();
}

module.exports = fetchuser;
