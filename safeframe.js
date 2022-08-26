(()=>{"use strict";var __webpack_modules__={4577:()=>{eval('\n// UNUSED EXPORTS: checkSafeFrameViewability, isSafeFrameWindow\n\n;// CONCATENATED MODULE: ./src/constants.ts\nvar IFRAME_INLINE_STYLE = "height: 100% !important; width: 100% !important; z-index: 1; overflow: hidden; min-height: inherit !important; min-width: inherit !important; max-height: inherit !important; max-width: inherit !important; display: block !important;border: 0 !important;";\nvar IFRAME_SANDBOX = "allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation";\nvar BLIINK_CLASS_PREFIX = "bliink";\nvar BLIINK_ADUNIT_CLASS = "".concat(BLIINK_CLASS_PREFIX, "-adunit");\nvar BLIINK_NATIVE_CLASS = "".concat(BLIINK_CLASS_PREFIX, "-native");\nvar BLIINK_ADUNIT_WRAPPER_CLASS = "".concat(BLIINK_ADUNIT_CLASS, "__wrapper");\nvar BLIINK_ADUNIT_IFRAME_CLASS = "".concat(BLIINK_ADUNIT_CLASS, "__iframe");\nvar BLIINK_ADUNIT_OVERLAY_CLASS = "".concat(BLIINK_ADUNIT_CLASS, "__overlay");\nvar BLIINK_ADVIEW_CLASS = "".concat(BLIINK_CLASS_PREFIX, "-adview");\nvar BLIINK_PLAYER_CLASS = "".concat(BLIINK_CLASS_PREFIX, "-player");\nvar BLIINK_PLAY_CLASS = "".concat(BLIINK_CLASS_PREFIX, "-replay-button");\nvar CREATIVE_POST_MESSAGE = "https://tag.bliink.io/creative.min.js";\nvar PIXEL_INLINE_STYLE = "width: 1px; height: 1px; border: 0; opacity: 0;";\nvar IMAGES_LOCATOR_QUERY = \'img, div[style*="background-image"], div[style*="background: url"]\';\nvar IMAGES_LOCATOR_QUERY_WRAPPER = \':wrapper img, :wrapper picture span, :wrapper div[style*="background-image"], :wrapper div[style*="background: url"]\';\nvar EVENT_API_URL = "https://e.api.bliink.io";\nvar CreativeEvent;\n(function (CreativeEvent) {\n    CreativeEvent["CLICK"] = "bliink-click";\n    CreativeEvent["VISIBLE"] = "bliink-visible";\n    CreativeEvent["SHOW"] = "bliink-show";\n    CreativeEvent["HIDE"] = "bliink-hide";\n    CreativeEvent["HIDE_CLOSE"] = "bliink-hide-close";\n    CreativeEvent["DESTROY"] = "bliink-destroy";\n    CreativeEvent["PLAY_VIDEO"] = "bliink-play-video";\n    CreativeEvent["VIDEO_STARTED"] = "bliink-video-started";\n    CreativeEvent["VIDEO_FIRST_QUARTILE"] = "bliink-video-first-quartile";\n    CreativeEvent["VIDEO_MIDPOINT"] = "bliink-video-midpoint";\n    CreativeEvent["VIDEO_THIRD_QUARTILE"] = "bliink-video-third-quartile";\n    CreativeEvent["VIDEO_COMPLETE"] = "bliink-video-complete";\n    CreativeEvent["EVENT"] = "bliink-event";\n    CreativeEvent["EXPAND"] = "bliink-expand";\n    CreativeEvent["REDUCE"] = "bliink-reduce";\n    CreativeEvent["STICKY"] = "bliink-sticky";\n    CreativeEvent["ENABLE_SWITCH"] = "bliink-enable-switch";\n    CreativeEvent["SWITCH"] = "bliink-switch";\n})(CreativeEvent || (CreativeEvent = {}));\nvar AdEvent;\n(function (AdEvent) {\n    AdEvent["AD_ERROR"] = "adError";\n    AdEvent["ERROR"] = "error";\n    AdEvent["CALL"] = "call";\n    AdEvent["IMPRESSION"] = "impression";\n    AdEvent["CLICK"] = "click";\n    AdEvent["VISIBLE"] = "visible";\n    AdEvent["CLOSE"] = "close";\n    AdEvent["CREATIVE_VIEW"] = "creativeView";\n    AdEvent["STARTED"] = "start";\n    AdEvent["FIRST_QUARTILE"] = "firstquartile";\n    AdEvent["MIDPOINT"] = "midpoint";\n    AdEvent["THIRD_QUARTILE"] = "thirdquartile";\n    AdEvent["COMPLETE"] = "complete";\n    AdEvent["RESUMED"] = "resume";\n    AdEvent["ADBLOCK"] = "adblock";\n    AdEvent["BID_REQUEST"] = "bid-request";\n    AdEvent["BID_RESPONSE"] = "bid-response";\n    AdEvent["CREATIVE_ERROR"] = "creative-error";\n    AdEvent["CUSTOM"] = "custom";\n})(AdEvent || (AdEvent = {}));\nvar AdMode;\n(function (AdMode) {\n    AdMode["TEST"] = "test";\n    AdMode["AD_SERVER"] = "normal";\n    AdMode["AD_SERVER_NEW"] = "ad";\n    AdMode["RTB"] = "rtb";\n    AdMode["NO_AD"] = "no-ad";\n})(AdMode || (AdMode = {}));\nvar MediaFileType;\n(function (MediaFileType) {\n    MediaFileType["VPAID"] = "application/javascript";\n    MediaFileType["VIDEO"] = "video/mp4";\n})(MediaFileType || (MediaFileType = {}));\n\n;// CONCATENATED MODULE: ./src/SafeFrame/index.ts\n// import { sendEventWithToken } from "~/actions";\n// import { AdEvent } from "~/constants";\n// import Logger from "../Logger";\n\nvar viewableTimerId;\nvar viewableIntervalId;\nvar viewableFired = false;\nvar isSafeFrameWindow = function () {\n    return !!(typeof $sf !== "undefined" && $sf.ext);\n};\nfunction notifyViewablePassed() {\n    if (viewableFired)\n        return;\n    clearInterval(viewableIntervalId);\n    viewableFired = true;\n    var iframeTest = document.querySelector(\'iframe\');\n    if (iframeTest === null || iframeTest === void 0 ? void 0 : iframeTest.contentWindow) {\n        console.log("sending event postMessage");\n        iframeTest.contentWindow.postMessage(AdEvent.VISIBLE, "*");\n        // return;\n    }\n    console.log("sending event with token, is viewable", iframeTest);\n    // sendEventWithToken(AdEvent.VISIBLE, window.BLIINK_AD.token);\n    // new Logger().info("is viewable");\n}\nfunction statusUpdate() {\n    var percentageView = $sf.ext.inViewPercentage();\n    if (percentageView > 30) {\n        console.log(\'percentage view IN \', percentageView, viewableTimerId);\n        if (!viewableTimerId) {\n            console.log("fistart viewable timerrst");\n            // new Logger().info("start viewable timer");\n            viewableTimerId = setTimeout(notifyViewablePassed, 5000);\n        }\n    }\n    else {\n        clearTimeout(viewableTimerId);\n        viewableTimerId = null;\n    }\n}\nfunction checkSafeFrameViewability() {\n    if (isSafeFrameWindow()) {\n        console.log(\'in safeframe***\');\n        viewableIntervalId = setInterval(statusUpdate, 100);\n    }\n    else {\n        console.log(\'no safeframe***\');\n    }\n}\ncheckSafeFrameViewability();\n\n\n//# sourceURL=webpack://native/./src/SafeFrame/index.ts_+_1_modules?')}},__webpack_exports__={};__webpack_modules__[4577]()})();