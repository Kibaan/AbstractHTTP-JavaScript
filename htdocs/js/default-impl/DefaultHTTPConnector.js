export default class DefaultHTTPConnector {

    constructor() {
        /// データ転送のタイムアウト期間（秒）。この期間データ転送が中断するとタイムアウトする。
        this.timeoutInterval = 15;
        /// 通信中の `URLSessionTask`
        this.urlSessionTask = null;
        /// 自動でリダイレクトするか
        this.isRedirectEnabled = true;
    }

    execute(request, complete) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'text';

        // 通信完了（成功、失敗どちらでも呼ばれる）
        xhr.onloadend = () => {
            this.onEnd(callbacks);
        };

        // 通信成功
        xhr.onload = (event) => {
            this.onReceiveData(callbacks, xhr);
        };

        // 通信エラー
        xhr.onerror = (event) => {
            this.onError(callbacks, xhr, 'networkError');
        };

        // タイムアウト
        xhr.ontimeout = (event) => {
            this.onError(callbacks, xhr, 'timeout');
        };

        // 中断
        xhr.onabort = (event) => {
            this.onError(callbacks, xhr, 'aborted');
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

    cancel() {
    }
}