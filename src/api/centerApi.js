import axiosClient from "./axiosClient";

class Center {
    getAll = () => {
        const url = "/api/centers";
        return axiosClient.get(url);
    }

    GetOne = (id) => {
        const url = `/api/centers/${id}`;
        return axiosClient.get(url);
    }

    AddNew = (center) => {
        const url = "/api/centers";
        return axiosClient.post(url, center);
    }

    Update = (center) => {
        const url = `/api/centers/${center.centerId}`;
        return axiosClient.put(url, center);
    }

    Remove = (id) => {
        const url = `/api/centers/${id}`;
        return axiosClient.delete(url);
    }
}

const centerApi = new Center();
export default centerApi;
