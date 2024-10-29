const Utils = require("../lib/Utils")

const FriendlyUtils = {}

FriendlyUtils.getJobsTitle = function (params) {
    let {keyword, location} = params;

    if (!keyword && !location) {
        return null;
    }

    const FreindlyCurrentDate = Utils.getFriendlyCurrentDate() || null;

    let FriendlyJobsTitle = null;

    try {
        if (keyword && typeof keyword == "string") {
            keyword = Utils.titleCase(keyword);
        }
    } catch (e) {

    }

    try {
        if (location && typeof location == "string") {
            location = Utils.titleCase(location);
        }
    } catch (e) {

    }

    if (keyword && location) {

        FriendlyJobsTitle = `${keyword} jobs in ${location} | Latest Opportunities`;

        if (FreindlyCurrentDate && typeof FreindlyCurrentDate == "string") {
            FriendlyJobsTitle = `${keyword} jobs in ${location} | ${FreindlyCurrentDate} Opportunities`;
        }

    } else if (location) {

        FriendlyJobsTitle = `Jobs in ${location} | Latest Opportunities`;

        if (FreindlyCurrentDate && typeof FreindlyCurrentDate == "string") {
            FriendlyJobsTitle = `Jobs in ${location} | ${FreindlyCurrentDate} Opportunities`;
        }

    } else if (keyword) {

        FriendlyJobsTitle = `${keyword} jobs | Latest Opportunities`;

        if (FreindlyCurrentDate && typeof FreindlyCurrentDate == "string") {
            FriendlyJobsTitle = `${keyword} jobs | ${FreindlyCurrentDate} Opportunities`;
        }

    }


    return FriendlyJobsTitle;

}

FriendlyUtils.getJobsP = function (params) {

    let {keyword, location} = params;

    if (!keyword && !location) {
        return null;
    }

    let FriendlyJobsP = "Don’t break a sweat. We’ve gathered the hottest job offers specially for you, all in one place. \nHey there! JobsBear is here to help you find the perfect job fit. Don't just search for a job, find one today! You know what's best for you and your family. With these amazing companies hiring near your location, finding a job has never been easier. These companies are eager to find their next hire, and it could be you! Apply today to these companies that are hiring right now. Finding a job is a breeze with JobsBear. So, no need to stress! We've gathered all the right jobs just for you. Look no further! We've compiled all the hottest job offers for you, all in one place. Check out these exciting new job openings we just found!";

    try {
        if (keyword && typeof keyword == "string") {
            keyword = Utils.titleCase(keyword);
        }
    } catch (e) {

    }

    try {
        if (location && typeof location == "string") {
            location = Utils.titleCase(location);
        }
    } catch (e) {

    }

    if (keyword && location) {


    } else if (location) {


    } else if (keyword) {


    }


    return FriendlyJobsP;

}

FriendlyUtils.getJobsPageMetaKeyword = function (params) {


    let {keyword, location, geo} = params;

    if (!keyword && !location) {
        return null;
    }

    let keywords = [
        "JobsBear",
        "Jobs Bear"
    ];


    try {
        if (keyword && typeof keyword == "string") {
            keyword = Utils.titleCase(keyword);
        }
    } catch (e) {

    }

    try {
        if (location && typeof location == "string") {
            location = Utils.titleCase(location);
        }
    } catch (e) {

    }

    try {
        keyword = keyword.replace(new RegExp(",", "igm"), " ").replace(/  +/g, ' ');
    } catch (e) {

    }

    try {
        location = location.replace(new RegExp(",", "igm"), " ").replace(/  +/g, ' ');
    } catch (e) {

    }

    if (geo && geo.length == 2) {
        geo = geo.toUpperCase();
    }

    if (keyword && location) {


        //cashier jobs in new yourk
        //hiring cashier jobs near new york

        let keywordLocationArr = [
            "Jobs in XXlocationXX",
            "XXkeywordXX jobs in XXlocationXX",
            "hiring XXkeywordXX jobs in XXlocationXX",
            "XXkeywordXX jobs near me",
        ]

        keywordLocationArr.forEach(function (item) {

            try {
                item = item.replace(new RegExp("XXkeywordXX", "igm"), keyword).replace(new RegExp("XXlocationXX", "igm"), location).replace(/  +/g, ' ').trim();
            } catch (e) {
                return
            }
            keywords.unshift(item)
        })

    } else if (location) {

        let keywordLocationArr = [
            "Jobs in XXlocationXX",
            "jobs near me",
        ]

        keywordLocationArr.forEach(function (item) {

            try {
                item = item.replace(new RegExp("XXkeywordXX", "igm"), keyword).replace(new RegExp("XXlocationXX", "igm"), location).replace(/  +/g, ' ').trim();
            } catch (e) {
                return
            }
            keywords.unshift(item)
        })

    } else if (keyword) {

        let keywordLocationArr = [
            "XXkeywordXX jobs",
            "XXkeywordXX jobs near me",
        ]

        keywordLocationArr.forEach(function (item) {

            try {
                item = item.replace(new RegExp("XXkeywordXX", "igm"), keyword).replace(new RegExp("XXlocationXX", "igm"), location).replace(/  +/g, ' ').trim();
            } catch (e) {
                return
            }
            keywords.unshift(item)

        })

    }

    const keywordsStr = keywords.join(", ")

    return keywordsStr;

}

module.exports = FriendlyUtils