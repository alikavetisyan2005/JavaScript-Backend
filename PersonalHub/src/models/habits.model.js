const path = require("node:path");
const fileDB = require("../utils/fileDB");
const AppError = require("../utils/AppError");

const filePath = path.join(__dirname, "../../data/habits.json");


const getAllHabits = async() => {
    const habits = await fileDB.readJson(filePath);
    return habits;
}

const getHabitsByUserId = async(userId) => {
    const habits = await fileDB.readJson(filePath);

    const userHabits = habits.filter(habit => habit.ownerId === userId);

    return userHabits
}

const getHabitById = async(id) => {
    const habits = await fileDB.readJson(filePath);

    return habits.find(habit => habit.id === id);
}

const createHabit = async(habitData) => {
    const habits = await fileDB.readJson(filePath);

    habits.push(habitData);

    await fileDB.writeJson(filePath, habits);

    return habitData;

}

const updateHabit = async(id, updatedData) => {
    const habits = await fileDB.readJson(filePath);

    const index =
        habits.findIndex(habit => habit.id === id);

    if(index === -1) return null;

    habits[index] = {
        ...habits[index],
        ...updatedData
    };

    await fileDB.writeJson(filePath, habits);

    return habits[index];
}

const deleteHabit = async(id) => {

    const habits = await fileDB.readJson(filePath);

    const filtered =
        habits.filter(habit => habit.id !== id);

    await fileDB.writeJson(filePath, filtered);

    return id;
}


module.exports = {
    getAllHabits,
    getHabitById,
    getHabitsByUserId,
    createHabit,
    updateHabit,
    deleteHabit
}