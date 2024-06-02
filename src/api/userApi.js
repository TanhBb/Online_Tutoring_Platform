import axiosClient from "./axiosClient";

class User {
  register(user) {
    const url = "/api/auth/register";
    return axiosClient.post(url, user);
  }

  login(credentials) {
    const url = "/api/auth/login";
    return axiosClient.post(url, credentials);
  }
  getAll = () => {
    const url = "/api/users";
    return axiosClient.get(url);
  };

  getUsersByFilter(filter) {
    const url = `/api/users/manageUser`;
    return axiosClient.get(url, { params: filter });
  }

  GetOne = id => {
    const url = `/api/users/${id}`;
    return axiosClient.get(url);
  };

  create = user => {
    const url = "/api/users";
    return axiosClient.post(url, user);
  };
  update(user) {
    const url = `/api/users/${user.get("userId")}`;
    return axiosClient.put(url, user);
  }
  remove(userId) {
    const url = `/api/users/${userId}`;
    return axiosClient.delete(url);
  }
}

const userApi = new User();
export default userApi;
