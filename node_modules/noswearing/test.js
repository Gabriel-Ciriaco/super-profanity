var check = require("./index.js");
console.log(check("speak"))
/*
var testData = JSON.parse(require("fs").readFileSync("testdata.json", "utf8"))
var results = [];
testData.forEach((dt, i) => {

    var result = check(dt.tweet);
    results.push({
        m: dt.tweet,
        c: dt.class,
        r: result,
    })
    if (i % 2000 == 0) console.log(i)
});
require("fs").writeFileSync("testout.json", JSON.stringify(results, null, 4))
*/