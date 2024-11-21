/**
 * USER ROUTES
 * host + /api/events
 */


const { Router } = require('express');
const { check } = require('express-validator')
const { jswValidator } = require('../middlewares/jwtValidator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { fillValidator } = require('../middlewares/fillValidator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(jswValidator );

// Get Events
router.get('/',
   
    getEvents);

// Create new event
router.post('/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start Date is mandatory').custom(isDate),
        check('end', 'End Date is mandatory').custom(isDate),
        fillValidator
    ],
    createEvent);

// Update event
router.put('/:id',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start Date is mandatory').custom(isDate),
        check('end', 'End Date is mandatory').custom(isDate),
        fillValidator
    ],
    updateEvent);

// Update event
router.delete('/:id',
    deleteEvent);

module.exports = router;