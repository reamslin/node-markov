const { MarkovMachine } = require('./markov');
let nm;
beforeAll(function () {
    nm = new MarkovMachine(`the cat in the hat
    `);
})

describe('Testing markov chain', function () {

    test('each word should be in the chain', function () {
        for (let word of nm.words) {
            expect(nm.chain).toHaveProperty(word)
        }
    })

    test('each word should have a next-word array', function () {
        for (let word of nm.words) {
            expect(nm.chain[word]).toEqual(expect.any(Array))
        }
    })
})

describe('Testing makeText', function () {
    beforeAll(function () {
        let textArray = nm.makeText().split(/[ \r\n]+/);
        textArray.filter(c => c !== "");
    })
    test('the makeText should only contain words from the source text', function () {
        for (let word of textArray) {
            expect(nm.words).toContain(word)
        }
    })
})

