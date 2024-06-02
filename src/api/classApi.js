import axiosClient from "./axiosClient";

class ClassRoom {
  getAll = () => {
    const url = "/api/classRooms";
    return axiosClient.get(url);
  };

  GetOne = id => {
    const url = `/api/classRooms/${id}`;
    return axiosClient.get(url);
  };
  GetbyCenter = id => {
    const url = `/api/classRooms/center/${id}`;
    return axiosClient.get(url);
  };
  AddNew = classRoom => {
    const url = "/api/classRooms";
    return axiosClient.post(url, classRoom);
  };

  Update = classRoom => {
    const url = `/api/classRooms/${classRoom.classId}`;
    return axiosClient.put(url, classRoom);
  };

  Remove = id => {
    const url = `/api/classRooms/${id}`;
    return axiosClient.delete(url);
  };
}

const classApi = new ClassRoom();
export default classApi;
