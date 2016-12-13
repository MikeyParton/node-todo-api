const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem

module.exports = {

	create(req, res) {
		return Todo
			.create({
				title: req.body.title,
			})
			.then(todo => res.status(201).send(todo))
			.catch(error => res.status(400).send(error));
	},

	list(req, res) {
		return Todo
		  .findAll({
		  	include: [{
		  		model: TodoItem,
		  		as: 'todoItems'
		  	}]
		  })
		  .then(todos => res.status(200).send(todos))
		  .catch(error => res.status(400).send(error));
	},

	retrieve(req, res) {
  	return Todo
  		.findById(req.params.todoId, {
  			include: [{
  				model: TodoItem,
  				as: 'todoItems'
  			}]
  		})
  		.then(todo => res.status(200).send(todo))
  		.catch(error => res.status(400).send({
  			message: 'Todo not found'
  		}))
  },

  update(req, res) {
  	return Todo
  		.findById(req.params.todoId, {
  			inclued: [{
  				model: TodoItem,
  				as: 'todoItems'
  			}]
  		})
  		.then(todo => {
  			if(!todo) {
  				return res.status(404).send({
  					message: 'Todo not fount',
  				})
  			}
  			return todo
  				.update({
  					title: req.body.title || todo.title,
  				})
  				.then( () => res.status(200).send(todo))
  				.catch(error => res.status(400).send(error))
  		})
  		.catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
  	return Todo
  		.findById(req.params.todId)
  		.then(todo => {
  			if(!todo) {
  				return res.status(404).send({
  					message: 'Todo not found'
  				})
  			}
  			return todo
  				.destroy()
  				.then(() => res.status(204).send({
  					message: 'Todo deleted!'
  				}))
  				.cathc(error => res.status(400).send(error))
  		})
  }
};