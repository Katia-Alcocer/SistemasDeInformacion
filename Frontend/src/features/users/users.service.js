import api from "../../services/api";

export const createUserRequest = async (payload) => {
    const response = await api.post("/users", payload);
    return response.data;
};

export const getUsersRequest = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const updateUserStatusRequest = async (id, activo) => {
    const response = await api.patch(`/users/${id}/estado`, { activo });
    return response.data;
};

export const updateUserRequest = async (id, payload) => {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
};
