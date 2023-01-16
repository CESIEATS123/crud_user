import dotenv from 'dotenv'

dotenv.config();

//console.log(process.env);
const { PORT } = process.env;

const {
    NODE_ENV,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    CREATOR,
    BCRIPT_PASSWORD,
    SALT_ROUNDS,
    TOKEN_SECRET,
} = process.env;

export default {
    port: PORT,
    creator: CREATOR,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRIPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};