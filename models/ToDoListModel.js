const db = require('./conn');

class ToDoListModel {
    constructor(id, task, user_tasks, status) {
        this.id = id;
        this.task = task;
        this.user_tasks = user_tasks;
        this.status = status;
    }

    static async getoDoListData() {
        try {
            const response = await db.any('SELECT * FROM toDoList;');
            return response
        } catch (err) {
            console.log(`ERROR: ${err}`);
            return err;
        }

    }


    static async getUserList(id) {
        const response = await db.one(
            `SELECT * FROM users WHERE id = ${id};`
        );
        console.log('RESPONSE FROM GET BY ID: ', response);
        return response;
    }
}

module.exports = ToDoListModel;