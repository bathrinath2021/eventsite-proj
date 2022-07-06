package com.eventsite.organizer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventsite.organizer.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
	List<Event> findByPublished(boolean published);
	List<Event> findByTitleContaining(String title);
}
