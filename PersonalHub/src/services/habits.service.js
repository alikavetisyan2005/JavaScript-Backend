const AppError = require("../utils/appError");
const fileDb = require("../utils/fileDB");
const {genereteID} =  require("../utils/id");
const path = require("node:path")

const filePath = path.join(__dirname, "../../data/habits.json");


async function getHabits(userId) {
    const habits = await fileDb.readJson(filePath);

    const userHabits = habits.filter(h => h.ownerId === userId);

    return userHabits;
}


async function getHabitById(userId, id) {
    const habits = await fileDb.readJson(filePath);

    const habit = habits.find(h => h.id === id);

    if(!habit) {
        throw new AppError("habit not found", 404);
    }
    if(habit.ownerId !== userId){
        throw new AppError("Not authorized", 401);
    }

    return habit;
}

async function createHabit(userId, data) {
    const habits = await fileDb.readJson(filePath);

    const newHabit = {
        id: genereteID(),
        ownerId: userId,
        name: data.name,
        frequency: data.frequency,
        checkIns: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    habits.push(newHabit);

    await fileDb.writeJson(filePath, habits);
    return newHabit
}


async function updateHabit(userId, id, data) {
    const habits = await fileDb.readJson(filePath);

    const index = habits.findIndex(h => h.id === id);

    if(index === -1){
        throw new AppError("Not found", 404)
    }
    const habit = habits[index];

    if(habit.ownerId !== userId){
        throw new AppError("Not authorized", 401);
    }

    habits[index] = {
        ...habit,
        name: data.name ?? habit.name,
        frequency: data.frequency ?? habit.frequency,
        updatedAt: new Date().toISOString()
    }


    await fileDb.writeJson(filePath, habits);

    return habits[index]

}

async function deleteHabit(userId, id) {
    const habits = await fileDb.readJson(filePath);


    const habit = habits.find(h => h.id === id);

    if(!habit){
        throw new AppError("Not found");
    }
    if(habit.ownerId !== userId){
        throw new AppError("Not authorized")
    }

    const filtered = habits.filter(h => h.id !== id);

    await fileDb.writeJson(filePath, filtered);

    return habit;
}


async function checkInHabit(userId, id) {
    const habits = await fileDb.readJson(filePath);

    const index = habits.findIndex(h => h.id === id);

    if (index === -1) {
        throw new AppError("Habit not found", 404);
    }

    const habit = habits[index];

    if (habit.ownerId !== userId) {
        throw new AppError("Not authorized", 403);
    }

    habits[index] = {
        ...habit,
        checkIns: habit.checkIns + 1,
        updatedAt: new Date().toISOString()
    };

    await fileDb.writeJson(filePath, habits);

    return habits[index];
}



module.exports = {
    getHabits,
    getHabitById,
    createHabit,
    updateHabit,
    deleteHabit,
    checkInHabit
}
