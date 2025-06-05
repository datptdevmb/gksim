
let isRefreshing = false;
let failedQueue = [];

export function processQueue(error, token) {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
}

export function pushToQueue(callbacks) {
    failedQueue.push(callbacks);
}

export function getRefreshState() {
    return isRefreshing;
}

export function setRefreshState(state) {
    isRefreshing = state;
}
