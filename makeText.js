/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios')
const { MarkovMachine } = require('./markov')
function cat(path) {

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('couldnt read the file', err)
            process.exit(1)
        }
        let nm = new MarkovMachine(data)
        nm.makeText()
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        let nm = new MarkovMachine(resp.data)
        nm.makeText()
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}