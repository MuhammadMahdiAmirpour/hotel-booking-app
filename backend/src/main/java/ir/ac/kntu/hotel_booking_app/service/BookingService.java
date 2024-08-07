package ir.ac.kntu.hotel_booking_app.service;

import ir.ac.kntu.hotel_booking_app.model.BookedRoom;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {
	@Override
	public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
		return List.of();
	}
}
