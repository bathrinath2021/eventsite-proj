package com.eventsite.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "events")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "venueName")
	private String venueName;

	@Column(name = "venueAddress")
	private String venueAddress;

	@Column(name = "dateOfEvent")
	private String dateOfEvent;

	@Column(name = "startTime")
	private String startTime;

	@Column(name = "endTime")
	private String endTime;

	@Column(name = "availability")
	private int availability;

	@Column(name = "price")
	private double price;

	@Column(name = "published")
	private boolean published;

	public Event() {

	}

	public Event(String title, String description, String venueName, String venueAddress, String dateOfEvent,
			String startTime, String endTime, int availability, double price, boolean published) {
		super();
		this.title = title;
		this.description = description;
		this.venueName = venueName;
		this.venueAddress = venueAddress;
		this.dateOfEvent = dateOfEvent;
		this.startTime = startTime;
		this.endTime = endTime;
		this.published = published;
		this.availability = availability;
		this.price = price;
	}

	public long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean isPublished) {
		this.published = isPublished;
	}

	public String getVenueName() {
		return venueName;
	}

	public void setVenueName(String venueName) {
		this.venueName = venueName;
	}

	public String getVenueAddress() {
		return venueAddress;
	}

	public void setVenueAddress(String venueAddress) {
		this.venueAddress = venueAddress;
	}

	public String getDateOfEvent() {
		return dateOfEvent;
	}

	public void setDateOfEvent(String dateOfEvent) {
		this.dateOfEvent = dateOfEvent;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public int getAvailability() {
		return availability;
	}

	public void setAvailability(int availability) {
		this.availability = availability;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Event [title=" + title + ", description=" + description + ", venueName=" + venueName
				+ ", venueAddress=" + venueAddress + ", dateOfEvent=" + dateOfEvent + ", startTime=" + startTime
				+ ", endTime=" + endTime + ", availability=" + availability + ", price=" + price + ", published="
				+ published + "]";
	}

}
