export function startTyping() {
    return {
        type: 'START_TYPING',
        isTyping: true,
    };
}

export function stopTyping() {
    return {
        type: 'STOP_TYPING',
        isTyping: false,
    };
}
