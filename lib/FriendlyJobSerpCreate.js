const friendlyJobSerpCreate = function (params) {

    let res = null;

    if (!params) {
        return
    }

    let keyword = null;
    let location = null;
    let geo = "us";


    if (params.keyword && typeof params.keyword == "string" && params.keyword.length > 0) {
        keyword = params.keyword.toLowerCase().trim().split(" ").join("-");
        keyword = capitalizeFirstLetter(keyword);
    }

    if (params.location && typeof params.location == "string" && params.location.length > 0) {
        location = params.location.toLowerCase().trim().split(" ").join("-");
        location = capitalizeFirstLetter(location);
    }

    if (params.geo && typeof params.geo == "string" && params.geo.length == 2) {
        geo = params.geo.toLowerCase().trim();
    }

    if (geo == "us") {
        geo = "USA";
    } else if (geo == "gb") {
        geo = "UK";
    }

    try {
        geo = geo.toUpperCase();
    } catch (e) {

    }

    if (keyword && location) {
        res = keyword + "-jobs-in-" + location;
    } else if (location) {
        res = "jobs-in-" + location;
    } else if (keyword) {
        res = keyword + "-jobs-in-" + geo;
    }

    //console.log("friendlyJobSerpCreate", res);

    return res;
}

const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = friendlyJobSerpCreate