import api from "../../utils/api.js";

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    ADD_THREAD: 'ADD_THREAD'
}

function receiveThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads,
        },
    };
}

function addThreadActionCreator(thread) {
    return {
        type: ActionType.ADD_THREAD,
        payload: {
            thread,
        },
    };
}

function asyncPopulateThreads() {
    return async (dispatch) => {
        try {
            const threads = await api.getAllThread();

            // const threadPromises = threads.map(async (thread) => {
            //     // Call the API for this specific thread
            //     const detail = await api.getThreadDetail(thread.id);
            //
            //     // Return a NEW object merging the old thread data with the new owner
            //     return {
            //         ...thread,
            //         owner: detail.owner // Assuming api response has an 'owner' property
            //     };
            // });
            //
            // // 2. Wait for ALL promises to resolve
            // const threadsWithOwners = await Promise.all(threadPromises);
            dispatch(receiveThreadsActionCreator(threads));
        } catch (error) {
            alert(error.message);
        }
    }
}

function asyncAddThread({ title, body, category }) {
    return async (dispatch) => {
        try {
            const thread = await api.createThread({ title, body, category });
            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            alert(error.message);
        }
    };
}

export {
    ActionType,
    receiveThreadsActionCreator,
    addThreadActionCreator,
    asyncPopulateThreads,
    asyncAddThread,
};