const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/auth')
const {
    showallTasks,
    addnewTask,
    deleteTasks,
    completeTask,
    updateTask,
    editTask,
} = require("../controller/task.controller")

// Show all tasks - protected
router.get('/', isAuthenticated, showallTasks)

// Add a new task - protected
router.post('/', isAuthenticated, addnewTask)

// Delete a task - protected
router.post('/:id/delete', isAuthenticated, deleteTasks)

// Toggle task completion - protected 
router.post('/:id/toggle', isAuthenticated, completeTask)


// Show edit form - protected
router.get('/:id/edit', isAuthenticated, editTask)

// Update task - protected
router.post('/:id/edit', isAuthenticated, updateTask)


module.exports = router