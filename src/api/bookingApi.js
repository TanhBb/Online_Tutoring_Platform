import axiosClient from "./axiosClient";

class Booking {
  getAll = () => {
    const url = "/api/bookings";
    return axiosClient.get(url);
  };

  getOne = id => {
    const url = `/api/bookings/${id}`;
    return axiosClient.get(url);
  };

  getByUserId = filter => {
    const url = "/api/bookings/user";
    return axiosClient.get(url, { params: filter });
  };

  getBookingByFilter = filter => {
    const url = "/api/bookings/user";
    return axiosClient.get(url, { params: filter });
  };

  getByBookingDate = bookingDate => {
    const url = `/api/bookings/booking/${bookingDate}`;
    return axiosClient.get(url);
  };

  addNew = booking => {
    const url = "/api/bookings";
    return axiosClient.post(url, booking);
  };

  update = (id, booking) => {
    const url = `/api/bookings/${id}`;
    return axiosClient.put(url, booking);
  };

  remove = id => {
    const url = `/api/bookings/${id}`;
    return axiosClient.delete(url);
  };
}

const bookingApi = new Booking();
export default bookingApi;
