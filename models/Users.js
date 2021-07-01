const db = require('./conn');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    static async addUser(name, email, password) {
        try {
            // This is a prepared statement
            // It will perform some basic sanitization for our inputs, removing any SQL injection risk
            const query = `INSERT INTO users 
                (name, email, password) VALUES ('${name}', '${email}', '${password}') RETURNING id;`
            const response = await db.one(query);
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    async login() {
        try {
            // Lookup the user by their email address
            const query = `SELECT * FROM users WHERE email = '${this.email}';`;
            const response = await db.one(query);
            // Check the user's password based on the hash
            console.log('login response object:', response);
            const isValid = this.checkPassword(response.password);
            // return a response to the controller, either valid or not
            if (!!isValid) {
                const { id, name, email } = response;
                return { isValid, user_id: id, name, email }
            } else {
                return { isValid }
            }
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = User;