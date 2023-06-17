import axios from "axios";
import { setAuthToken } from "../auth";
import { IMAGE_URL, base_url } from "../constants/url";

setAuthToken(localStorage.getItem("token"));
// setAuthToken("21|QQYA56p7Vrl6wefonWVXsXeJNIaLjOe99v1ohkZ9");

// TODO: lanjut bikin fungsi untuk fetch tiap data dari backend
// export function fetch

const fetchImage = async (imagePath, dispatch) => {
    try {
        const response = await axios.get(IMAGE_URL + "/" + imagePath, { responseType: "blob" });
        let reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function () {
            dispatch(setPicture(reader.result));
        }
    } catch (err) {
        return err;
    }
};

const registerUser = async (payload) => {
    try {
        const response = await axios.post(base_url("/api/register"), payload);
        return response;
    } catch (err) {
        return err;
    }
}

export const UserService = {
    fetchImage,
    registerUser
}

// =================================================================================================

// TODO: tambah parameter event/poll id untuk tiap candidate dan voter juga
// buat redux feature untuk menampung event/poll
const getPoll = async (limit, page, orderBy, direction, keyword) => {
    try {
        const params = `limit=${limit}&page=${page}&orderBy=${orderBy}&direction=${direction}&keyword=${keyword}`;
        const response = await axios.get(base_url(`api/event?${params}`));
        return response;
    } catch (err) {
        return err;
    }
}

const showPoll = async (secure_id) => {
    try {
        const response = await axios.get(base_url(`api/event/${secure_id}`));
        return response;
    } catch (err) {
        return err;
    }
}

const createPoll = async (payload) => {
    try {
        const response = await axios.post(base_url("/api/event"), payload);
        return response;
    } catch (err) {
        return err;
    }
}

const updatePoll = async (payload, secure_id) => {
    try {
        const response = await axios.put(base_url(`/api/event/${secure_id}`), payload);
        return response;
    } catch (err) {
        return err;
    }
}

const deletePoll = async (secure_id) => {
    try {
        const response = await axios.delete(base_url(`/api/event/${secure_id}`));
        return response;
    } catch (err) {
        return err;
    }
}

export const PollService = {
    getPoll,
    createPoll,
    updatePoll,
    deletePoll,
    showPoll
};

// ==================================================================================================

const getCandidates = (eventId) => {
    return (limit, page, orderBy, direction, keyword) => {
        const params = `limit=${limit}&page=${page}&orderBy=${orderBy}&direction=${direction}&keyword=${keyword}&event_id=${eventId ? eventId : ''}`;
        const response = axios.get(base_url(`api/candidate?${params}`))
            .then((res) => {
                return res;
            }).catch(err => {
                return err;
            });
        return response;
    }
}

const showCandidate = async (secure_id) => {
    try {
        const response = await axios.get(base_url(`api/candidate/${secure_id}`));
        return response;
    } catch (err) {
        return err;
    }
}

const createCandidate = async (payload) => {
    try {
        // FIXME: ini coba benerin, jadi pake multipart/form-data
        const response = await axios.post(base_url('api/candidate'), payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    } catch (err) {
        return err;
    }
}

const updateCandidate = async (payload, secure_id) => {
    try {
        const response = await axios.post(base_url(`api/candidate/${secure_id}`), payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    } catch (err) {
        return err;
    }
}

const updateCandidateImage = async (payload, secure_id) => {
    try {
        const response = await axios.post(base_url(`api/candidate/${secure_id}`), payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    } catch (err) {
        return err;
    }
}

const deleteCandidate = async (secure_id) => {
    try {
        const response = await axios.delete(base_url(`api/candidate/${secure_id}`));
        return response;
    } catch (err) {
        return err;
    }
}

export const CandidateService = {
    getCandidates,
    showCandidate,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    updateCandidateImage
}

// ====================================================================================================

const getVoters = (event_id) => {
    return async (limit, page, orderBy, direction, keyword) => {
        try {
            const params = `limit=${limit}&page=${page}&orderBy=${orderBy}&direction=${direction}&keyword=${keyword}&event_id=${event_id ? event_id : ''}`;
            const response = await axios.get(base_url(`api/voter?${params}`));
            return response;
        } catch (err) {
            return err;
        }
    }
}

const getUnregisteredVoters = (event_id) => {
    return async (limit, page, orderBy, direction, keyword) => {
        try {
            const params = `limit=${limit}&page=${page}&orderBy=${orderBy}&direction=${direction}&keyword=${keyword}`;
            const response = await axios.get(base_url(`/api/user/${event_id}/unregistered?${params}`));
            return response;
        } catch (err) {
            return err;
        }
    }
}

const showVoter = async (username) => {
    try {
        const response = await axios.get(base_url(`api/voter/${username}`));
        return response;
    } catch (err) {
        return err;
    }
}

const createVoter = async (payload) => {
    try {
        const response = await axios.post(base_url('api/voter'), payload);
        return response;
    } catch (err) {
        return err;
    }
}

const updateVoter = async (payload, username) => {
    try {
        const response = await axios.put(base_url(`/api/voter/${username}`), payload);
        return response;
    } catch (err) {
        return err;
    }
}

const deleteVoter = async (username) => {
    try {
        const response = await axios.delete(base_url(`/api/voter/${username}`));
        return response;
    } catch (err) {
        return err;
    }
}

const registerVoter = async (username, event_id) => {
    try {// FIXME: kenapa ini nggak terkirim ke server
        const response = await axios.post(base_url('/api/user/register_event'), {
            'event_id': event_id,
            'voter_id': username
        });
        return response;
    } catch (err) {
        return err;
    }
}

const unregisterVoter = async (username, event_id) => {
    try {
        const response = await axios.post(base_url('/api/user/unregister_event'), {
            'event_id': event_id,
            'voter_id': username
        });
        return response;
    } catch (err) {
        return err;
    }
}

export const VoterService = {
    getVoters,
    getUnregisteredVoters,
    showVoter,
    createVoter,
    updateVoter,
    deleteVoter,
    registerVoter,
    unregisterVoter
};

// =========================PRODI SERVICE==============================
const getProdis = async () => {
    try {
        const response = await axios.get(base_url('/api/prodi'));
        return response;
    } catch (err) {
        return err;
    }
}

const storeProdi = async (name = "") => {
    try {
        const response = await axios.post(base_url('/api/prodi'), { name: name });
        return response;
    } catch (error) {
        return error.result;
    }
}

const deleteProdi = async (id) => {
    try {
        const response = await axios.delete(base_url(`/api/prodi/${id}`));
        return response;
    } catch (error) {
        return error.result;
    }
}

const ProdiService = {
    getProdis, storeProdi, deleteProdi
};

export default ProdiService;

// ====================== Vote Event ========================
const showOnGoingPoll = async () => {
    try {
        const response = await axios.get(base_url(`/api/ongoing/event`));
        return response;
    } catch (error) {
        return error.result;
    }
}


export const VotingService = {
    showOnGoingPoll
};



