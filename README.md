wd-capture
====

Convenience module for capturing some data for a page via [wd](https://npmjs.org/package/wd).

`wd-capture` injects a global `wdCapture()` function to the browser, and whatever the page passes into that callback is sent back to the node.js process.  See the `example/` directory for an example.

`wd-capture` doesn't do any setup or teardown of the `browser` object you pass into it, so you can still use it after the capture has completed (for example if you want to take a screenshot before quitting the browser).

To run locally, grab a `selenium-server-standalone` from <http://selenium-release.storage.googleapis.com/index.html>.  Otherwise go set up a free [SauceLabs](https://saucelabs.com/) account.

Install
====

```
npm install wd-capture
```

License
====

MIT
