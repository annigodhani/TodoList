const Task = require('../model/Task')

exports.showallTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id })
        res.render('task', { tasks })
    }
    catch (err) {
        res.status(500).send('Server Error')
    }
}

exports.addnewTask = async (req, res) => {
    const { description } = req.body
    try {
        const newTask = new Task({
            description,
            user: req.user.id
        })
        await newTask.save()
        req.flash('success', 'Todo Added Successfully!')
        res.redirect('/tasks')
    }
    catch (err) {
        req.flash('error', 'Failed To Add Todolist')
        res.redirect('/tasks')
    }
}

exports.deleteTasks = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        req.flash('success', 'TOdo Deleted Successfully!')
        res.redirect('/tasks')
    }
    catch (err) {
        req.flash('error', 'Failed To Delete Todolist')
        res.redirect('/tasks')
    }
}

exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        task.completed = !task.completed
        await task.save()
        req.flash('success', 'TodU updated Successfully!')
        res.redirect('/tasks')
    }
    catch (err) {
        req.flash('error', 'Failed To Update Todolist')
        res.redirect('/tasks')
    }
}


exports.editTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.render('edit-task', { task })
    }
    catch (err) {
        req.flash('error', 'Failed To Load Task For Editing')
        res.redirect('/tasks')
    }
}

exports.updateTask = async (req, res) => {
    const { description } = req.body
    try {
        await Task.findByIdAndUpdate(req.params.id, { description })
        req.flash('success', 'Todo Updated Successfully!')
        res.redirect('/tasks')
    }
    catch (err) {
        req.flash('error', 'Failed To Update Todolist')
        res.redirect('/tasks')
    }
}

// exports.getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ user: req.user._id }); // Retrieve tasks associated with the logged-in user
//         res.render('tasks', { user: req.user, tasks }); // Render the tasks page with user and task data
//     } catch (err) {
//         res.status(500).send('Server Error');
//     }
// };
