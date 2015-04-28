window.utility = window.utility || {};

utility.getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
}
