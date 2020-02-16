import Response from "../entity/response";
import ConnectionError from "../entity/connection-error";

export default class DefaultHttpConnector {

    constructor() {
        /// データ転送のタイムアウト期間（秒）。この期間データ転送が中断するとタイムアウトする。
        this.timeoutInterval = 15;
        /// 通信オブジェクト
        this.httpRequest = null;
    }

    execute(request, complete) {
        let xhr = new XMLHttpRequest();
        this.httpRequest = xhr;

        if (request.responseType) {
            xhr.responseType = request.responseType;
        }

        if (this.timeoutInterval) {
            xhr.timeout = this.timeoutInterval * 1000;
        }

        // 通信成功
        xhr.onload = (event) => {
            this.onReceiveData(complete, xhr);
        };

        // 通信エラー
        xhr.onerror = (event) => {
            this.onError(complete, xhr, 'networkError');
        };

        // タイムアウト
        xhr.ontimeout = (event) => {
            this.onError(complete, xhr, 'timeout');
        };

        // 中断
        xhr.onabort = (event) => {
            this.onError(complete, xhr, 'aborted');
        };

        xhr.open(request.method, request.url);
        xhr.setRequestHeader('Cache-Control', 'no-cache');

        let headers = request.headers;
        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        // 送信
        xhr.send(request.body);
    }

    onReceiveData(complete, xhr) {
        let response = this.makeResponse(xhr);
        complete(response);
    }

    onError(complete, xhr, errorType) {
        let info = {'errorType': errorType, 'xhr': xhr};
        complete(null, info);
    }

    makeResponse(xhr) {
        let headers = xhr.getAllResponseHeaders();
        return new Response(xhr.response, xhr.status, headers, xhr)
    }

    cancel() {
        if (this.httpRequest) {
            this.httpRequest.abort();
            this.httpRequest = null;
        }
    }
}