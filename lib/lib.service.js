module.exports = {
    getRandomIntInclusive,
    getCapitalizedKeywords,
    isElementXPercentInViewport,
    shuffleArray,
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getCapitalizedKeywords(str) {
    try {
        if (str === '') return '';
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word[0].toUpperCase() + word.substr(1))
            .join(' ');
    } catch (err) {}
}

function isElementXPercentInViewport(el, percentVisible) {
    let rect = el.getBoundingClientRect(),
        windowHeight = window.innerHeight || document.documentElement.clientHeight;

    return !(
        Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) < percentVisible ||
        Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    );
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
