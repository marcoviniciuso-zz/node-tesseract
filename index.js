'use strict'
const createWorker = require('tesseract.js').createWorker;
const writeIntoClipboard = require('clipboardy').writeSync;

const worker = createWorker({logger: m => console.log(m)});
var language = process.argv[3] || 'por+eng';
const recognizeFile = async () => {
    await worker.load();
    await worker.loadLanguage(language);
    await worker.initialize(language);
    const {data: {text}} = await worker.recognize(process.argv[2]);
    console.log(text);
    await worker.terminate();
    writeIntoClipboard(text);    
};

console.log(process.argv[2]);

recognizeFile();