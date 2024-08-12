package ir.ac.kntu.hotel_booking_app.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
	private Long id;
	private LocalDate checkInDate;
	private LocalDate checkOutDate;
	private String guestName;
	private String guestEmail;
	private int numberOfAdults;
	private int numberOfChildren;
	private int totalNumberOfGuests;
	private String bookingConfirmationCode;
	private RoomResponse room;

	public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode) {
		this.id = id;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.bookingConfirmationCode = bookingConfirmationCode;
	}

	public BookingResponse(Long bookingId, LocalDate checkInDate, LocalDate checkOutDate, String guestFullName,
	                       String guestEmail, int numberOfAdults, int numberOfChildren, int totalNumberOfGuests, String bookingConfirmationCode) {
		this.id = bookingId;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.guestName = guestFullName;
		this.guestEmail = guestEmail;
		this.numberOfAdults = numberOfAdults;
		this.numberOfChildren = numberOfChildren;
		this.totalNumberOfGuests = totalNumberOfGuests;
		this.bookingConfirmationCode = bookingConfirmationCode;
	}
}
