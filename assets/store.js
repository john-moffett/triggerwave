// Magnitude's store links, and which one this visitor's phone wants. Used by the home page and by the short link
// (/magnitude), which sends phones straight to their store.
// The App Store had Magnitude in Australia, Canada and New Zealand only until version 1.0.5 went worldwide; since then
// (IOS_EVERYWHERE) an iPhone goes to the App Store and the page's note on where it's available stays hidden.
(function () {
  var IOS_EVERYWHERE = true;
  var PLAY = "https://play.google.com/store/apps/details?id=com.triggerwave.magnitude";
  var APP_STORE = "https://apps.apple.com/app/id6817035753";

  function platform(ua, touch, plat) {
    if (/android/i.test(ua)) return "android";
    // (an iPad asks for desktop pages and calls itself a Mac: it's the Mac with a touch screen)
    if (/iphone|ipad|ipod/i.test(ua) || (plat === "MacIntel" && touch > 1)) return "ios";
    return "desktop";
  }

  // (?platform=ios, android or desktop: see the page as that visitor would, from any browser)
  var forced = /[?&]platform=(ios|android|desktop)\b/.exec(location.search);
  window.TW = {
    platform: forced ? forced[1] : platform(navigator.userAgent || "", navigator.maxTouchPoints || 0, navigator.platform || ""),
    platformOf: platform,   // (for checking by hand: TW.platformOf(someUserAgent, 0, ""))
    iosEverywhere: IOS_EVERYWHERE,
    appStore: APP_STORE,
    // Google Play passes the referrer on to the game's analytics, so installs from here are told apart
    play: function (medium) {
      return PLAY + "&referrer=" + encodeURIComponent("utm_source=triggerwave.com&utm_medium=" + medium);
    }
  };
})();
