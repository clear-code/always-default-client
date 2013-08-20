/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

load('lib/prefs');

var DOMAIN = 'extensions.alwaysdefaultclient@clear-code.com.';

var AlwaysDefaultClient = { 
  ensureDefaultClient: function ADC_ensureDefaultClient() {
    var shellService;
    var allUsers = this.allUsers;
    try {
      // Firefox
      shellService = Cc['@mozilla.org/browser/shell-service;1']
                       .getService(Ci.nsIShellService);
      let allTypes = this.browser.allTypes;
      if (!shellService.isDefaultBrowser(/* startup? */ false, allTypes)) {
        shellService.setDefaultBrowser(allTypes, allUsers);
      }
    } catch(error) {
      // Thunderbird
      try {
        shellService = Cc['@mozilla.org/mail/shell-service;1']
                         .getService(Ci.nsIShellService);
        let types = this.mail.types;
        if (!shellService.isDefaultClient(/* startup? */ false, types)) {
          shellService.setDefaultClient(allUsers, types);
        }
      } catch(error) {
        Cu.reportError(new Error('AlwaysDefaultClient: not supported application.\n' + error));
      }
    }
  },

  get allUsers() {
    return prefs.getPref(DOMAIN + 'allUsers') || false;
  },

  browser: {
    get allTypes() {
      return prefs.getPref(DOMAIN + 'browser.allTypes') || false;
    }
  },

  mail: {
    get types() {
      var types = prefs.getPref(DOMAIN + 'mail.types');
      if (types !== null)
        return types;

      types = Ci.nsIShellService.MAIL;
      // types |= Ci.nsIShellService.NEWS;
      // types |= Ci.nsIShellService.RSS;
      return types;
    }
  }
};

AlwaysDefaultClient.ensureDefaultClient();

function shutdown()
{
  DOMAIN = undefined;
  AlwaysDefaultClient = undefined;
  prefs = undefined;
}
