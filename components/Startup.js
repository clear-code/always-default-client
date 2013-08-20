const ID = 'alwaysdefaultclient@clear-code.com';

const Cc = Components.classes;
const Ci = Components.interfaces;
Components.utils.import('resource://gre/modules/XPCOMUtils.jsm');

const kCID  = Components.ID('{c25d9aa0-0943-11e3-8ffd-0800200c9a66}'); 
const kID   = '@clear-code.com/alwaysdefaultclient/startup;1';
const kNAME = "Always Default Client Startup Service";

const ObserverService = Cc['@mozilla.org/observer-service;1']
    .getService(Ci.nsIObserverService);

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
