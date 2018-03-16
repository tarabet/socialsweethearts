var convertToASCII = function (string) {
    var i, strArr = string.split('');
    var asciiStr = "";

    for (i = 0; i < strArr.length; i += 1) {
        asciiStr += strArr[i].charCodeAt(0);
    }

    return asciiStr;
};

var calc = function(data) {
    var dataPropsArr = Object.keys(data);
    var dataValString = "";
    var i;

    for (i = 0; i < dataPropsArr.length; i += 1) {
        dataValString += (data[dataPropsArr[i]]);
    }

    return Math.floor(Math.log10(parseInt(convertToASCII(dataValString))));
};

var valuesObj = (function() {

    var data = {
        age: null,
        height: null,
        hair: null,
        hairLength: null,
        beard: null,
        body: null,
        eyes: null,
    };

    this.getResult = function() {
        var result = calc(data);
        var elem = document.querySelector("#result-row h2");

        if (elem) {
            elem.innerHTML = result;
        }
    };

    this.set = function(prop, val) {
        try {
            data[prop] = val;
        } catch (err) {
            alert(err);
        }
    };

    return {
        set: this.set,
        getResult: this.getResult
    };
})();

module.exports = { convertToASCII, calc, valuesObj };