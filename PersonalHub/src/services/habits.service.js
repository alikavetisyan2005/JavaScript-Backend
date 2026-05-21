const AppError = require("../utils/appError");
const { generateId } = require("../utils/id");
const habitsModel = require("../models/habits.model");


async function getHabits(userId) {
  const userHabits = await habitsModel.getHabitsByUserId(userId);
  return userHabits;
}

async function getHabitById(userId, id) {
  const habit = await habitsModel.getHabitById(id);

  if (!habit) {
    throw new AppError("habit not found", 404);
  }
  if (habit.ownerId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return habit;
}

async function createHabit(userId, data) {
  const newHabit = {
    id: generateId(),
    ownerId: userId,
    name: data.name,
    frequency: data.frequency,
    checkIns: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await habitsModel.createHabit(newHabit);
  return newHabit;
}

async function updateHabit(userId, id, data) {
  const habit = await habitsModel.getHabitById(id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  if (habit.ownerId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const updatedHabit = {
    name: data.name ?? habit.name,
    frequency: data.frequency ?? habit.frequency,
    checkIns: habit.checkIns,
    ownerId: habit.ownerId,
    createdAt: habit.createdAt,
    updatedAt: new Date().toISOString(),
  };

  return await habitsModel.updateHabit(id, updatedHabit);
}

async function deleteHabit(userId, id) {
  const habit = await habitsModel.getHabitById(id);

  if (!habit) {
    throw new AppError("Not found", 404);
  }
  if (habit.ownerId !== userId) {
    throw new AppError("forbidden", 403);
  }

  await habitsModel.deleteHabit(id);
  return habit;
}

async function checkInHabit(userId, id) {
  const habit = await habitsModel.getHabitById(id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  if (habit.ownerId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const updatedHabit = {
    ...habit,
    checkIns: habit.checkIns + 1,
    updatedAt: new Date().toISOString(),
  };

  return await habitsModel.updateHabit(id, updatedHabit);
}

module.exports = {
  getHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit,
};
