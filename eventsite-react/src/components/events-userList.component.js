import React, { Component } from "react";
import EventDataService from "../services/event.userService";
// import { Link } from "react-router-dom";

export default class EventsUserList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
    this.removeAllEvents = this.removeAllEvents.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.updateBooked = this.updateBooked.bind(this);

    this.state = {
      currentEvent: {
        id: null,
        title: "",
        description: "",
        venueName: "",
        venueAddress: "",
        dateOfEvent: "",
        startTime: "",
        endTime: "",
        availability: 0,
        price: "",
        booked: false
      },
      events: [],
      currentIndex: -1,
      searchTitle: ""
    };
  }

  updateBooked(status) {
    var data = {
      id: this.state.currentEvent.id,
      title: this.state.currentEvent.title,
      description: this.state.currentEvent.description,
      venueName: this.state.currentEvent.venueName,
      venueAddress: this.state.currentEvent.venueAddress,
      dateOfEvent: this.state.currentEvent.dateOfEvent,
      startTime: this.state.currentEvent.startTime,
      endTime: this.state.currentEvent.endTime,
      availability: this.state.currentEvent.availability,
      price: this.state.currentEvent.price,
      booked: status
    };

    EventDataService.update(this.state.currentEvent.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEvent: {
            ...prevState.currentEvent,
            booked: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
          <br />
          <div className="col-md-6">
            {currentEvent ? (
              <div>
                <h4>Events</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">VenueName</th>
                      <th scope="col">Venue Address</th>
                      <th scope="col">Date Of Event</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End Time</th>
                      <th scope="col">About the Event</th>
                      {/* <th scope="col">Availability</th> */}
                      <th scope="col">Price</th>
                      <th scope="col">Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{currentEvent.title}</td>
                      <td>{currentEvent.venueName}</td>
                      <td>{currentEvent.venueAddress}</td>
                      <td>{currentEvent.dateOfEvent}</td>
                      <td>{currentEvent.startTime}</td>
                      <td>{currentEvent.endTime}</td>
                      <td>{currentEvent.description}</td>
                      {/* <td>{currentEvent.availability}</td> */}
                      <td>{currentEvent.price}</td>
                      <td>
                        {currentEvent.booked ? (
                          <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateBooked(false)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateBooked(true)}
                          >
                            Book
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <br />
                <p></p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
