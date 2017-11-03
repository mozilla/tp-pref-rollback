# Tracking protection preference rollback

<https://bugzilla.mozilla.org/show_bug.cgi?id=1414404>

## Building the add-on

    zip -r ../tp-pref-rollback.xpi bootstrap.js install.rdf

## Installing the add-on in Firefox

0. Get an [unbranded build of Firefox](https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds)
1. In `about:config`, set:
   1. `extensions.legacy.enabled` to `true`
   2. `xpinstall.signatures.required` to `false`
2. `about:debugging > [load temporary addon] > choose `tp-pref-rollback.xpi`
3. `tools > Web Developer > Browser Toolbox`
