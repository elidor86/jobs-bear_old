export function initializeHotjar(id, sv) {

    return
    /*window.smartlook || (function (d) {
        var o = window.smartlook = function () {
            o.api.push(arguments)
        }, h = d.getElementsByTagName('head')[0];
        var c = d.createElement('script');
        o.api = new Array();
        c.async = true;
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.src = 'https://rec.smartlook.com/recorder.js';
        h.appendChild(c);
    })(document);

    smartlook('init', 'b819b95ba58aa66476176365f8ffe0a4f0f04f69');*/

    /*(function (h, o, t, j, a, r) {
        h.hj =
            h.hj ||
            function () {
                (h.hj.q = h.hj.q || []).push(arguments);
            };
        h._hjSettings = {
            hjid: id,
            hjsv: sv
        };
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
    })(window, document, "//static.hotjar.com/c/hotjar-", ".js?sv=");*/

}
