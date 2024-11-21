/**
 * USER ROUTES
 * host + /api/auth
 */


const { Router } = require('express');
const { check } = require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fillValidator } = require('../middlewares/fillValidator');
const { jswValidator } = require('../middlewares/jwtValidator');

const router = Router();


router.get('/', (req, res) => {
    res.json({
        ok: true
    })
});


router.post('/new',
    [ // middlewares
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must have 6 chars').isLength({ min: 6 }),
        fillValidator
    ],
    createUser);

router.post('/',
    [
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must have 6 chars').isLength({ min: 6 }),
        fillValidator
    ],
    loginUser);

router.get('/renew',
    jswValidator,
     renewToken);


module.exports = router;