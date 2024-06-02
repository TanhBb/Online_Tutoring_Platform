import axiosClient from "./axiosClient";

class Subject {
    getAll = () => {
        const url = "/api/subjects";
        return axiosClient.get(url);
    }

    GetOne = (id) => {
        const url = `/api/subjects/${id}`;
        return axiosClient.get(url);
    }

    AddNew = (subject) => {
        const url = "/api/subjects";
        return axiosClient.post(url, subject);
    }

    Update = (subject) => {
        const url = `/api/subjects/${subject.subjectId}`;
        return axiosClient.put(url, subject);
    }

    Remove = (id) => {
        const url = `/api/subjects/${id}`;
        return axiosClient.delete(url);
    }
}

const subjectApi = new Subject();
export default subjectApi;
