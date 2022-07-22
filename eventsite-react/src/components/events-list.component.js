import React, { Component } from "react";
import EventDataService from "../services/event.service";
import { Link } from "react-router-dom";

export default class EventsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.removeAllEvents = this.removeAllEvents.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      events: [],
      currentEvent: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveEvents();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveEvents() {
    EventDataService.getAll()
      .then(response => {
        this.setState({
          events: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEvents();
    this.setState({
      currentEvent: null,
      currentIndex: -1
    });
  }

  setActiveEvent(event, index) {
    this.setState({
      currentEvent: event,
      currentIndex: index
    });
  }

  removeAllEvents() {
    EventDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentEvent: null,
      currentIndex: -1
    });

    EventDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          events: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, events, currentEvent, currentIndex } = this.state;

    return (
      <div className="list row">
        
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
          
        </div>
        <div className="col-md-6">
          <h4>Event List</h4>
          <Link to={"/add"} className="nav-link">
          <button type="button" class="btn btn-success">Create</button>
          </Link>
         

          <ul className="list-group">
            {events &&
              events.map((event, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEvent(event, index)}
                  key={index}
                >
                  {event.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEvents}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentEvent ? (
            <div>
              <h4>Events</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentEvent.title}
              </div>
              <div>
                <label>
                  <strong>VenueName:</strong>
                </label>{" "}
                {currentEvent.venueName}
              </div>

              <div>
                <label>
                  <strong>Venue Address:</strong>
                </label>{" "}
                {currentEvent.venueAddress}
              </div>

              <div>
                <label>
                  <strong>Date Of Event:</strong>
                </label>{" "}
                {currentEvent.dateOfEvent.substring(0,10)}
              </div>

              <div>
                <label>
                  <strong>Start Time:</strong>
                </label>{" "}
                {currentEvent.startTime}
              </div>

              <div>
                <label>
                  <strong>End time:</strong>
                </label>{" "}
                {currentEvent.endTime}
              </div>

              <div>
                <label>
                  <strong>About the Event:</strong>
                </label>{" "}
                {currentEvent.description}
              </div>

              <div>
                <label>
                  <strong>Availability:</strong>
                </label>{" "}
                {currentEvent.availability}
              </div>
              <div>
                <label>
                  <strong>price:</strong>
                </label>{" "}
                ₹ {currentEvent.price}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentEvent.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/events/" + currentEvent.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Event...</p>
            </div>
            
          )}
        </div>
      </div>
      
    );
  }
}
