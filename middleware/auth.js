const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const decodedToken = jwt.verify(token, "6H5m1e5x9CJyJ0t9hmzkICvmu6NrzscVVjPMRrrdz6k3uKuhTPXpFBDucTAYd2f1H0BAQReWD7kXELbBIQklsUrgH7iewScUqn64");
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw "User Id incorrect"
        }
        else
        {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée'});
    }
}