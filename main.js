/**
 * @param browser A pre-initialized browser object returned by `wd.remote`.
 * @param url URL string of the page to load.
 * @param callback Callback function receiving results from the page.
 */
module.exports = function (browser, url, callback) {
    browser.get(url, onPageLoaded);

    function onPageLoaded () {
        browser.executeAsync(createCode(), callback);
    }
};

/**
 * Create the js to inject into the page
 */
function createCode () {
    var func = function () {
        // inject the callback into the page
        window.wdCapture = arguments[ arguments.length - 1 ];
    };

    func = func.toString();
    func = 'return (' + func + ').apply(null, arguments);';

    return func;
}

