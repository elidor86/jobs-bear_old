import fetch from "isomorphic-fetch";

const JOB_ENDPOINT = "https://us-central1-better-roi.cloudfunctions.net/single-job";

export default function fetchJobById(jobId, jobFeed, jobTitle) {


    jobId = encodeURIComponent(jobId);
    jobFeed = encodeURIComponent(jobFeed);

    try {
        jobTitle = encodeURIComponent(jobTitle);
    } catch (e) {
        jobTitle = "";
    }


    let url = `${JOB_ENDPOINT}?job_id=${jobId}&job_feed=${jobFeed}&job-title=${jobTitle || ""}`;

    //console.log("fetchJobById ", jobId, jobFeed, jobTitle);

    //console.log("fetchJobById ", url);

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        });

}
