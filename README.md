# CensorRadar

[![license](https://img.shields.io/github/license/MrLuit/CensorRadar.svg?style=flat-square)](https://github.com/MrLuit/CensorRadar/LICENSE.md) [![GitHub release](https://img.shields.io/github/release/MrLuit/CensorRadar.svg?style=flat-square&colorB=E67233)](https://github.com/MrLuit/CensorRadar/releases) [![downloads](https://img.shields.io/github/downloads/MrLuit/CensorRadar/total.svg?style=flat-square)](https://github.com/MrLuit/CensorRadar/graphs/traffic) [![contributors](https://img.shields.io/github/contributors/MrLuit/CensorRadar.svg?style=flat-square)](https://github.com/MrLuit/CensorRadar/graphs/contributors)

This repository is the open-source project for a website that scans your local network for any blocked websites.

# How to use

Go to the website and click 'Start scan'. You will see all blocked domains (if there are any).

# How does it work

Javascript creates a new image with an image on the domain we want to check as source. This will prevent [CORS errors](https://enable-cors.org/) and works without too much trouble for the user. A disadvantage is that most popular domains host images on a different server and therefore it's hard to check if the domain is blocked or the image server of the domain.

# Libraries

- (jQuery 3.2.0)[https://github.com/jquery/jquery/tree/3.2.0]
- (Semantic-UI 2.2.9)[https://github.com/Semantic-Org/Semantic-UI/tree/2.2.9]
- (SweetAlert2 6.4.4)[https://github.com/limonte/sweetalert2/tree/v6.4.4]

# Contributing

When adding a new domain to domains.json, it must meet the following requirements:
- The domain must be a popular domain and must get traffic from all around the world (no country-specific domains)
- The title should be a simple title that matches the website
- The domain must not be already present in domains.json
- Make sure that domains.json is correctly alphabetically sorted
- Make sure the image provided is accessible from not only your computer
- When using a subdomain like 'assets.github.com', put a ~ before the domain so the parser recognizes it's a subdomain and doesn't put www. in front of it

# Report issue

Create an [issue](https://github.com/MrLuit/CensorRadar/issues) or a [pull request](https://github.com/MrLuit/CensorRadar/pulls).
