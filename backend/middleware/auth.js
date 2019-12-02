const config = require('config');
const jwt = require('jsonwebtoken');

function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.get('jwtSectet'), (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }
            resolve(decodedToken)
        })
    })
}

function auth(req,res,next) {
    console.log(req.cokies);
    if (!req.cookies || !req.cookies['todofy.sid']) {
        return res.status(401).json({ msg: 'Authorization denied' });
    }
    console.log(req.cookies);
    let token = (req.cookies && req.cookies.Authorization) || req.headers['cookiesauth']
    //token = token.replace('Bearer ', '')
    verifyJWTToken(token).then((decodedToken) => {
        const tokenTimeLeft = moment(decodedToken.exp * 1000).diff(moment())
        const timeInMinutes = tokenTimeLeft / 1000 / 60

        req.user = decodedToken
        if (timeInMinutes > 30) {
            return next()
        }

        User.findOne({_id: decodedToken.id}).then(function (doc) {
            if (!doc) {
                return
            }
            const payload = {
                id: doc._id,
                email: doc.email,
                name: doc.role,
                role: doc.role
            }
            jwt.sign(payload, config.get('jwtSectet'), { expiresIn: '2h' }), (err, token) => {
                if (err) { return next(err) }
                //res.cookie('Authorization', `Bearer ${token}`)
                res.cookie('todofy.sid', token, { path: '/', expires: new Date(Date.now() + 2 * 60 * 1000), httpOnly: true });
                //res.cookie('todofy.sid', token);
                next()
            }
        })
    })
}

/* function auth(req, res, next) {
    console.log(req)
    const token = req.headers('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
} */

module.exports = auth;