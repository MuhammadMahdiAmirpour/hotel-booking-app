package ir.ac.kntu.hotel_booking_app.service;

import ir.ac.kntu.hotel_booking_app.model.BookedRoom;

import java.util.List;

public interface IBookingService {
	List<BookedRoom> getAllBookingsByRoomId(Long roomId);
}
