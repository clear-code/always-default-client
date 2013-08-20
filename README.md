always-default-client
=====================

Makes Firefox/Thunderbird as the default client on every startup.

You can control the behavior by following preferences:

    // true => set default for all users on the computer (*require administrator permission)
    user_pref("extensions.alwaysdefaultclient@clear-code.com.allUsers", false);
    
    // true => use Firefox for http, https, .xhtml, etc.
    // false => use Firefox for http only
    user_pref("extensions.alwaysdefaultclient@clear-code.com.browser.allTypes", false);
    
    // 1 = Mail
    // 2 = News
    // 4 = Feed
    // (1 + 2 + 4 = 7 = All)
    user_pref("extensions.alwaysdefaultclient@clear-code.com.mail.types", 1);

