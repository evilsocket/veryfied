Veryfied is a browser extension for Twitter that will mark pre-Musk era verified accounts using the database fetched from the friends list of [@verified](https://twitter.com/verified) (updated on November 5, 2022).

No need to pay 8$.

For now you can install the browser extension from the `ext` folder.

For Chrome/Chromium:

* Navigate to `chrome://extensions`.
* Expand the `Developer` dropdown menu and click `Load Unpacked Extension`.
* Navigate to the local `ext` folder containing the extension’s code and click Ok.
* Assuming there are no errors, the extension should load into your browser.

For Firefox:

* Firefox doens't support manifests v3, so first thing, edit `ext/manifest.json` and set `manifest_version` to `2`.
* Open the `about:debugging` page.
* Click the `This Firefox` option.
* Click the `Load Temporary Add-on` button, then select any file in the `ext` extension's directory.