import axiosClient from "./axiosClient";

class Slot {
    getAll = () => {
        const url = "/api/slots";
        return axiosClient.get(url);
    }

    GetOne = (id) => {
        const url = `/api/slots/${id}`;
        return axiosClient.get(url);
    }

    AddNew = (slot) => {
        const url = "/api/slots";
        return axiosClient.post(url, slot);
    }

    Update = (slot) => {
        const url = `/api/slots/${slot.slotId}`;
        return axiosClient.put(url, slot);
    }

    Remove = (id) => {
        const url = `/api/slots/${id}`;
        return axiosClient.delete(url);
    }
}

const slotApi = new Slot();
export default slotApi;
