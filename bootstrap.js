"use strict";

const {utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/AddonManager.jsm");
const UserPreferences = Services.prefs;
const DefaultPreferences = Services.prefs.getDefaultBranch("");

function startup(data) {
  if (parseInt(Services.appinfo.version) >= 58) {
    console.log("This add-on is only needed on Firefox 57, removing.");
    AddonManager.getAddonByID("tp-pref-rollback@mozilla.com", addon => addon.uninstall());
    return;
  }

  // Wait for partner builds to finish their customizations before changing the pref.
  Services.obs.addObserver(function observer(aSubject, aTopic, aData) {
    Services.obs.removeObserver(observer, "distribution-customization-complete");
    DefaultPreferences.setBoolPref("privacy.trackingprotection.ui.enabled", false);
  }, "distribution-customization-complete");
}

function shutdown(data) {
  if (parseInt(Services.appinfo.version) >= 58) {
    console.log("No cleanup necessary on 58 or later.");
    return;
  }
  DefaultPreferences.setBoolPref("privacy.trackingprotection.ui.enabled", true);
}
