const habitsService = require("../services/habits.service");


async function getHabits(req, res, next) {
    try {
        const result = await habitsService.getHabits(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function getHabitById(req, res, next) {
    try {
        const result = await habitsService.getHabitById(req.user.id, req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function createHabit(req, res, next) {
    try {
        const result = await habitsService.createHabit(req.user.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

async function updateHabit(req, res, next) {
    try {
        const result = await habitsService.updateHabit(req.user.id, req.params.id, req.body);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


async function deleteHabit(req, res, next) {
    try{
        const result = await habitsService.deleteHabit(req.user.id,req.params.id);
        res.status(200).json(result)
    }
    catch(error){
        next(error)
    }
}


async function checkInHabit(req, res, next) {
    try {
        const result = await habitsService.checkInHabit(req.user.id, req.params.id);
        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getHabits,
    getHabitById,
    createHabit,
    updateHabbit,
    deleteHabbit,
    checkInHabit
}