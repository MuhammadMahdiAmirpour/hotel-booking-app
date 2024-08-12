package ir.ac.kntu.hotel_booking_app.exception;

public class InvalidBookingRequestException extends RuntimeException{
	public InvalidBookingRequestException(String message) {
		super(message);
	}
}
