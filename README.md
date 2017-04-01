# CensorRadar
[![GitHub release](https://img.shields.io/github/release/MrLuit/CensorRadar.svg?style=flat-square&colorB=E67233)](https://github.com/MrLuit/CensorRadar/releases) [![license](https://img.shields.io/github/license/MrLuit/CensorRadar.svg?style=flat-square)](https://github.com/MrLuit/CensorRadar/LICENSE.md) ![views](https://img.shields.io/badge/views-1k-brightgreen.svg?style=flat-square) [![contributors](https://img.shields.io/github/contributors/MrLuit/CensorRadar.svg?style=flat-square)](https://github.com/MrLuit/CensorRadar/graphs/contributors)

This repository is the open-source project for a website that scans your local network for any blocked websites.

## How to use

Go to the website and click 'Start scan'. You will see all blocked domains (if there are any). If a website is blocked, you can click the little info icon to find the full path that the client couldn't access. The image is path is helpful for troubleshooting why the request can't reach the server.

## How does it work

Javascript creates a new image with an image on the domain we want to check as source. This will prevent [CORS errors](https://enable-cors.org/) and works without too much trouble for the user. A disadvantage is that some popular domains host images on a different server and therefore it's hard to check if the domain is blocked or the image server of the domain. To solve this we try to request favicon.ico from the primary server and that works in most cases because even in the worst scenario the server would probably still redirect you to the right favicon URL.

## Compatibility

|   Google Chrome    |   Mozilla Firefox  |        Safari      |       Opera        | Internet Explorer | Microsoft Edge |
|:------------------:|:------------------:|:------------------:|:------------------:|:-----------------:|:--------------:|
| :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |       :x:         |      :x:       |


## Libraries

* [jQuery 3.2.0](https://github.com/jquery/jquery/tree/3.2.0)
* [Semantic-UI 2.2.9](https://github.com/Semantic-Org/Semantic-UI/tree/2.2.9)
* [SweetAlert2 6.4.4](https://github.com/limonte/sweetalert2/tree/v6.4.4)
* [Github Corners](https://github.com/tholman/github-corners)

## API

Making an official API on Github Pages is hard because this project is written in Javascript and a simple curl request can't render Javascript. A solution would be to create your own project using the data from this repository. If you make your program fetch data from https://raw.githubusercontent.com/MrLuit/CensorRadar/master/domains.json (we will try to keep this list updated) you can use the data to ping all the websites on the list. Let me know about projects you've created :)

## Contributing

When adding a new domain to domains.json, it must meet the following requirements:
* The website is a popular international website and has an accesible image on the primary domain (not a different CDN server)
* Don't put `http://` or `https://` in the domain and **only** put the path to the image in img without leading `/`
* Make sure the image provided is accessible from not only your computer. A favicon works best but if the server stores favicon on another server and doesn't automatically redirect just use another image URL from the website.
* When using a subdomain like `assets.github.com`, put a `~` before the domain so the parser recognizes it's a subdomain and doesn't put `www.` in front of it
* The hash is SHA1 hash of the content of the image (read the section about [cryptography](https://github.com/MrLuit/CensorRadar#cryptography))

You can then proceed to make a [pull request](https://github.com/MrLuit/CensorRadar/pulls) with all these requirements.

## Report issue

Create an [issue](https://github.com/MrLuit/CensorRadar/issues) with as many details as possible regarding the problem. Useful information could be the image URL, your OS, your browser, your ISP or country, and steps to reproduce the issue.