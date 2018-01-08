const Task = require("../model/Task");

exports.getTasks = async ctx => {
  const tasks = await Task.find({});
  if (!tasks) {
    throw new Error("There was an error retrieving your tasks.");
  } else {
    ctx.body = tasks;
  }
};

exports.createTask = async ctx => {
  const result = await Task.create({
    name: ctx.request.body.name,
    urgency: ctx.request.body.urgency
  });
  if (!result) {
    throw new Error("Task failed to create.");
  } else {
    ctx.body = { message: "Task created!", data: result };
  }
};

exports.updateTask = async ctx => {
  const searchByName = { name: ctx.request.body.name };
  const update = {
    name: ctx.request.body.newName,
    urgency: ctx.request.body.newUrgency
  };
  const result = await Task.findOneAndUpdate(searchByName, update);
  if (!result) {
    throw new Error("Task failed to update.");
  } else {
    console.log(result);
    ctx.body = { message: "Task updated!", data: result };
  }
};

exports.deleteTask = async ctx => {
  const result = await Task.findOneAndRemove({ name: ctx.request.body.name });
  if (!result) {
    throw new Error("Task failed to delete.");
  } else {
    ctx.status = 200;
    ctx.body = { message: "success!" };
  }
};

exports.createConcurrentTasks = async ctx => {
  const taskOne = Task.create({
    name: ctx.request.body.nameTaskOne,
    urgency: ctx.request.body.urgencyTaskOne
  });
  const taskTwo = Task.create({
    name: ctx.request.body.nameTaskTwo,
    urgency: ctx.request.body.urgencyTaskTwo
  });
  const [t1, t2] = await Promise.all([taskOne, taskTwo]);
  if (!t1 || !t2) {
    throw new Error("Tasks failed to be created.");
  } else {
    ctx.body = { message: "Tasks created!", taskOne: t1, taskTwo: t2 };
  }
};

exports.deleteConcurrentTasks = async ctx => {
  const taskOne = Task.findOneAndRemove({ name: ctx.request.body.nameTaskOne });
  const taskTwo = Task.findOneAndRemove({ name: ctx.request.body.nameTaskTwo });
  const [t1, t2] = await Promise.all([taskOne, taskTwo]);
  if (!t1 || !t2) {
    throw new Error("Tasks failed to delete.");
  } else {
    ctx.body = { message: "Tasks deleted successfully!" };
  }
};
