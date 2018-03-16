var initSlider = function(rowName, objProperty, min, max) {
    var i, sliderElem;
    var hostValue = document.querySelector("#" + rowName + " .content-value");
    var hostNode = document.querySelector("#" + rowName + " .content-control");

    var menuWrapper = document.createElement("div");
    menuWrapper.classList.add("menu-wrapper");

    sliderElem = document.createElement("input");
    sliderElem.setAttribute("type", "range");
    sliderElem.setAttribute("name", objProperty);
    sliderElem.setAttribute("min", min);
    sliderElem.setAttribute("max", max);
    sliderElem.setAttribute("value", min);
    sliderElem.classList.add("range-slider");

    sliderElem.oninput = function() {
        hostValue.innerHTML = this.value;
        valuesObj.set(objProperty, this.value);
    };

    menuWrapper.appendChild(sliderElem);

    hostValue.innerHTML = min;
    valuesObj.set(objProperty, min);
    hostNode.appendChild(menuWrapper);
};

var initSelect = function(rowName, objProperty, values) {
    var i, menuElem;
    var hostValue = document.querySelector("#" + rowName + " .content-value");
    var hostNode = document.querySelector("#" + rowName + " .content-control");

    var selectElem = document.createElement("select");
    selectElem.classList.add("hair-select");

    for (i = 0; i < values.length; i += 1) {
        menuElem = document.createElement("option");
        menuElem.setAttribute("value", values[i]);
        menuElem.innerHTML = values[i];

        selectElem.appendChild(menuElem);
    }

    selectElem.onchange = (function() {
        hostValue.innerHTML = this.value;
        valuesObj.set(objProperty, this.value);
    });

    hostValue.innerHTML = values[0];
    valuesObj.set(objProperty, values[0]);
    hostNode.appendChild(selectElem);
};

var initMenu = function(rowName, objProperty, values) {
    var i, menuElem;
    var hostValue = document.querySelector("#" + rowName + " .content-value");
    var hostNode = document.querySelector("#" + rowName + " .content-control");

    var menuWrapper = document.createElement("div");
    menuWrapper.classList.add("menu-wrapper");

    for (i = 0; i < values.length; i += 1) {
        menuElem = document.createElement("div");
        menuElem.classList.add("menu-element");
        menuElem.setAttribute("name", values[i]);
        menuElem.innerHTML = values[i];

        menuWrapper.appendChild(menuElem);
    }

    menuWrapper.addEventListener("click", function(e) {
        var value = e.target.getAttribute("name");

        hostValue.innerHTML = value;
        valuesObj.set(objProperty, value);
    });

    hostValue.innerHTML = values[0];
    valuesObj.set(objProperty, values[0]);
    hostNode.appendChild(menuWrapper);
};

var initRadio = function(rowName, objProperty, values) {
    var i, menuElem, menuLabel;
    var hostValue = document.querySelector("#" + rowName + " .content-value");
    var hostNode = document.querySelector("#" + rowName + " .content-control");

    var menuWrapper = document.createElement("div");
    menuWrapper.classList.add("menu-wrapper");

    for (i = 0; i < values.length; i += 1) {
        menuElem = document.createElement("input");
        menuElem.setAttribute("type", "radio");
        menuElem.setAttribute("name", objProperty);
        menuElem.setAttribute("value", values[i]);
        menuElem.classList.add("menu-element");

        menuLabel = document.createElement("span");
        menuLabel.innerHTML = values[i];
        menuLabel.classList.add("radio-label-inline");

        menuWrapper.appendChild(menuElem);
        menuWrapper.appendChild(menuLabel);
    }

    menuWrapper.addEventListener("click", function(e) {
        if (e.target.tagName !== "SPAN") {
            var value = e.target.getAttribute("value");

            hostValue.innerHTML = value;
            valuesObj.set(objProperty, value);

            console.log(valuesObj);
        }
    });

    hostValue.innerHTML = values[0];
    valuesObj.set(objProperty, values[0]);
    hostNode.appendChild(menuWrapper);
};

var init = function () {
    initSlider("age-slider-row", "age", 10, 80);
    initSlider("height-slider-row", "height", 60, 220);
    initSelect("hair-select-row", "hair", ["blond", "brown", "black", "red", "white"]);
    initRadio("eyes-menu-row", "eyes", ["black", "brown", "green", "blue"]);
    initMenu("hair-length-menu-row", "hairLength", ["long", "medium", "short", "skinny"]);
    initMenu("beard-menu-row", "beard", ["long", "medium", "short", "skinny"]);
    initMenu("body-menu-row", "body", ["thin", "normal", "thick"]);
};

module.exports = { initSlider, initSelect };