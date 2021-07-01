const db = require('./conn');

class ToDoListModel {
    constructor(id, topic_name, topic_score) {
        this.id = id;
        this.topic_name = topic_name;
        this.topic_score = topic_score;
    }

    static async getAllTaskData() {
        try {
            const response = await db.any(
                `SELECT * FROM task
                    
                `
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
}

module.exports = ToDoListModel;