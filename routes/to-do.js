const express = require('express');
const db = require('../Models/conn');
const toDoListModel = require('../Models/toDoListModel');
const router = express.Router();

router.get('/:id?', async(req, res) => {

    if (!!req.params.id) {
        const { id } = req.params;
        const toDoList = await toDoListModel.gettoDoListData(id)
        console.log(toDoList)
        res.render('template', {
            locals: {
                title: 'Task List',
                list: toDoList
            },
            partials: {
                body: 'Partials/to-do'
            }
        })
    } else {
        const taskListData = await toDoListModel.getList();
        res.render('template', {
            locals: {
                title: 'Home',
                data: taskListData

            },
            partials: {
                body: 'Partials/home'
            }

        })
    }
});

module.exports = router;