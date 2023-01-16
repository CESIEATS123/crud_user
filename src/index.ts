import express, { Application, Request, Response} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import routes from './routes'
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database/index';
import cors from 'cors'

//console.log(config);

const PORT = config.port || 3001;
// console.log("TEST port");
// console.log(PORT);
// create instance server
const app: Application = express();
// Gestion des variables d'environnement
//const dotenv = require('dotenv')
// middleware to parse incomming requests
app.use(express.json());
// HTTP request logger middleware
app.use(morgan('common'));
// HTTP security middleware
app.use(helmet())
// Autoriser l'acces depuis react
app.use(cors());

//dotenv.config()

//console.log(process.env)


// Limit the number of requests
app.use(
    RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: 'Vous avez envoyé trop de requêtes !'
    })
);

// api CESIEATS User et Role
app.use('/api', routes);
// add routing for / path
app.get('/', (req: Request, res: Response) =>{
    //throw new Error('Error exist');
    res.json({
        message: 'Hello world !',
    });
});

// request post
app.post('/', (req: Request, res: Response) =>{
    //throw new Error('Error exist');
    console.log(req.body);
    res.json({
        message: 'Hello world from  post!',
        data: req.body,
    });
});

// test db
db.connect().then((client) => {
    return client.query('SELECT NOW()').then((res) =>{
        client.release();
        console.log(res.rows);
    }).catch(err => {
        client.release();
        console.log(err.stack);
    });
});
// app.post('/db', (req: Request, res: Response) =>{
//     //throw new Error('Error exist');
//     console.log(req.body);
//     res.json({
//         message: 'Hello world from  post!',
//         data: req.body,
//     });
// });

//
app.use(errorMiddleware);
// Gestions des erreurs
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Vérifier votre url',
    });
});

// start express server
app.listen(PORT, () => {
    console.log(`Server is running at port:${PORT}`);
});  

export default app;