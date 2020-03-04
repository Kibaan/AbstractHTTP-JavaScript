import ConnectionConfig from "./connection-config";

export default class Connection {

    constructor(connectionSpec, onSuccess) {
        /// HTTPリクエストの仕様
        this.requestSpec = connectionSpec;
        /// レスポンスデータの正当性を検証する
        this.validate = connectionSpec.validate;
        /// 通信レスポンスをデータモデルに変換する
        this.parseResponse = connectionSpec.parseResponse;
        /// 通信開始と終了のリスナー
        this.listeners = [];
        /// 通信レスポンス処理のリスナー
        this.responseListeners = [];
        /// エラーのリスナー
        this.errorListeners = [];
        /// HTTP通信処理
        this.httpConnector = ConnectionConfig.shared.httpConnector();
        /// URLエンコード処理
        this.urlEncoder = ConnectionConfig.shared.urlEncoder();
        /// ログ出力を有効にするか
        this.isLogEnabled = ConnectionConfig.shared.isLogEnabled;
        /// コールバックをメインスレッドで呼び出すか
        this.callbackInMainThread = true;
        /// 通信成功時のコールバック
        this.onSuccess = null;
        /// 直近のリクエスト
        this.latestRequest = null;
        /// 実行中の通信オブジェクトを保持するコンテナ
        this.holder = ConnectionConfig.shared;
        /// 実行ID
        this.executionId = null;
        /// 中断中の実行ID
        this.interruptedId = null;
    }

}