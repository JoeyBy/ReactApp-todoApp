var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var TaskStore = require('../../tasks/TaskStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var TaskActionCreators = require('../../actions/TaskActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

var TasksPage = React.createClass({

  getInitialState: function() {
    return { 
      tasks: TaskStore.getAllTasks(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
    TaskActionCreators.loadTasks();
  },

  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      tasks: TaskStore.getAllTasks(),
      errors: TaskStore.getErrors()
    }); 
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="row">
          <TasksList tasks={this.state.tasks} />
        </div>
      </div>
    );
  }
});

var TaskItem = React.createClass({
  render: function() {
    return (
      <li className="task">
        <div className="task__title">
          <Link to="task" params={ {taskId: this.props.task.id} }>
            {this.props.task.title}
          </Link>
        </div>
        <div className="task-right">
          <span className="task__due_date">{moment(this.props.task.due_date).fromNow(true)}</span>
        </div>
      </li>
    );
  }
});

var TasksList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.tasks.map(function(task, index){
          return <TaskItem task={task} key={"task-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = TasksPage;

