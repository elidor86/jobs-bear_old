const elasticsearch = require('elasticsearch');

const Elasticsearch = {};

Elasticsearch.EsBotsonClient = new elasticsearch.Client({
    host: "https://es.better-roi.com:9200",
    maxRetries: 20,
    pingTimeout: 60000,
    httpAuth: "elastic:sgr6c5lqbf279w7tztml5bnt"
});

Elasticsearch.EsDotClient = new elasticsearch.Client({
    host: "https://e48b81a4a1f64fc389f0c0eeddc8d284.us-central1.gcp.cloud.es.io:9243",
    httpAuth: "elastic:bpZMByN83wEx0tJ6jxZla3E9",
    pingTimeout: 1000
});

module.exports = Elasticsearch;