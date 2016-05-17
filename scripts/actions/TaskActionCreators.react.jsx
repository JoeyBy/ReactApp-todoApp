var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;

module.exports = {

  loadTasks: function() {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TASKS
    });
    WebAPIUtils.loadTasks();
  },
  
  loadTask: function(taskId) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_TASK,
      taskId: taskId
    });
    WebAPIUtils.loadTask(taskId);
  },

  createTask: function(title, body) {
    SmallAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_TASK,
      title: title,
      body: body
    });
    WebAPIUtils.createTask(title, body);
  }

};

