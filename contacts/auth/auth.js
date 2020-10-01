const firebase = require("../models/firebase");

exports.authorizeUser = ( req,res, next ) => {

    
    let cookies = req.headers.cookie || '';
    
    let sessionCookie = cookies.match(/session=(.*?)($|;)/);

    if( !sessionCookie || !sessionCookie[1]){
        res.status(401).send("Unauthorized Access");
        return;
    }
    
    firebase.verifyUser(sessionCookie[1])
    .then(() => {
      next();
    })
    .catch(error => {
      res.status(401).send("Unauthorized Access");
    });
      
}