var React = require('react');
var SmallAppDispatcher = require('../../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../../constants/SmallConstants.js');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var SessionStore = require('../../tasks/SessionStore.react.jsx');
var TaskActionCreators = require('../../actions/TaskActionCreators.react.jsx');
var RouteActionCreators = require('../../actions/RouteActionCreators.react.jsx');

var TaskNew = React.createClass({

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) { 
      RouteActionCreators.redirect('app');
    }
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value;
    var body = this.refs.body.getDOMNode().value;
    TaskActionCreators.createTask(title, body);
  },
  
  render: function() {
    return (
      <div className="row">
        <form onSubmit={this._onSubmit} className="new-task">
          <div className="new-task__title">
            <input type="text" placeholder="Title" name="title" ref="title" /> 
          </div>
          <div className="new-task__body">
            <textarea rows="10" placeholder="Your task..." name="body" ref="body" /> 
          </div>
          <div className="new-task__submit">
            <button type="submit">Create</button>
          </div>
         </form>
       </div>
     );
  }

});

module.exports = TaskNew;

