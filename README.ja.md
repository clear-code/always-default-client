always-default-client
=====================

Firefox/Thunderbirdを起動する度に自動的に既定のクライアントに設定します。

この挙動は以下の設定で変更できます。

    // true => コンピュータの全ユーザ向けに既定のクライアントに設定する（※管理者権限が必要）
    user_pref("extensions.alwaysdefaultclient@clear-code.com.allUsers", false);
    
    // true => Firefoxを以下に関連付ける： http, https, .xhtml, その他サポートしている形式すべて
    // false => Firefoxをhttpにのみ関連付ける
    user_pref("extensions.alwaysdefaultclient@clear-code.com.browser.allTypes", false);
    
    // 1 = 既定のメールクライアントとして登録
    // 2 = 既定のニュースリーダーとして登録
    // 4 = 既定のフィードリーダーとして登録
    // (1 + 2 + 4 = 7 = すべてに対して登録)
    user_pref("extensions.alwaysdefaultclient@clear-code.com.mail.types", 1);
