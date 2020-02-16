
export default class ConnectionError {
    constructor(type, nativeError) {
        this.type = type;
        this.nativeError = nativeError;
    }
}