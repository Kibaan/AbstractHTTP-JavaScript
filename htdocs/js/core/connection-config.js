import DefaultHttpConnector from "../default-impl/default-http-connector";
import DefaultURLEncoder from "../default-impl/default-url-encoder";

export default class ConnectionConfig {
    constructor() {
        this.isLogEnabled = true;
        this.httpConnector = () => new DefaultHttpConnector();
        this.urlEncoder = () => new DefaultURLEncoder();
    }

    static get shared() {
        return sharedConnectionConfig;
    }

    static set shared(value) {
        sharedConnectionConfig = value;
    }
}

let sharedConnectionConfig = new ConnectionConfig();