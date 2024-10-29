const fs = require('fs');

let keywordCounter = 0;

let fileName = './helpers/lists/broad-ca.txt';
let fileNameOutput = 'broad-ca.csv';

const main = function () {

    const lineReader = require('readline').createInterface({
        input: fs.createReadStream(fileName)
    });

    lineReader.on('line', function (line) {


        if (line.length <= 1 || line.split(" ").length >= 7) {
            return;
        }

        let onlyNumReg = /^\d+$/;

        if (onlyNumReg.test(line) == true) {
            return;
        }

        let specialCharactersReg = /[^\da-zA-Z #$&_"+./:\-\[\]\']/g;

        if (specialCharactersReg.test(line) == true) {
            //console.log('specialCharactersReg  specialCharactersReg', line);
            return;
        }

        if (line.search("'") > -1 || line.search(/(prescription|plan b|pharmacie|botox|drug\b|farmacia|pharmacie|frontline|dermatology|med aid|medication|under|\byear|\bteen|ppe|mask fitting)/igm) > -1) {
            //console.log('specialCharactersReg ', line);
            return;
        }

        line = line.replace(new RegExp("-", "igm"), " ");
        line = line.replace(new RegExp(",", "igm"), " ").replace(/\s{2,}/g, ' ');

        let lineJobs1 = line + " jobs";

        //console.log('lineJobs1 ', lineJobs1);
        //console.log('lineJobs2 ', lineJobs2);
        keywordCounter++;

        fs.appendFileSync(fileNameOutput, lineJobs1 + "\n");

    });

    lineReader.on('close', function (line) {

        console.log('keywordCounter :', keywordCounter);

    });


};


main();