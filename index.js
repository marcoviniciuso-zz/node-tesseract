'use strict'
const createWorker = require('tesseract.js').createWorker;
const writeIntoClipboard = require('clipboardy').writeSync;
const pdf = require('pdf-parse');
const fs = require('fs');

const worker = createWorker({logger: m => console.log(m)});
var language = process.argv[3] || 'por+eng';
var file = process.argv[2];

const recognizeImage = (file, callback)  => {
    callback(file);
}

const recognizePDF = (file) => {
    console.log("É UM MALDITO PDF");
        
    let fileBuffer = fs.readFileSync(file);
    pdf(fileBuffer).then((data) => {
        console.log(data);
        writeIntoClipboard(data.text)
    });
}
const recognizeFile = async (file) => {    
    console.log(file);
    
    await worker.load();
    await worker.loadLanguage(language);
    await worker.initialize(language);
    const {data: {text}} = await worker.recognize(file);
    console.log(text);
    await worker.terminate();
    writeIntoClipboard(text);    
};

if(file.substr(-4) == ".pdf"){
    recognizePDF(file);
}else{
    recognizeImage(file, recognizeFile);
}