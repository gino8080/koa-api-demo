# Koa.js To-Do API Demo

This is intended as a minimalist demonstration of a ToDo API written with Koa.js and Mongoose/MongoDB. 

To get started, you will need the following...
1. [Node.js `7.x.x` or above.](https://nodejs.org/en/ "Node.js Homepage")
2. [Yarn](https://yarnpkg.com/en/ "Yarn Package Manager") though pure `npm` can work as well.
3. [MongoDB](https://www.mongodb.com/ "MongoDB Homepage")
4. [Nodemon](https://nodemon.io/ "Nodemon Homepage")
5. Optional but greatly helpful - [Postman](https://www.getpostman.com/ "Postman Homepage")

Once you have all of items listed above, simply follow these directions.
1. From the terminal, `git clone` the repository into your directory of choice.
2. `cd` in to the project's home directory and enter `yarn install`.
3. Once the packages have installed, open up the project from your text editor of choice.
4. Open `app.js`.
5. Inside `app.js`, look for `mongoose.connect` on lines 20 and 21.
6. Inside `mongoose.connect`, replace `'/path/to/your/mongo'` with the Mongo database URI of your choice. Save the change.
7. From the terminal, enter `npm start`. The app should (hopefully) fire right up.
8. Open Postman, then import the `koa-demo.postman_collection.json` file.
9. You should be able to interact with the API with ease now.
10. Enjoy!

One last note, I sincerely hope this ToDo API can be of help to anyone trying to gain an understanding of how to build things using Koa. Don't take what I do as **the** way to work. Anything you see is just **a** way to get the job done. That said, I hope this can be of some value to you. If something goes wrong, please feel free to let me know and I'll see what I can do.