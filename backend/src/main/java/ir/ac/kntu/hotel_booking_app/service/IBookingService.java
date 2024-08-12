package ir.ac.kntu.hotel_booking_app.service;

import ir.ac.kntu.hotel_booking_app.model.BookedRoom;

import java.util.List;

public interface IBookingService {
	List<BookedRoom> getAllBookingsByRoomId(Long roomId);

	List<BookedRoom> getAllBookings();

	BookedRoom findBookingByConfirmationCode(String confirmationCode);

	String saveBooking(Long roomId, BookedRoom bookingRequest);

	void cancelBooking(Long bookingId);
}
