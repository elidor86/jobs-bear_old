export function initializeTaboola() {
    return


    if ("_tfa" in window == true) {
        return
    }

    window._tfa = window._tfa || [];
    window._tfa.push({notify: 'event', name: 'page_view', id: 1401805});
    !function (t, f, a, x) {
        if (!document.getElementById(x)) {
            t.async = 1;
            t.src = a;
            t.id = x;
            f.parentNode.insertBefore(t, f);
        }
    }(document.createElement('script'),
        document.getElementsByTagName('script')[0],
        '//cdn.taboola.com/libtrc/unip/1401805/tfa.js',
        'tb_tfa_script');
}
