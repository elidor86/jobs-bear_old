const fs = require('fs');

let keywordCounter = 0;

const main = function () {
    const lineReader = require('readline').createInterface({
        input: fs.createReadStream('us-keywords.csv')
    });

    lineReader.on('line', function (line) {

        line = line.replace(new RegExp(",", "igm"), "").trim();
        line = line.replace(new RegExp("\"", "igm"), "").trim();
        line = line.replace(new RegExp(" jobs", "igm"), "").trim();


        if (line.length <= 1) {
            return;
        }

        let onlyNumReg = /^\d+$/;

        if (onlyNumReg.test(line) == true) {
            return;
        }

        let specialCharactersReg = /[!@#$%^&*(),?":{}|<>]/g;

        /*if (specialCharactersReg.test(line) == true) {

        }*/

        let nonEnglishCharactersReg = /[^\x00-\x7FâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+/g;

        if (nonEnglishCharactersReg.test(line) == true) {
            return;
        }

        //line = "\"" + line + " jobs\"";
        let tmpLineArr = line.split(" ");
        let lineJobs = "+" + tmpLineArr.join(" +") + " +jobs";

        console.log('q ', lineJobs);
        keywordCounter++;

        fs.appendFileSync("10KeywordsReady.txt", lineJobs + "\n");

    });

    lineReader.on('close', function (line) {

        console.log('keywordCounter :', keywordCounter);

    });


};


main();