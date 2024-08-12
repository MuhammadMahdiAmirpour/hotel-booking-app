package ir.ac.kntu.hotel_booking_app.repository;

import ir.ac.kntu.hotel_booking_app.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
	void deleteById(Long bookingId);

	List<BookedRoom> findAll();

	List<BookedRoom> findByRoomId(Long roomId);

	BookedRoom findByBookingConfirmationCode(String confirmationCode);
}
