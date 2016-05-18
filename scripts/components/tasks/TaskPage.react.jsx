var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var TaskStore = require('../../tasks/TaskStore.react.jsx');
var TaskActionCreators = require('../../actions/TaskActionCreators.react.jsx');
var State = require('react-router').State;
var moment = require('moment');

var TaskPage = React.createClass({
  
  mixins: [ State ],

  getInitialState: function() {
    return { 
      task: TaskStore.getTask(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
    TaskActionCreators.loadTask(this.getParams().taskId);
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      task: TaskStore.getTask(),
      errors: TaskStore.getErrors()
    }); 
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="task__title">{this.state.task.title}</div>
        <div className="task__body">{this.state.task.body}</div>
        <div className="task__user">{this.state.task.user.username}</div>
        <div className="task__due_date"> Due: {moment(this.state.task.due_date).fromNow()}</div>
        <div className="task__status"> Status: {this.state.task.status}</div>
      </div>
     );
  }

});

module.exports = TaskPage;

