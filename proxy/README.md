# Proxying

## YIFY API proxy

Run these commands (do this in the same directory yify-api.js is downloaded):
`npm install express cors`

`node yify-api.js`

YIFY-API proxy is running on port 3000. It's very simple to modify yify-api to add certificates for your domain, change port, etc (use chatgpt if youre lazy).

## Webtor proxy

Coming soon

Webtor (movie watcher) proxying is possible but not yet completed. It uses Ultraviolet technology for proxying which requires https, so if you want to host a proxy it needs to have SSL certificates (that aren't self signed so requests aren't blocked by modern browsers).