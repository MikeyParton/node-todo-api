const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  	return TodoItem
  		.findById(req.params.todoItemId)
  		.then(todoItem => {
  			if(!todoItem) {
  				return
	  				res.status(404).send({
	  					message: 'Todo item not found'
	  				})
  			}
  			return todoItem
  				.update(req.body, { fields: Object.keys(req.body) })
  				.then(updatedTodoItem => res.status(200).send(updatedTodoItem))
  				.catch(error => res.status(400).send(error))
  		})
  },

  destroy(req, res) {
  	return TodoItem
  		.findById(req.params.todoItemId)
  		.then(todoItem => {
  			if(!todoItem) {
  				return 
  					res.status(404).send({
  						message: 'Todo item not found'
  					})
  			}
  			return todoItem
  				.destroy()
  				.then(todoItem => res.status(204).send())
  				.catch(error => res.status(400).send(error))
  		})
  }
};