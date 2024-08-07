package ir.ac.kntu.hotel_booking_app.exception;

public class InternalServerException extends RuntimeException {
	public InternalServerException(String message) {
		super(message);
	}
}
