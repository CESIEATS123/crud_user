import db from '../database';
import Role from '../types/role.types'
import config from '../config'


class RoleModel {
    // create 
    async create(u:Role): Promise<Role> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO roles (role)
            values ($1) returning id, role`;
            // run query
            const result = await connection.query(sql, [
                u.role,
            ]);
            // release connection
            connection.release();
            // return created role
            return result.rows[0];
        } catch(error) {
            throw new Error(
                `Unable to create (${u.role}): ${(error as Error).message} `
            );
        }
    }
    // get all roles
    async getMany(): Promise<Role[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT id, role from roles`;
            // run query
            const result = await connection.query(sql);
            // release connection
            connection.release();
            // return created role
            return result.rows;
        } catch(error) {
            throw new Error(
                `Unable at retrieving roles ${(error as Error).message} `
            );
        }
    }
    // get specific role
    async getOne(id: string): Promise<Role> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT id, role from roles
            WHERE id=($1)`;
            // run query
            const result = await connection.query(sql, [id]);
            // release connection
            connection.release();
            // return created role
            return result.rows[0];
        } catch(error) {
            throw new Error(
                `could not find role ${id}, ${(error as Error).message} `
            );
        }
    }
    // update role
    async UpdateOne(u:Role): Promise<Role> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE roles
                        SET role=$1
                        WHERE id=$2
                        RETURNING id,role`;
            // run query
            const result = await connection.query(sql, [
                u.role,
                u.id,
            ]);
            // release connection
            connection.release();
            // return created role
            return result.rows[0];
        } catch(error) {
            throw new Error(
                `could not update (${u.role}), ${(error as Error).message} `
            );
        }
    }

    async deleteOne(id: string): Promise<Role> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM roles
                        WHERE id=($1)
                        RETURNING id, role`;
            
            const result = await connection.query(sql, [id]);
            // release connection
            connection.release();
            // return created role
            return result.rows[0];
        } catch(error){
            throw new Error(
                `could not delete (${id}), ${(error as Error).message} `
            );
        }
    }
}

export default RoleModel;