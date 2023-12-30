const express = require('express')
const cors = require('cors')
const session = require('express-session');
const connectMongoose = require('./configs/mongoose')
const MongoDBStore = require('connect-mongodb-session')(session);
const socketIO = require('./utils/socket');
const app = express()

//admin
const authnRouter = require('./router/admin/authn');
const movieRouter = require('./router/admin/movies')

//client
const movieRoutes = require('./router/client/movie')
const genreRoutes = require('./router/client/genre')
const mediaRoutes = require('./router/client/media')
const languageRoutes = require('./router/client/language')
const yearRoutes = require('./router/client/year')
const notFoundRoutes = require('./router/client/404')
const authorization = require('./middleware/authorize')
const port = 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000',
        'http://localhost:3001',],
    credentials: true
}));

const store = MongoDBStore({
    uri: 'mongodb+srv://TungPT:BoyPham1204@mongodb.y8qiteb.mongodb.net/movie_website?retryWrites=true&w=majority',
    collection: 'session'
})

app.use(session({
    secret: "keyword",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}))




//admin
app.use("/api/admin", authnRouter);
app.use("/api/admin", movieRouter);

app.use('/', (req, res, next) => {
    next();
})
//client
app.use(authorization)
app.use(mediaRoutes)
app.use(genreRoutes)
app.use(languageRoutes)
app.use(yearRoutes)
app.use(movieRoutes)
app.use(notFoundRoutes)



const runningServer = () => {
    const server = app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`)
    })

    socketIO.initIO(server, {
        cors: {
            origin: '*',
            method: ['POST', 'GET']
        }
    });

    socketIO.getIO().on('connection', (socket) => {
    })
}

connectMongoose(runningServer);