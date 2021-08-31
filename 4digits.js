'use strict';

var digits = (function() {

    var arrayI = toArray('input', 9);
    var arrayO = toArray('output', 9);
    var digits = toArray('digit', 4);
    var gameEnd = document.getElementById('end');
    var gameStart = document.getElementById('start');
    var random = document.getElementById('random');
    var submit = document.getElementById('submit');

    var cover = null;
    var round = 0;
    var timeInMs = 0;

    gameStart.onclick = function() {
        for (var i = 0; i < 9; ++i) {
            arrayI[i].innerText = '';
            arrayO[i].innerText = '';
        }
        cover = toDigits();
        round = 0;
        timeInMs = Date.now();
        enable(random, true);
        enable(submit, true);
        gameEnd.innerText = '';
    };

    random.onclick = function() {
        for (var i = 0; i < 4; ++i) {
            digits[i].selectedIndex = Math.floor(Math.random() * 10);
        }
    };

    submit.onclick = function() {
        var lastNums = [];
        var numOfBulls = 0;
        var numOfCows = 0;
        for (var i = 0; i < 4; ++i) {
            if (cover[i] === digits[i].selectedIndex) {
                ++numOfBulls;
            } else {
                lastNums.push(cover[i]);
            }
        }
        for (var i = 0; i < lastNums.length; ++i) {
            for (var j = 0; j < 4; ++j) {
                if (lastNums[i] === digits[j].selectedIndex) {
                    ++numOfCows;
                    break;
                }
            }
        }
        switch (numOfBulls) {
            case 0:
                switch (numOfCows) {
                    case 0: arrayO[round].innerText = 'none'; break;
                    case 1: arrayO[round].innerText = '1 cow'; break;
                    case 2: arrayO[round].innerText = '2 cows'; break;
                    case 3: arrayO[round].innerText = '3 cows'; break;
                    case 4: arrayO[round].innerText = '4 cows'; break;
                }
                break;
            case 1:
                switch (numOfCows) {
                    case 0: arrayO[round].innerText = '1 bull'; break;
                    case 1: arrayO[round].innerText = '1 bull and 1 cow'; break;
                    case 2: arrayO[round].innerText = '1 bull and 2 cows'; break;
                    case 3: arrayO[round].innerText = '1 bull and 3 cows'; break;
                }
                break;
            case 2:
                switch (numOfCows) {
                    case 0: arrayO[round].innerText = '2 bulls'; break;
                    case 1: arrayO[round].innerText = '2 bulls and 1 cow'; break;
                    case 2: arrayO[round].innerText = '2 bulls and 2 cows'; break;
                }
                break;
            case 3:
                arrayO[round].innerText = '3 bulls';
                break;
            case 4:
                arrayO[round].innerText = '4 bulls';
                break;
        }
        arrayI[round++].innerText = digits[0].value + digits[1].value + digits[2].value + digits[3].value;
        if (numOfBulls === 4) {
            enable(random, false);
            enable(submit, false);
            var deltaTimeInMs = Date.now() - timeInMs;
            gameEnd.innerText = (deltaTimeInMs / 1000).toString() + 's CONGRATULATIONS!';
        } else if (round === 9) {
            enable(random, false);
            enable(submit, false);
            gameEnd.innerText = 'GAME OVER (' + cover.join('') + ')';
        }
    };

    function enable(button, value) {
        if (value) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'disabled');
        }
    }

    function toArray(elementId, length) {
        var list = [];
        var listKey = elementId + '_';
        for (var i = 0; i < length; ++i) {
            list.push(document.getElementById(listKey + i));
        }
        return list;
    }

    function toDigits() {
        var list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var listSize = 4;
        for (var i = 0; i < listSize; ++i) {
            var j = i + Math.floor(Math.random() * (10 - i));
            if (j === i) {
                continue;
            }
            var tmp = list[i];
            list[i] = list[j];
            list[j] = tmp;
        }
        list.length = listSize;
        return list;
    }

    return {
        init: function() { enable(gameStart, true); }
    };
})();
