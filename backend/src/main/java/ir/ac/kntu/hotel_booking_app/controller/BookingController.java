package ir.ac.kntu.hotel_booking_app.controller;

import ir.ac.kntu.hotel_booking_app.exception.InvalidBookingRequestException;
import ir.ac.kntu.hotel_booking_app.exception.ResourceNotFoundException;
import ir.ac.kntu.hotel_booking_app.model.BookedRoom;
import ir.ac.kntu.hotel_booking_app.model.Room;
import ir.ac.kntu.hotel_booking_app.response.BookingResponse;
import ir.ac.kntu.hotel_booking_app.response.RoomResponse;
import ir.ac.kntu.hotel_booking_app.service.IBookingService;
import ir.ac.kntu.hotel_booking_app.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins="http://localhost:5173", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
	private final IBookingService bookingService;
	private final IRoomService roomService;

	@GetMapping("/all-bookings")
	public ResponseEntity<List<BookingResponse>> getAllBookings() {
		List<BookedRoom> bookings = bookingService.getAllBookings();
		List<BookingResponse> bookingResponses = new ArrayList<>();
		for (BookedRoom booking: bookings) {
			BookingResponse bookingResponse = getBookingResponse(booking);
			bookingResponses.add(bookingResponse);
		}
		return ResponseEntity.ok(bookingResponses);
	}


	@GetMapping("/confirmation/{confirmationCode}")
	public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
		try {
			BookedRoom booking = bookingService.findBookingByConfirmationCode(confirmationCode);
			BookingResponse bookingResponse = getBookingResponse(booking);
			return ResponseEntity.ok(bookingResponse);
		} catch (ResourceNotFoundException ex){
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
		}
	}

	@PostMapping("/room/{roomId}/booking")
	public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
	                                     @RequestBody BookedRoom bookingRequest) {
		try{
			String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
			return ResponseEntity.ok("Room Booked Successfully ! Your booking confirmation code is: " + confirmationCode);
		} catch (InvalidBookingRequestException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("/booking/{bookingId}/delete")
	public void cancelBooking(@PathVariable Long bookingId) {
		bookingService.cancelBooking(bookingId);
	}

	private BookingResponse getBookingResponse(BookedRoom booking) {
		Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
		RoomResponse room = new RoomResponse(
				theRoom.getId(),
				theRoom.getRoomType(),
				theRoom.getRoomPrice());
		return new BookingResponse(
				booking.getBookingId(),
				booking.getCheckInDate(),
				booking.getCheckOutDate(),
				booking.getGuestFullName(),
				booking.getGuestEmail(),
				booking.getNumberOfAdults(),
				booking.getNumberOfChildren(),
				booking.getTotalNumberOfGuests(),
				booking.getBookingConfirmationCode()
				);
	}
}
