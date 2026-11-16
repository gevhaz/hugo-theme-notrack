+++
author = "Hugo Authors"
title = "Rich Content"
date = "2019-03-10"
description = "A brief description of Hugo Shortcodes"
tags = [
    "shortcodes",
    "privacy",
]

# Lets this page load the video player and the preview image below, which
# the theme otherwise refuses since they come from other sites.
[params.csp]
frame-src = ["https://www.youtube.com"]
img-src = ["https://i.vimeocdn.com"]
+++

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) for rich content, along with a Privacy Configuration and a set of Simple Shortcodes that enable static and JavaScript free versions of various social media embeds.
<!--more-->
---

## YouTube Privacy Enhanced Shortcode

{{< youtube ZJthWmvUzzc >}}

<br>

---

{{< vimeo_simple 48912912 >}}
