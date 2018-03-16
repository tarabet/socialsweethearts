const assert = require('assert');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { convertToASCII, calc } = require("./logic");

const initSlider = require("./dom").initSlider;
const initSelect = require("./dom").initSelect;

describe('Testing app for Socialsweethearts test assignment', function() {
    describe('Testing calculation logic', function() {
        it('convertToASCII should return string', function() {
            assert.equal(typeof convertToASCII("a"), "string");
        });

        it('convertToASCII should return string ASCII codes', function() {
            var testStr = "123";

            assert.equal(convertToASCII(testStr), 495051);
        });

        it('calc should return number', function() {
            var data = {
                prop: 2
            };

            assert.equal(typeof calc(data), "number");
        });
    });

    describe('DOM init elements testing', function() {
        let domTree = `<!DOCTYPE html>
                        <html lang="en">
                        <body>
                            <div class="content">
                                <div class="container">
                                    <div class="row" id="test-row">
                                        <div class="column-1">
                                            <div class="content-name">
                                                <h2>Age</h2>
                                            </div>
                                        </div>
                                        <div class="column-2">
                                            <div id= "age-value" class="content-value"></div>
                                        </div>
                                        <div class="column-3">
                                            <div class="content-control"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>`;

        beforeEach(() => {
            let jsdom = new JSDOM(domTree);

            valuesObj = {
                set: () => {},
            };

            document = jsdom.window.document;
        });

        it('initSlider should have minimum 10 value in content-value element', function() {
            initSlider("test-row", "age", 10, 80);

            let contentValue = document.querySelector("#test-row .content-value");
            let contentControl = document.querySelector("#test-row .content-control");

            assert.equal(contentValue.innerHTML, 10);
        });

        it('initSlider should create input element in #test-row node', function() {
            initSlider("test-row", "age", 10, 80);

            let contentControl = document.querySelector("#test-row .content-control").firstChild;

            assert.equal(contentControl.firstChild.nodeName, "INPUT");
        });

        it('initSlider should create input element with type range', function() {
            initSlider("test-row", "age", 10, 80);

            let contentControl = document.querySelector("#test-row .content-control").firstChild;

            assert.equal(contentControl.firstChild.getAttribute("type"), "range");
        });

        it('initSelect should create select element in #test-row node', function() {
            initSelect("test-row", "hair", ["a"]);

            let contentControl = document.querySelector("#test-row .content-control");

            assert.equal(contentControl.firstChild.nodeName, "SELECT");
        });

        it('initSelect should create select element with option element inside', function() {
            initSelect("test-row", "hair", ["a"]);

            let contentControl = document.querySelector("#test-row .content-control").firstChild;

            assert.equal(contentControl.firstChild.nodeName, "OPTION");
        });
    });
});