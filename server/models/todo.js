'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Todo.hasMany(models.TodoItem, {
          foreignKey: 'todoId',
          as: 'todoItems'
        });
      }
    }
  });
  return Todo;
};