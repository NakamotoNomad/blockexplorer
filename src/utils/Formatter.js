export const formatHexString = (str, startLength = 6, endLength = 4) => {
    if (str.length <= startLength + endLength) {
        return str;
    }
    return `${str.substring(0, startLength)}...${str.substring(str.length - endLength)}`;
};
