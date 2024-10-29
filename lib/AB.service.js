const libService = require('./lib.service');

module.exports = {
    setAB, createVersion,
};

function setAB(session, useragent, url, query) {
    try {

        let AB = {};

        if ('AB' in session === true) {
            AB = session.AB;
        } else {

            let SearchEngineV = {
                us: ['default'], gb: ['default', "V2"], ca: ['default'], za: ['default']
            };

            let SerpDtlVersion = {
                us: ["defaultV1"],
                gb: ['default'],
                ca: ['default'],
                za: ['default']
            };

            let FlowVersions = ['none'];
            let FirstPageFetchJobsTO = [2000, 700, 1100];
            let popUnderOnEmailCloseVersions = ['none'];
            let SemiTransparentJobClickVersions = ['none', "on"];
            let EmailCheckBox = ['none'];
            let GoogleGeocode = ['off', "on"];
            let JobCardLogo = ['off', "on"];
            let JobSearchCaching = ['off', "on"];
            let JobSearchApiCaching = ['off', "on"];
            let SerpVersion = ['none'];
            let MyJobQuoteVersion = ['v1', "v2", "v3", "v4", "v5"];
            let TJ_IB = ["JobType", "Distance", "offV1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8"];
            //let Monster_IB = ["Monster_IB_v1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8"];
            let NaturalIntelligence_IB = ["offV1"];
            let Monster_IB = ["offV1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8"];
            //let FlexJobs_IB = ["FlexJobs_IB_v1", "offV1"];
            let FlexJobs_IB = ["offV1"];
            let Bark_IB = ["Bark_IB_v1", "offV1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV9", "offV10", "offV11", "offV12", "offV13", "offV14", "offV15"];
            let ShowSmsModal = ["off"];
            let FirstSerpCardBorder = [true, false];
            let DirectReedOnly = ["on", "offV1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8"];
            let Email_Zip = ["on"];
            let VideoCard = ["offV1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8"];
            let show_sms_modal_on_job_click = ["offV1", "offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8"];
            let search_engine_version = ["offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8", "offV9", "offV10", "offV11", "offV12"];
            let show_benefits = ["onV2"];
            let use_expanded_keywords = ["on", "off"];
            let dtl_campaigns = ["offV2", "offV3", "offV4", "offV5", "offV6", "offV7", "offV8", "offV9", "offV10", "offV11", "offV12", "offV13", "offV14", "offV15", "offV16"];
            let Jobget_App_Install = ["on", "offV1", "offV2", "offV3", "offV4"];
            let Location_Source = ["locpysical", "FriendlyUrl"];
            let Keyword_Smart_Expansion = ["on", "offV1"];
            let seen_jobs_tsn = ["on", "off"];
            let global_prediction = ["on", "off"];
            let similar_to_job = ["on", "off"];


            try {
                if (typeof session.keyword_data != "object") {
                    Keyword_Smart_Expansion.splice(0, 1);
                }
            } catch (e) {

            }

            let TjLinkVersion = ["defaultV1", "defaultV2", "MobileLink",];

            try {
                if (query.geo == "gb" || query.geo == "ca") {
                    SerpVersion = ['none'];
                } else if (query.geo == "us") {
                    SerpVersion = ['amazon'];
                }
            } catch (e) {

            }


            if (useragent && useragent.isEdge == true) {

                if (query.botName == "bing") {
                    // popUnderOnEmailCloseVersions = ['none', "nextcareernow"];
                }

            }

            try {
                if (query.geo == "gb" && typeof session.keyword_data == "object" && session.keyword_data.metadata_v3) {
                    search_engine_version.push("v3");
                }
            } catch (e) {

            }


            AB.show_benefits = show_benefits[libService.getRandomIntInclusive(0, show_benefits.length - 1)];
            AB.use_expanded_keywords = use_expanded_keywords[libService.getRandomIntInclusive(0, use_expanded_keywords.length - 1)];
            AB.FlowVersion = FlowVersions[libService.getRandomIntInclusive(0, FlowVersions.length - 1)];
            AB.popUnderOnEmailCloseVersion = popUnderOnEmailCloseVersions[libService.getRandomIntInclusive(0, popUnderOnEmailCloseVersions.length - 1)];
            AB.SemiTransparentJobClickVersions = SemiTransparentJobClickVersions[libService.getRandomIntInclusive(0, SemiTransparentJobClickVersions.length - 1)];
            AB.FirstSerpCardBorder = FirstSerpCardBorder[libService.getRandomIntInclusive(0, FirstSerpCardBorder.length - 1)];
            AB.SerpVersion = SerpVersion[libService.getRandomIntInclusive(0, SerpVersion.length - 1)];
            AB.GoogleGeocode = GoogleGeocode[libService.getRandomIntInclusive(0, GoogleGeocode.length - 1)];
            AB.FirstPageFetchJobsTO = FirstPageFetchJobsTO[libService.getRandomIntInclusive(0, FirstPageFetchJobsTO.length - 1)];
            AB.JobSearchApiCaching = JobSearchApiCaching[libService.getRandomIntInclusive(0, JobSearchApiCaching.length - 1)];
            AB.EmailCheckBox = EmailCheckBox[libService.getRandomIntInclusive(0, EmailCheckBox.length - 1)];
            AB.DirectReedOnly = DirectReedOnly[libService.getRandomIntInclusive(0, DirectReedOnly.length - 1)];
            AB.TjLinkVersion = TjLinkVersion[libService.getRandomIntInclusive(0, TjLinkVersion.length - 1)];
            AB.MyJobQuoteVersion = MyJobQuoteVersion[libService.getRandomIntInclusive(0, MyJobQuoteVersion.length - 1)];
            AB.JobCardLogo = JobCardLogo[libService.getRandomIntInclusive(0, JobCardLogo.length - 1)];
            AB.VideoCard = VideoCard[libService.getRandomIntInclusive(0, VideoCard.length - 1)];
            AB.TJ_IB = TJ_IB[libService.getRandomIntInclusive(0, TJ_IB.length - 1)];
            AB.Monster_IB = Monster_IB[libService.getRandomIntInclusive(0, Monster_IB.length - 1)];
            AB.NaturalIntelligence_IB = NaturalIntelligence_IB[libService.getRandomIntInclusive(0, NaturalIntelligence_IB.length - 1)];
            AB.Location_Source = Location_Source[libService.getRandomIntInclusive(0, Location_Source.length - 1)];
            AB.FlexJobs_IB = FlexJobs_IB[libService.getRandomIntInclusive(0, FlexJobs_IB.length - 1)];
            AB.Bark_IB = Bark_IB[libService.getRandomIntInclusive(0, Bark_IB.length - 1)];
            AB.Jobget_App_Install = Jobget_App_Install[libService.getRandomIntInclusive(0, Jobget_App_Install.length - 1)];
            AB.Email_Zip = Email_Zip[libService.getRandomIntInclusive(0, Email_Zip.length - 1)];
            AB.Keyword_Smart_Expansion = Keyword_Smart_Expansion[libService.getRandomIntInclusive(0, Keyword_Smart_Expansion.length - 1)];
            AB.search_engine_version = search_engine_version[libService.getRandomIntInclusive(0, search_engine_version.length - 1)];
            AB.dtl_campaigns = dtl_campaigns[libService.getRandomIntInclusive(0, dtl_campaigns.length - 1)];
            AB.seen_jobs_tsn = seen_jobs_tsn[libService.getRandomIntInclusive(0, seen_jobs_tsn.length - 1)];
            AB.global_prediction = global_prediction[libService.getRandomIntInclusive(0, global_prediction.length - 1)];
            AB.similar_to_job = similar_to_job[libService.getRandomIntInclusive(0, similar_to_job.length - 1)];
            AB.show_sms_modal_on_job_click = show_sms_modal_on_job_click[libService.getRandomIntInclusive(0, show_sms_modal_on_job_click.length - 1)];


            let geo = session.geo || "us";

            try {
                AB.JobSearchEngineV = SearchEngineV[geo][libService.getRandomIntInclusive(0, SearchEngineV[geo].length - 1)];
            } catch (e) {
                AB.JobSearchEngineV = "default";
            }

            try {
                AB.SerpDtlVersion = SerpDtlVersion[geo][libService.getRandomIntInclusive(0, SerpDtlVersion[geo].length - 1)];
            } catch (e) {
                AB.SerpDtlVersion = "default";
            }


            try {
                AB.JobSearchCaching = "off";
                let rndNum = libService.getRandomIntInclusive(0, 100);
                if (rndNum < 50) {

                }
                AB.JobSearchCaching = "on";
            } catch (e) {

            }

            try {
                AB.ShowSmsModal = "off";
                let rndNum = libService.getRandomIntInclusive(0, 100);
                if (rndNum < 50) {
                }

                AB.ShowSmsModal = "on";
            } catch (e) {

            }

            try {
                AB.SearchEngineV = "v2";
            } catch (e) {

            }

            //console.log("seesion", session);

            try {

                AB.RequireSms = "off";

                if (session.geo == "us") {
                    AB.RequireSms = "on";
                }

            } catch (e) {

            }


        }


        try {
            for (let key in AB) {
                if (key in query) {
                    AB[key] = query[key];
                }
            }
        } catch (e) {

        }

        return AB;
    } catch (err) {
    }
}

function createVersion(versions) {
    try {
        const {textVersion, emailOptinVersion, stockNotifyVersion} = versions;
        const versionData = ABVersions[textVersion];

        let emailOptin, siteText, stockNotify;

        siteText = versionData.siteText;

        emailOptin = {
            v: emailOptinVersion, ...versionData.emailOptins[emailOptinVersion],
        };

        stockNotify = {
            v: stockNotifyVersion, ...versionData.stockNotifications[stockNotifyVersion],
        };

        return {
            siteText, emailOptin, stockNotify,
        };
    } catch (err) {
        console.log('Error while creating AB version.', err);
    }
}

function getOfferInPageVersions(geo) {
    try {
        const eiVersionsUS = ['banggood1', 'banggoodConfettiAnim', 'banggoodConfettiImg', 'personalStyle1', 'personalStyle2', 'romantic1', 'flowers1', 'flowers2', 'flowers3', 'flashlight1', 'flashlight2', 'zerbit', 'instacart', 'category',];
        const eiVersionsGB = ['banggood1', 'banggoodConfettiAnim', 'banggoodConfettiImg', 'amazon1', 'amazon2', 'amazon3', 'category',];

        if (geo) {
            if (geo === 'us') {
                return eiVersionsUS;
            } else if (geo === 'gb') {
                return eiVersionsGB;
            }
        } else return eiVersionsUS;
    } catch (err) {
    }
}
