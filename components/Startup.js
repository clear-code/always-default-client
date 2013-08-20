/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ID = 'alwaysdefaultclient@clear-code.com';

const Cc = Components.classes;
const Ci = Components.interfaces;
Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

const kCID  = Components.ID('{c25d9aa0-0943-11e3-8ffd-0800200c9a66}'); 
const kID   = '@clear-code.com/alwaysdefaultclient/startup;1';
const kNAME = "Always Default Client Startup Service";

const ObserverService = Cc['@mozilla.org/observer-service;1']
                          .getService(Ci.nsIObserverService);

const Prefs = Cc['@mozilla.org/preferences;1']
                .getService(Ci.nsIPrefBranch);

// const Application = Cc['@mozilla.org/steel/application;1']
//     .getService(Ci.steelIApplication);

// let { console } = Application;

const STARTUP_TOPIC = 'profile-after-change';

function AlwaysDefaultClientStartupService() { 
}
AlwaysDefaultClientStartupService.prototype = {
  observe: function ADCSS_observe(aSubject, aTopic, aData) {
    switch (aTopic) {
      case 'profile-after-change':
        this.ensureDefaultClient();
        return;
    }
  },

  ensureDefaultClient: function ADCSS_ensureDefaultClient() {
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
        dump('AlwaysDefaultClientStartupService: not supported application.\n');
      }
    }
  },

  get allUsers() {
    try {
      return Prefs.getBoolPref('extensions.alwaysdefaultclient@clear-code.com.allUsers');
    } catch(error) {
      return false;
    }
  },

  browser: {
    get allTypes() {
      try {
        return Prefs.getBoolPref('extensions.alwaysdefaultclient@clear-code.com.browser.allTypes');
      } catch(error) {
        return false;
      }
    }
  },

  mail: {
    get types() {
      try {
        return Prefs.getIntPref('extensions.alwaysdefaultclient@clear-code.com.mail.types');
      } catch(error) {
        let types = Ci.nsIShellService.MAIL;
        // types |= Ci.nsIShellService.NEWS;
        // types |= Ci.nsIShellService.RSS;
        return types;
      }
    }
  },

  classID: kCID,
  contractID: kID,
  classDescription: kNAME,
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIObserver]),
  _xpcom_categories: [
    { category: STARTUP_TOPIC, service: true }
  ]

};

var NSGetFactory = XPCOMUtils.generateNSGetFactory([AlwaysDefaultClientStartupService]);
