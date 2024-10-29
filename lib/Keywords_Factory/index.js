const fs = require('fs');
const path = require('path');
const axios = require('axios');

class Keywords_Factory {
    constructor() {
        try {
            this.Keyword_Map = {};
            this.keywords = JSON.parse(fs.readFileSync(path.join(__dirname, 'keywords_data.json'), 'utf-8'));
            this.normalizeKeywords();
            this.createKeywordMap();
        } catch (error) {
            console.error('Error initializing Keywords_Factory:', error);
            this.keywords = [];
        }
    }

    normalizeKeywords() {

        for (let index in this.keywords) {

            if (this.keywords[index].keyword) {
                const keyword = this.keywords[index].keyword.trim().toLowerCase();
                this.Keyword_Map[keyword] = this.keywords[index];
            }

        }

    }

    createKeywordMap() {
        this.keywordMap = new Map();
        this.keywords.forEach(kw => {
            this.keywordMap.set(kw.keyword, kw);
        });
    }

    async get_keyword_data_from_api({keyword, geo, origin = "job_board_client", responseType}) {

        const endpoint = 'https://botson-jobs-api.web.app/API';

        const queryParams = {
            API_NAME: 'keywords',
            keyword: keyword,
            responseType: responseType,
            geo: geo,
            origin: origin
        };

        try {

            const response = await axios.get(endpoint, {
                params: queryParams,
                timeout: 300
            });

            const data = response.data;

            if (data.status === 200 && data.data) {
                return data.data;
            } else {
                //console.error('Error:', data.message);
                return null;
            }

        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                //console.error('Request timed out');
            } else {
                // console.error('Error:', error.message);
            }
            return null;
        }

    }

    get_keyword_data(keyword = "default", geo = "", responseType = "") {
        try {
            if (!keyword || keyword.length === 0) {
                keyword = "default";
            }

            const normalizedKeyword = keyword.trim().toLowerCase();
            let keywordDataFromApi = null;

            // // Try to get keyword data from the API
            // const keywordDataFromApi = await this.get_keyword_data_from_api({
            //     keyword: normalizedKeyword,
            //     origin: "job_board_client",
            //     geo,
            //     responseType
            // });

            if (keywordDataFromApi) {
                // If data is successfully retrieved from the API, return it
                return keywordDataFromApi;
            } else {
                // If API request fails or returns null, fallback to local Keyword_Map
                const keywordData = this.Keyword_Map[normalizedKeyword];

                if (keywordData) {
                    // Remove unnecessary properties
                    delete keywordData.llmProvider;
                    delete keywordData._id;
                    delete keywordData.avgCTR;
                    delete keywordData.avgClicks;
                    delete keywordData.avgPriceUsdCount;
                    delete keywordData.avgRevenue;
                    delete keywordData.totalClicks;
                    delete keywordData.totalImpressions;
                    delete keywordData.totalPriceUsdCount;
                    delete keywordData.totalRevenue;

                    return keywordData;
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.error('Error in get_keyword_data:', error);
            return null;
        }
    }

    get_keywords() {
        try {
            return this.keywords;
        } catch (error) {
            console.error('Error in get_keywords:', error);
            return [];
        }
    }

    get_keywords_by_industry(industry) {
        try {
            const normalizedIndustry = industry.trim().toLowerCase();
            return this.keywords.filter(kw => kw.metadata.industry === normalizedIndustry);
        } catch (error) {
            console.error('Error in get_keywords_by_industry:', error);
            return [];
        }
    }

    get_keywords_by_group(group) {
        try {
            const normalizedGroup = group.trim().toLowerCase();
            return this.keywords.filter(kw => kw.job_titles.some(job => job.group_by === normalizedGroup));
        } catch (error) {
            console.error('Error in get_keywords_by_group:', error);
            return [];
        }
    }

    get_keywords_by_title(title) {
        try {
            const normalizedTitle = title.trim().toLowerCase();
            return this.keywords.filter(kw => kw.job_titles.some(job => job.title === normalizedTitle));
        } catch (error) {
            console.error('Error in get_keywords_by_title:', error);
            return [];
        }
    }

    get_keywords_by_relevance(relevance) {
        try {
            return this.keywords.filter(kw => kw.job_titles.some(job => job.relevance === relevance));
        } catch (error) {
            console.error('Error in get_keywords_by_relevance:', error);
            return [];
        }
    }

    get_keywords_by_group_and_relevance(group, relevance) {
        try {
            const normalizedGroup = group.trim().toLowerCase();
            return this.keywords.filter(kw => kw.job_titles.some(job => job.group_by === normalizedGroup && job.relevance === relevance));
        } catch (error) {
            console.error('Error in get_keywords_by_group_and_relevance:', error);
            return [];
        }
    }

    get_keywords_by_title_and_relevance(title, relevance) {
        try {
            const normalizedTitle = title.trim().toLowerCase();
            return this.keywords.filter(kw => kw.job_titles.some(job => job.title === normalizedTitle && job.relevance === relevance));
        } catch (error) {
            console.error('Error in get_keywords_by_title_and_relevance:', error);
            return [];
        }
    }

    get_keywords_by_group_and_title(group, title) {
        try {
            const normalizedGroup = group.trim().toLowerCase();
            const normalizedTitle = title.trim().toLowerCase();
            return this.keywords.filter(kw => kw.job_titles.some(job => job.group_by === normalizedGroup && job.title === normalizedTitle));
        } catch (error) {
            console.error('Error in get_keywords_by_group_and_title:', error);
            return [];
        }
    }

    get_keywords_by_group_and_title_and_relevance(group, title, relevance) {
        try {
            const normalizedGroup = group.trim().toLowerCase();
            const normalizedTitle = title.trim().toLowerCase();
            return this.keywords.filter(kw => kw.job_titles.some(job => job.group_by === normalizedGroup && job.title === normalizedTitle && job.relevance === relevance));
        } catch (error) {
            console.error('Error in get_keywords_by_group_and_title_and_relevance:', error);
            return [];
        }
    }
}

module.exports = new Keywords_Factory();