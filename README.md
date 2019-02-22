# dhis2-app-platform

TODO

-   [x] Working POC
-   [x] Port a simple app (`usage-analytics`) to `app-scripts`/`app-shell`
    -   [x] WORKING!
-   [/] Support app-specific dependencies
    -   [ ] Enable pnp for appShell install (again)
-   [ ] Build app component bundles with WebPack (using SplitChunks for shared code)
    -   [ ] Audit package sizes
-   [ ] Support simple configuration (`d2.config.js` or `.d2rc`)
-   [ ] Support specifying appShell for testing
-   [ ] Support automatic clearing of `.d2/shell` when new version installed (use prepublish script?)
-   [x] Support non-js app includes (images, static files, etc.)
-   [x] Reference React from appShell instead of bundling a second local version
    -   [ ] ReactDOM too
-   [ ] Support bundle analysis
-   [ ] Name bundles based on application name
-   [ ] Support plugin entrypoint
-   [ ] Pass server URL to application component (or provide server context)
-   [x] Support i18n extract/generate/runtime
    -   [ ] Add runtime dependencies (`d2-i18n`, `moment`) to `appShell`
    -   [ ] Set locale in `appShell`
-   [ ] Native jest testing support
-   [ ] Native cypress testing support
-   [ ] Editor integrations
-   [ ] Enable pre-compiled appShell
-   [ ] Auto-install hooks
-   [ ] `d2-app-scripts style apply` ?
-   [ ] `d2-app-scripts deploy`, `d2-app-scripts release`, `d2-app-scripts publish` ?
-   [ ] Do we need a `runtime` peer dependency?
