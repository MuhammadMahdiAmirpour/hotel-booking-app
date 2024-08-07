import axios from "axios"


export const api = axios.create({
	baseURL: "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
	}
}

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

	try {
        const response = await api.post("/rooms/add/new-room", formData, {
            headers: getHeader()
        });
        // Check if the response indicates success (e.g., status code 200 or 201)
        return response.status >= 200 && response.status < 300; // Success range
    } catch (error) {
        console.error("Error adding room:", error);
        return false;
    }
}

// export const addRoom = async (roomData) => {
//     try {
//       const formData = new FormData();
//       // Append data to formData
//       for (const key in roomData) {
//         formData.append(key, roomData[key]);
//       }
  
//       const response = await axios.post(`${API_BASE_URL}/rooms/add/new-room`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error adding room:', error);
//       throw error;
//     }
//   };

/* This function gets all room types from thee database */
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}

// export async function getRoomTypes() {
//     try {
//         const response = await api.get("/rooms/room/types");
//         if (response.data && Array.isArray(response.data)) {
//             return response.data;
//         } else {
//             console.warn("Invalid room types data received:", response.data);
//             return []; // Return an empty array as fallback
//         }
//     } catch (error) {
//         console.error("Error fetching room types:", error);
//         // Check if it's a 404 error
//         if (error.response && error.response.status === 404) {
//             console.warn("Room types endpoint not found. Using fallback data.");
//             // Provide some fallback room types
//             return ["Single", "Double", "Suite"];
//         }
//         // For other errors, return an empty array
//         return [];
//     }
// }

/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    try {
        const response = await api.put(`/rooms/update/${roomId}`, formData, {
            headers: getHeader()
        })
        return response
    } catch (error) {
        console.error("Error updating room:", error)
        throw new Error(`Error updating room: ${error.message}`)
    }
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
// export async function bookRoom(roomId, booking) {
// 	try {
// 		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
// 		return response.data
// 	} catch (error) {
// 		if (error.response && error.response.data) {
// 			throw new Error(error.response.data)
// 		} else {
// 			throw new Error(`Error booking room : ${error.message}`)
// 		}
// 	}
// }

/* This function gets alll bokings from the database */
// export async function getAllBookings() {
// 	try {
// 		const result = await api.get("/bookings/all-bookings", {
// 			headers: getHeader()
// 		})
// 		return result.data
// 	} catch (error) {
// 		throw new Error(`Error fetching bookings : ${error.message}`)
// 	}
// }

/* This function get booking by the cnfirmation code */
// export async function getBookingByConfirmationCode(confirmationCode) {
// 	try {
// 		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
// 		return result.data
// 	} catch (error) {
// 		if (error.response && error.response.data) {
// 			throw new Error(error.response.data)
// 		} else {
// 			throw new Error(`Error find booking : ${error.message}`)
// 		}
// 	}
// }

/* This is the function to cancel user booking */
// export async function cancelBooking(bookingId) {
// 	try {
// 		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
// 		return result.data
// 	} catch (error) {
// 		throw new Error(`Error cancelling booking :${error.message}`)
// 	}
// }

// export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
//     const result = await api.get(
//         `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
//     )
//     return result
// }

// export async function registerUser(registration) {
//     try {
//         const response = await api.post("/auth/register-user", registration)
//         return response.data
//     } catch (error) {
//         if (error.response && error.response.data) {
//             throw new Error(error.response.data)
//         } else {
//             throw new Error(`User registration error : ${error.message}`)
//         }
//     }
// }

/* This function login a registered user */
// export async function loginUser(login) {
// 	try {
// 		const response = await api.post("/auth/login", login)
// 		if (response.status >= 200 && response.status < 300) {
// 			return response.data
// 		} else {
// 			return null
// 		}
// 	} catch (error) {
// 		console.error(error)
// 		return null
// 	}
// }

/*  This is function to get the user profile */
// export async function getUserProfile(userId, token) {
// 	try {
// 		const response = await api.get(`users/profile/${userId}`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		throw error
// 	}
// }

/* This isthe function to delete a user */
// export async function deleteUser(userId) {
// 	try {
// 		const response = await api.delete(`/users/delete/${userId}`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		return error.message
// 	}
// }

/* This is the function to get a single user */
// export async function getUser(userId, token) {
// 	try {
// 		const response = await api.get(`/users/${userId}`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		throw error
// 	}
// }

/* This is the function to get user bookings by the user id */
// export async function getBookingsByUserId(userId, token) {
// 	try {
// 		const response = await api.get(`/bookings/user/${userId}/bookings`, {
// 			headers: getHeader()
// 		})
// 		return response.data
// 	} catch (error) {
// 		console.error("Error fetching bookings:", error.message)
// 		throw new Error("Failed to fetch bookings")
// 	}
// }
