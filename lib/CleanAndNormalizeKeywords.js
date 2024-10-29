function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let CleanAndNorm = function (q) {

    let tmpQ = "";

    if (!q) {
        return tmpQ;
    }

    try {
        if (Array.isArray(q) == true) {
            q = q[0];
        }
    } catch (e) {

    }

    try {
        tmpQ = q
            .toLowerCase()
            .replace("wanted now", "")
            .replace("websites jobs", "")
            .replace("application online", "")
            .replace("city of", "")
            .replace("become a", "")
            .replace("find a", "")
            .replace("town of", "")
            .replace("walking distance", "")
            .replace("state of", "")
            .replace("new hiring", "")
            .replace("jobs", "")
            .replace("job", "")
            .replace("vacancies", "")
            .replace("hiring", "")
            .replace("openings", "")
            .replace("workers", "")
            .replace("opening", "")
            .replace("applications", "")
            .replace("application", "")
            .replace("indeed", "")
            .replace("inseed", "")
            .replace("glassdoor", "")
            .replace("Navy federal", "")
            .replace("city", "")
            .replace("careers", "")
            .replace("career", "")
            .replace("apply at", "")
            .replace("reed uk", "")
            .replace("employment", "")
            .replace("available", "")
            .replace("ineed", "")
            .replace("indded", "")
            .replace("indees", "")
            .replace("usajobs", "")
            .replace("snaggajob", "")

            .replace("craiglist", "")
            .replace("staffing match", "")
            .replace("ofertas empleo", "")
            .replace("apply for", "")


            .replace("blood delivery driver", "delivery driver")
            .replace("hobby loby", "hobby lobby")
            .replace("amazonflex", "amazon flex")
            .replace("amzone", "amazon")
            .replace("azamon", "amazon")
            .replace("waltmart", "walmart")
            .replace("warmart", "walmart")
            .replace("walmar", "walmart")
            .replace("walmarttt", "walmart")
            .replace("walmartt", "walmart")

            .replace("applyatwalmart", "walmart")


            .replace("amtrack", "amtrak")

            .replace("burgerking", "burger king")
            .replace("royalmail", "royal mail")
            .replace("waitroses", "waitrose")
            .replace("toco bell", "taco bell")
            .replace("dollartree", "dollar tree")
            .replace("bartending", "bartender")
            .replace("wing stop", "wingstop")
            .replace("bathandbodyworks", "Bath And Body Works")


            .replace(/\bolivegarden\b/igm, "olive garden")
            .replace(/\bbabysit\b/igm, "babysitter")
            .replace(/\baldl\b/igm, "aldi")
            .replace(/\blidi\b/igm, "lidl")
            .replace(/\blidls\b/igm, "lidl")
            .replace(/\badsa\b/igm, "asda")

            .replace(/\bFull time\b/igm, "")
            .replace(/\bNavy federal\b/igm, "")
            .replace(/\bsearching\b/igm, "")
            .replace(/\bApply to\b/igm, "")
            .replace(/\bindee\b/igm, "")
            .replace(/\bfind\b/igm, "")
            .replace(/\breed\b/igm, "")
            .replace(/\bcom\b/igm, "")
            .replace(/\bgov\b/igm, "")
            .replace(/\bin\b/igm, "")
            .replace(/\bwork\b/igm, "")
            .replace(/\breeds\b/igm, "")
            .replace(/\bfor\b/igm, "")
            .replace(new RegExp("\\+", "igm"), "")
            .trim()
            .replace(/ +(?= )/g, '');
    } catch (e) {
        // console.trace("clean q error", e);
        //console.trace("cleanqerrorq", q);
    }

    try {

        if (tmpQ.search(/(fairs\b|fair\b|search\b|\blooking\b)/igm) > -1) {
            tmpQ = ""
        }

    } catch (e) {

    }

    try {
        tmpQ = capitalizeFirstLetter(tmpQ);
    } catch (e) {

    }


    return tmpQ

}

module.exports = {
    CleanAndNorm: CleanAndNorm
}