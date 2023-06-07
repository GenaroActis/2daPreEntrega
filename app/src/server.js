import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/productsRouter.js'
import cartsRouter from './routes/cartRouter.js'
import Path from './path.js'
import bodyParser from 'body-parser'
import './db/db.js'
import handlebars from 'express-handlebars'
import { errorHandler } from "./middlewares/errorHandler.js";
import { Server } from 'socket.io';

const app = express();
const port = 8080;
const path = Path

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(path + '/public'))
app.engine('handlebars', handlebars.engine({
        defaultLayout: "main",
        runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        },
    }));
app.set('view engine', 'handlebars')
app.set('views', path + '/views')

app.use(errorHandler)
app.use('/products', productsRouter)
app.use('/carts',  cartsRouter)

const httpServer = app.listen(port, ()=>{
console.log('server ok en port', port)
});

const socketServer = new Server(httpServer);
let userCartId = null;

socketServer.on('connection', (socket) =>{
    if (userCartId === null) {
        socket.emit('loggedUser');
        console.log("olauser")
        socket.on('userCartId', (userCartIdResult)=>{
            userCartId = userCartIdResult;
        });
    }else{
        socket.emit('userCartAlreadyCreated', userCartId);
    }
});

