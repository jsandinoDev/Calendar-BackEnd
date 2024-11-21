const { response } = require('express');
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        msg: events,
    })
};

const createEvent = async (req, res = response) => {

    const savedEvent = new Event(req.body)

    try {

        savedEvent.user = req.uid;
        const resp = await savedEvent.save();

        res.json({
            ok: true,
            event: resp
        })

    } catch (error) {

    }
};

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Not wiht that ID'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Dont have privigles for this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: updateEvent
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Please contact admin.. Event'
        })
    }
};


const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Not wiht that ID'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Dont have privigles for this event'
            })
        }

    

        await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Please contact admin.. Event'
        })
    }
};


module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}