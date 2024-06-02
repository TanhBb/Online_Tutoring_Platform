import axiosClient from "./axiosClient";

class ParticipantApi {
  getAll = () => {
    const url = "/api/participants";
    return axiosClient.get(url);
  };

  GetOne = id => {
    const url = `/api/participants/${id}`;
    return axiosClient.get(url);
  };

  GetOneByUserId = id => {
    const url = `/api/participants/${id}`;
    return axiosClient.get(url);
  };

  AddNew = participant => {
    const url = "/api/participants";
    return axiosClient.post(url, participant);
  };

  Update = participant => {
    const url = `/api/participants/${participant.participantId}`;
    return axiosClient.put(url, participant);
  };

  Remove = id => {
    const url = `/api/participants/${id}`;
    return axiosClient.delete(url);
  };
}

const participantApi = new ParticipantApi();
export default participantApi;
