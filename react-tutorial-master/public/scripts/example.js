/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var converter = new Showdown.converter();

var EventsManager = React.createClass({
  loadEventsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleEditEvent: function(event) {
    this.setState({editedEvent: event});
  },
  handleDeleteEvent: function(event) {
  alert('delete ' + event);
  },
  handleEventSubmit: function(event) {
    if (event._id) {
        var newData = [];
        this.state.data.forEach(function(e) {
            if (e._id == event._id) {
                newData.push(event);
            } else {
                newData.push(e);
            }
        });
        this.setState({data: newData});
    } else {
        this.state.data.push(event);
        this.setState({data: this.state.data});
    }

    this.setState({editedEvent: {}});
  }
  /*,
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments}, function() {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  }*/,
  getInitialState: function() {
    return {data: [], editedEvent: {}};
  },
  componentDidMount: function() {
    this.loadEventsFromServer();
    //setInterval(this.loadEventsFromServer, this.props.pollInterval);
  },
  render: function() {
    var that = this;
    var eventsRows= this.state.data.map(function(event, index) {
      return (
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        <Event data={event} handleEditEvent={that.handleEditEvent} handleDeleteEvent={that.handleDeleteEvent}></Event>
      );
    });

    return (
        <div>
            <table className="table">
              <caption>Your events</caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>From</th>
                  <th>To</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {eventsRows}
              </tbody>
            </table>
            <EventEditor data={this.state.editedEvent} handleEventSubmit={this.handleEventSubmit}></EventEditor>
        </div>
    );
  }
});

var Event = React.createClass({
  handleEditEvent: function() {
    this.props.handleEditEvent(this.props.data);
  },
  handleDeleteEvent: function() {
    this.props.handleDeleteEvent(this.props.data);
  },
  render: function() {
    return (
      <tr>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.location}</td>
          <td>{this.props.data.price ? this.props.data.price + '€' : 'Free'}</td>
          <td>{this.props.data.from}</td>
          <td>{this.props.data.to}</td>
          <td><div className="btn-group btn-group-sm">
                  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#" onClick={this.handleEditEvent}>Edit</a></li>
                    <li><a href="#" onClick={this.handleDeleteEvent}>Delete</a></li>
                  </ul>
              </div>
          </td>
      </tr>
    );
  }
});

var EventEditor = React.createClass({
  onChange: function() {
    this.props.data[event.target.refs] = event.target.value;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var event = {
        id: this.props.data._id,
        name: React.findDOMNode(this.refs.name).value.trim(),
        location: React.findDOMNode(this.refs.location).value.trim(),
        price: React.findDOMNode(this.refs.price).value.trim(),
        from: React.findDOMNode(this.refs.from).value.trim(),
        to: React.findDOMNode(this.refs.to).value.trim()
    };

    this.props.handleEventSubmit(event);
  },
  render: function() {
    return (
    <form className="form-horizontal" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label for="inputName" className="col-sm-2 control-label">Name</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputName" placeholder="Event name" ref="name" value={this.props.data.name} onChange={this.onChange}/>
        </div>
      </div>
      <div className="form-group">
        <label for="inputLocation" className="col-sm-2 control-label">Location</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputLocation" placeholder="Event location" ref="location" value={this.props.data.location} onChange={this.onChange}/>
        </div>
      </div>
      <div className="form-group">
        <label for="inputPrice" className="col-sm-2 control-label">Price</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputPrice" placeholder="Event price" ref="price" value={this.props.data.price} onChange={this.onChange}/>
        </div>
      </div>
      <div className="form-group">
        <label for="inputFrom" className="col-sm-2 control-label">From</label>
        <div className="col-sm-10">
          <input type="datetime" className="form-control" id="inputFrom" placeholder="From" ref="from" value={this.props.data.from} onChange={this.onChange}/>
        </div>
      </div>
      <div className="form-group">
        <label for="inputTo" className="col-sm-2 control-label">To</label>
        <div className="col-sm-10">
          <input type="datetime" className="form-control" id="inputTo" placeholder="To" ref="to" value={this.props.data.to} onChange={this.onChange}/>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </div>
    </form>
    );
  }
});

/*
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {
    return (
    <form className="form-horizontal" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label for="inputAuthor" className="col-sm-2 control-label">Author</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputAuthor" placeholder="Your name" ref="author" />
        </div>
      </div>
      <div className="form-group">
        <label for="inputComment" className="col-sm-2 control-label">Comment</label>
        <div className="col-sm-10">
          <textarea type="email" className="form-control" id="inputComment" ref="text" placeholder="Say something..."></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <div className="checkbox">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
      </div>
    </form>
    );
  }
});
*/
React.render(
  <EventsManager url="events.json" pollInterval={2000} />,
  document.getElementById('content')
);

