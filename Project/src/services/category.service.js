const prisma = require("../db");
const AppError = require("../../utils/AppError");

const getCategories = async () => {
  return await prisma.category.findMany();
};

const createCategory = async ({ name, description }) => {
  if (!name) throw new AppError(400, "Some required data missing");

  return await prisma.category.create({
    data: { name, description: description || "" },
    select: { name: true, description: true },
  });
};

const deleteCategory = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError(404, "Category not found");

  return await prisma.category.delete({ where: { id } });
};

module.exports = { getCategories, createCategory, deleteCategory };