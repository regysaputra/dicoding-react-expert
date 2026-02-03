import api from "../../utils/api.js";

const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS',
    RECEIVE_OWN_PROFILES: 'RECEIVE_OWN_PROFILES',
};

function receiveUsersActionCreator(users) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users,
        },
    };
}

function asyncRegisterUser({ name, email, password }) {
    return async () => {
        try {
            await api.register({ name, email, password });
        } catch (error) {
            alert(error.message);
        }
    };
}

function asyncPopulateUsers() {
    return async (dispatch) => {
        try {
            console.log("1. Fetching users..."); // Check if function starts
            const users = await api.getAllUsers();
            console.log("2. API Response:", users); // Check what the API actually returns

            // Dispatch the action
            const action = receiveUsersActionCreator(users);
            console.log("3. Dispatching Action:", action);
            dispatch(action);
        } catch (error) {
            console.error("API Error:", error); // Use console.error instead of alert to see details
            alert(error.message);
        }
    }
}

export {
    ActionType,
    receiveUsersActionCreator,
    asyncRegisterUser,
    asyncPopulateUsers,
};