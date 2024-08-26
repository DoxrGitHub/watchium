# watchium
Ad-less, *STATIC*, pirated-movie client.

## Hosting

Copy the webapp directory (or make webapp the root directory when hosting), and host with any static hosting (Glitch, Render, Cloudflare Pages are good)

Or, use the main Cloudflare Pages site to try this out: 

https://watchium.pages.dev/

> <small>Important: the site NEEDS HTTPS! Otherwise the site won't work without manual reconfiguation (changing default APIs to http) and any Webtor proxy will NOT WORK AT ALL!</small>

## Note

People hosting the webpage and/or proxies: 

You probably won't get in legal trouble anywhere, if you're hosting this, as all content is in YIFY's servers.

People using:

You don't really need a VPN, even if you're using the default Webtor and YIFY (https://yts[dot]mx) servers. If you're still concerned you can host your own Webtor and YIFY proxy (see `/proxy/` in this repo) and use it with Watchium. That way there is really no way your ISP will know. While the YIFY proxy by itself will take up barely any network data at all, setting up a Webtor proxy may rack up data costs.

DMCA:

Don't send a DMCA takedown request to the people hosting Watchium, do that at https://yts[dot]mx/dmca instead. Watchium will reflect the changes since movie content and everything is from YTS.

I am not responsible for anything you, or anyone else, does with Watchium. Use this at your own risk.

<small>there is probably no risk is most cases</small>

---

[Ultraviolet 2.0](https://github.com/titaniumnetwork-dev/Ultraviolet) will be used for Webtor proxying, and you will need to [host a bare server](https://github.com/DoxrGitHub/simple-bare) for the Webtor proxy. The YTS API proxy I made can be found in /proxy/ in this repo.