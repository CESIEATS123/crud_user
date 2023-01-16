import bcrypt from 'bcrypt';
import db from '../database';
import User from '../types/user.types'
import config from '../config'
import jwt from 'jsonwebtoken';

const hashPassword = (password: string) => {
    const salt = parseInt(config.salt as string, 10);
    return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
    // create 
    async create(u:User): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password, role, jeton)
            values ($1, $2, $3, $4, $5, $6, $7) returning id, email, user_name, first_name, last_name, role`;
            // run query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                hashPassword(u.password),
                u.role,
                u.jeton,
            ]);
            // release connection
            connection.release();
            // return created user
            return result.rows[0];
        } catch(error) {
            throw new Error(
                `Unable to create (${u.user_name}): ${(error as Error).message} `
            );
        }
    }

    // generateAuthTokenAndSaveUSer
    async generateAuthTokenAndSaveUSer(u:User): Promise<string> {
        try {
            const authToken = jwt.sign({ u }, config.tokenSecret as unknown as string);
            const connection = await db.connect();
            const sql = `UPDATE users
                        SET jeton=$1
                        WHERE id=$2
                        RETURNING id, email, user_name, first_name, last_name, jeton, role`; 
        // run query
            const result = await connection.query(sql, [
                authToken,
                u.id,
            ]);
            // release connection
            connection.release();
            // return created user
            return authToken;
    } catch(error) {
        throw new Error(
            `could not generate token (${u.user_name}), ${(error as Error).message} `
        );
    }
    }
    // get all users
    async getMany(): Promise<User[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name, role from users`;
            // run query
            const result = await connection.query(sql);
            // release connection
            connection.release();
            // return created user
            return result.rows;
        } catch(error) {
            throw new Error(
                `Unable at retrieving users ${(error as Error).message} `
            );
        }
    }
    // get specific user
    async getOne(id: string): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name, role from users
            WHERE id=($1)`;
            // run query
            const result = await connection.query(sql, [id]);
            // release connection
            connection.release();
            // return created user
            return result.rows[0];
        } catch(error) {
            throw new Error(
                `could not find user ${id}, ${(error as Error).message} `
            );
        }
    }
    // update user
    async UpdateOne(u:User): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE users
                        SET email=$1, user_name=$2, first_name=$3,
                        last_name=$4, password=$5, role=$6, jeton=$7
                        WHERE id=$8
                        RETURNING id, email, user_name, first_name, last_name, role`;
            // run query
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name, 
                hashPassword(u.password),
                u.role,
                u.jeton,
                u.id,
            ]);
            // release connection
            connection.release();
            // return created user
            return result.rows[0];
        } catch(error) {
            throw new Error(
                `could not update (${u.user_name}), ${(error as Error).message} `
            );
        }
    }

    async deleteOne(id: string): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM users
                        WHERE id=($1)
                        RETURNING id, email, user_name, first_name, last_name, role`;
            
            const result = await connection.query(sql, [id]);
            // release connection
            connection.release();
            // return created user
            return result.rows[0];
        } catch(error){
            throw new Error(
                `could not delete (${id}), ${(error as Error).message} `
            );
        }
    }

    // authenticate user
    async authenticate(email: string, password: string): Promise<User | null> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT password FROM users WHERE email=$1';
            const result = await connection.query(sql, [email]);
            if (result.rows.length){
                const {password: hashPassword} = result.rows[0];
                const isPasswordValid = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashPassword
                );
                if (isPasswordValid) {
                    const userInfo = await connection.query(
                        'SELECT id, email, user_name, first_name, last_name from users WHERE email=($1)',
                        [email]
                    );
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (error){
            throw new Error(`Unable to logoin: ${(error as Error).message}`);
        }
    }
}

export default UserModel;