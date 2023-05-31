export const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;

    return (...args) => {
        const context = this;
        const currentTimestamp = Date.now();

        const execute = () => {
            func.apply(context, args);
            lastExecTime = currentTimestamp;
        };

        if (currentTimestamp >= lastExecTime + delay) {
            execute();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(execute, delay);
        }
    };
};
