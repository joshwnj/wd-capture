var wdCapture = require('../main');

var port = 8000;
var server = setupPageServer();
server.listen(port);

createBrowser(onBrowserReady);

function onBrowserReady (err, browser) {
    wdCapture(browser, 'http://localhost:' + port, onRead);

    function onRead (err, res) {
        if (err) {
            console.error('ERR', err);
        }

        if (res) {
            console.log('result', res);
        }

        browser.takeScreenshot(onScreenshotComplete);

        function onScreenshotComplete (err, res) {
            browser.quit();

            if (err) {
                console.error(err);
            }
            else {
                require('fs').writeFile(__dirname + '/ex-1/screenshot.png', res, 'base64', function (err) {
                    if(err) { console.error(err); }
                });
            }

            server.close();
        }
    }
}

function createBrowser (callback) {
    var wd = require('wd');
    var browser = wd.remote({
        hostname: '127.0.0.1',
        port: 4444,
    });

    var caps = {
        browserName: 'chrome'
    };

    browser.init(caps, onInit);

    function onInit () {
        browser.setWindowSize(540, 500, onSizeReady);
    }

    function onSizeReady () {
        var timeout = 5000;
        browser.setAsyncScriptTimeout(timeout, onTimeoutReady);
    }

    function onTimeoutReady () {
        callback(null, browser);
    }
}

function setupPageServer () {
    var http = require('http');
    var fs = require('fs');

    return http.createServer(function (req, res) {
        fs.createReadStream(__dirname + '/ex-1/index.html').pipe(res);
    });
}
