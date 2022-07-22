import React, { Component } from "react";
import EventDataService from "../services/event.service";

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeVenueName = this.onChangeVenueName.bind(this);
    this.onChangeVenueAddress = this.onChangeVenueAddress.bind(this);
    this.onChangeDateOfEvent = this.onChangeDateOfEvent.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.updatePublished = this.updatePublished.bind(this);

    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

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
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEvent(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          title: title
        }
      };
    });
  }

  // 
  onChangeVenueName(e) {
    const venueName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          venueName: venueName
        }
      };
    });
  }

  onChangeVenueAddress(e) {
    const venueAddress = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          venueAddress: venueAddress
        }
      };
    });
  }

  onChangeDateOfEvent(e) {
    const dateOfEvent = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          dateOfEvent: dateOfEvent
        }
      };
    });
  }

  onChangeStartTime(e) {
    const startTime = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          startTime: startTime
        }
      };
    });
  }

  onChangeEndTime(e) {
    const endTime = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          endTime: endTime
        }
      };
    });
  }

  onChangeAvailability(e) {
    const availability = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          availability: availability
        }
      }
    })
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          price: price
        }
      }
    })
  }

  // 

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentEvent: {
        ...prevState.currentEvent,
        description: description
      }
    }));
  }

  getEvent(id) {
    EventDataService.get(id)
      .then(response => {
        this.setState({
          currentEvent: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
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
      published: status
    };

    EventDataService.update(this.state.currentEvent.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEvent: {
            ...prevState.currentEvent,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEvent() {
    EventDataService.update(
      this.state.currentEvent.id,
      this.state.currentEvent
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The event was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEvent() {
    EventDataService.delete(this.state.currentEvent.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/events')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentEvent } = this.state;

    return (
      <div>
        {currentEvent ? (
          <div className="edit-form">
            <h4>Event</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentEvent.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              {/*  */}

              <div className="form-group">
                <label htmlFor="venueName">Venue Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="venueName"
                  value={currentEvent.venueName}
                  onChange={this.onChangeVenueName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Venue Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="venueAddress"
                  value={currentEvent.venueAddress}
                  onChange={this.onChangeVenueAddress}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfEvent">Date Of Event</label>
                <input
                  // type="text"
                  className="form-control"
                  id="dateOfEvent"
                  value={currentEvent.dateOfEvent.substring(0,10)}
                  onChange={this.onChangeDateOfEvent}
                />
              </div>

              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="startTime"
                  value={currentEvent.startTime}
                  onChange={this.onChangeStartTime}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="endTime"
                  value={currentEvent.endTime}
                  onChange={this.onChangeEndTime}
                />
              </div>

              {/*  */}

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentEvent.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <input
                  type="text"
                  className="form-control"
                  id="availability"
                  value={currentEvent.availability}
                  onChange={this.onChangeAvailability}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentEvent.price}
                  onChange={this.onChangePrice}
                />
              </div>


              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentEvent.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentEvent.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEvent}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEvent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Event...</p>
          </div>
        )}
      </div>
    );
  }
}
