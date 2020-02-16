export default class Response {

    constructor(data, statusCode, headers, nativeResponse) {
        this.data = data;
        this.statusCode = statusCode;
        this.headers = headers;
        this.nativeResponse = nativeResponse;
    }
}