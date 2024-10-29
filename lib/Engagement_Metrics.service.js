const MAX_BULK_SIZE = 5;
//const API_URL = 'http://localhost:8080?test=true';
const API_URL = 'https://engagement-metrics-dpzmkkxlza-uc.a.run.app';
const FLUSH_INTERVAL = 300;

class EngagementMetricsClass {
    constructor() {
        this.dataQueue = [];
        this.flushTimer = null;
    }

    startFlushTimer() {
        if (this.flushTimer) {
            clearTimeout(this.flushTimer);
        }
        this.flushTimer = setTimeout(() => this.flushQueue(), FLUSH_INTERVAL);
    }

    flushQueue() {
        if (this.dataQueue.length > 0) {
            this.sendBulkData(this.dataQueue);
            this.dataQueue = [];
        }
        this.startFlushTimer();
    }

    async sendBulkData(data) {

        try {
            window.ClientVars.keyword = MainApp.getKeyword();
        } catch (e) {

        }

        try {

            let body = {
                "metrics": data,
                ClientVars: window.ClientVars || {}
            }

            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });


        } catch (error) {
            console.error('Error:', error);
        }
    }

    checkAndSendBulk() {
        if (this.dataQueue.length >= MAX_BULK_SIZE) {
            const dataToSend = this.dataQueue.splice(0, MAX_BULK_SIZE);
            this.sendBulkData(dataToSend);
        }
    }

    isValidData(data) {
        let is_valid = true;

        try {
            if (ClientVars.googleGeo != ClientVars.geo) {
                is_valid = false;
            }
        } catch (e) {

        }


        return is_valid;
    }

    transformData(data) {
        let transformedData = JSON.parse(JSON.stringify(data));


        try {
            delete transformedData.item.body;
        } catch (e) {

        }

        try {
            delete transformedData.item.original_body;
        } catch (e) {

        }

        transformedData.URL = location.href;

        return transformedData;
    }

    addToQueue(data) {


        let isValid = this.isValidData(data);

        if (isValid == true) {
            let final_data = this.transformData(data);
            this.dataQueue.push(final_data);
            this.checkAndSendBulk();
            this.startFlushTimer();

            try {
                if (data && data.name == "click" || data && data.name == "card_click" || data && data.name == "loaded") {
                    this.flushQueue();
                }
            } catch (e) {

            }

        } else {
            //  console.error('Invalid data:', data);
        }

    }
}

const EngagementMetrics = new EngagementMetricsClass();
export default EngagementMetrics;