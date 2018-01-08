/*
	Include modules
*/
const koa = require("koa");
const mongoose = require("mongoose");
const convert = require("koa-convert");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const error = require("koa-json-error");
const logger = require("koa-logger");
const koaRes = require("koa-res");
const handleError = require("koa-handle-error");
const task = require("./controller/task");
const app = new koa();

/*
	Mongoose Config	
*/
mongoose.Promise = require("bluebird");
mongoose
  .connect("mongodb://localhost:27017/data/db")
  .then(response => {
    console.log("mongo connection created");
  })
  .catch(err => {
    console.log("Error connecting to Mongo");
    console.log(err);
  });

/*
	Server Config
*/
// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// logging
app.use(logger());
// body parsing
app.use(bodyParser());
// format response as JSON
app.use(convert(koaRes()));

//json token
const jwt = require("./jwt");

// configure router
//public ROUTES
const router = new Router();
router.all("/saysomething", async ctx => {
  let name = ctx.request.body.name || "World";
  ctx.body = { message: `Hello ${name}!` };
});
router.get("/throwerror", async ctx => {
  throw new Error("Aghh! An error!");
});

//get token
router.post("/auth", async ctx => {
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;

  if (username === "user" && password === "pwd") {
    ctx.body = {
      token: jwt.issue({
        user: "user",
        role: "admin"
      })
    };
  } else {
    ctx.status = 401;
    ctx.body = { error: "Invalid login" };
  }
});

//SECURED ROUTES
const securedRouter = new Router();
// Apply JWT middleware to secured router only
securedRouter.use(jwt.errorHandler()).use(jwt.jwt());

securedRouter.get("/tasks", task.getTasks);
securedRouter.post("/task", task.createTask);
securedRouter.put("/task", task.updateTask);
securedRouter.delete("/task", task.deleteTask);
securedRouter.post("/task/multi", task.createConcurrentTasks);
securedRouter.delete("/task/multi", task.deleteConcurrentTasks);

app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

app.listen(3000);
