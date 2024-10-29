import {tunnelUrl} from "../server/config";

export default function initExitIntent(redirectRelativePath) {

    if (!process.browser) {
        return;
    }
    var addEvent = function (elm, evt, cb) {
        if (elm.attachEvent) {
            elm.attachEvent("on" + evt, cb);
        } else {
            elm.addEventListener(evt, cb, false);
        }
    };

    var isMobile = true;
    try {
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            window.navigator.userAgent
        );
    } catch (e) {
        return;
    }

    if (isMobile == false) {
        return;
    }

    /*
    if ("replaceState" in window.history) {
        window.history.replaceState(
            {
                isBouncing: true
            },
            window.title
        );
        window.history.pushState(null, window.title);
        addEvent(window, "popstate", function (e) {
            if (window.history.state && window.history.state.isBouncing) {
                try {
                    console.log(
                        `replacing history with: ${tunnelUrl}${redirectRelativePath}`
                    );
                    location.replace(`${tunnelUrl}${redirectRelativePath}`);
                } catch (e) {
                }
            }
        });
    }
    */


}
