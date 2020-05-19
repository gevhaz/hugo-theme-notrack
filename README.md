# Creating a home page

The first thing you will want to do is set up the home page of the 
website. Create `/content/_index.md`. This could contain a short 
introduction of what is on the website or of you. A shortcode that can 
be useful here is `figure`, which adds an image with a frame. Example 
usage:

```
{{< figure class="profile-picture" src="/img/profile-picture.jpg" 
alt="Picture of me" >}}
```

There is also a raw html shortcode called `rawhtml` which you can use if 
you don't like the frame.

At this point you should also set the title for the web site, your name 
and the text in the header, if you want it to be different from your 
name. Example entries in `config.yaml`:

```
title: "My New Hugo Site"
params:
  AuthorName: "John Doe"
  headerTitle: "a header title"
```

If you want to show the latest posts from your blog at the bottom of the 
home page, set `showBlogLatest` to true in your site config. You may 
also want to change the number of posts shown (default: 3) and the 
heading above it (default "Latest from the blog") In config.yaml, it 
would look like this:

```
params:
  showBlogLatest: true
  blogLatestHeading: "The latests posts"
  nBlogLatest: 6
```

# How to make a blog

1.  Add some posts with e.g. `hugo new blog/post-1.md` etc.

2.  Create the menus in your site `config`, as follows:

     ```
     menu:
      navbar:
      - identifier: "blog"
        name: "Blog"
        url: "/blog/"
        weight: 30
      - identifier: "categories"
        name: "All Categories"
        parent: "blog"
        url: "/categories/"
      - identifier: "tags"
        name: "All Tags"
        parent: "blog"
        url: "/tags/"
    sectionPagesMenu: "navbar"
    ```

Menus in Hugo are really tricky but this should work. For menus where 
you actually want to have all of the pages of a section in the drop-down 
menu, see the next section. You will have to add them to menus in their 
front matter.

If you don't want a drop-down menu for listing categories or tags, just 
remove those parts. You can also list all posts with a specific category 
or tag by clicking on that category or tag in any post.

# How to greate a gallery

There are four shortcodes for creating a gallery:

* gallery-category
* gallery-photo
* gallery-modal
* gallery-script

The first two are used in combination to create the actual gallery. Do 
something like the following in one of your pages:

```
{{< gallery-category >}}
    {{< gallery-photo fn="<filename of first picture>" caption="<your caption>">}}
    {{< gallery-photo fn="<filename of second picture>" caption="<your caption>">}}
    {{< gallery-photo fn="<filename of third picture>" caption="<your caption>">}}
    {{< gallery-photo fn="<filename of fourth picture>" caption="<your caption>">}}
{{< /gallery-category >}}
```

The pictures should be under `static/img/thumbnails` in your project.

If you want a modal to pop up with a zoomed in version, add the other 
two shortcodes at the bottom of your page:

```
{{< gallery-modal >}}
{{< gallery-script >}}
```

And have corresponding full-size images under `static/img/fullsize`. The 
file names need to be the same as for the thumbnails.

Thumbnails should of course be small so that your page loads fast and 
fullsize should be large enough that they don't look pixelated when 
covering the full space of a web browser. One way to resize images is 
with graphicsmagick: `gm mogrify -resize 1920x1920 *.jpg`, which will 
resize all images in the current folder to a maximum width/height of 
1920 pixels (while maintaining the aspect ratio).

# How to create a resume

There are some shortcodes that can help you create a resume. These are:

* container
* resume-section
* resume-entry

Container just creates a div with a specified class (call it 
"resume-content" in order for the css to work. `resume-section` needs a 
title which will be shown to the left of it's content (if it can fit on 
the screen, otherwise it's on top). Within this, you put one or more 
`resume-entry` shortcodes. First of all, this shortcode takes the three 
parameters `what` `where` and `when` (see example usage below). It also 
takes raw HTML within the shortcode tags. There is styling for `<p>`s 
and unordered and ordered lists. Apart from that, site-wide CSS is used. 
Example usage:

```
{{< container >}}
    {{< resume-section title="About Me" >}}
        {{< resume-entry >}}
            <p>
            Some info about you.
            </p>
        {{< /resume-entry >}}
    {{< /resume-section >}}

    {{< resume-section title="Education" >}}
        {{< resume-entry what="Bachelor's program of Computer Science"
                         where="Sidney University"
                         when="2010–2013">}}
            <ol>
                <li> Some comment on what skills you learned</li>
                <li> Some other comment </li>
            </ol>
        {{< /resume-entry >}}
    {{< /resume-section >}}
{{< /container >}}
```

# How to create a contact box

There is a shortcode for creating a framed area with links to your 
profiles called `contact-box`. The thing it does is to put a frame with 
links to your social media on the rights side of the page, and, if you 
want, some text on the left side of the box, outside the frame. Put this 
text within the shortcode tags.

You decide what social media to include in your site `config` under 
social under params, like this:

```
params:
  social:
    github: <your github username>
```

Then, to use the shortcode in a page, do:

```
{{< contact-box >}}
Some text you want to include
{{< /contact-box >}}
```

# Navigation bar

## How to add a page to the navigation bar

Add it to navbar in the page's front matter:

```
---
menu:
  navbar:
    title: "Contact"
    weight: 100
---
```

## How to add a page to drop down menu

Quick instruction: Set it's `parent` parameter to one of the menus in 
navbar.

Instructions with example:

1.  Create the top-level menu in config.yaml or your equivalent. An 
    example where the top-level menu doesn't correspond to a real page 
    (url is #) and is just there to hold the drop-down menu:

    ```
    menu:
      navbar:
      - identifier: "about-me"
        name: "About Me"
        url: "#"
        weight: 50
    ```

2.  In the front matter of the page you want to add, put the following:

    ```
    menu:
      navbar:
        title: <What you want the name of the menu to be>
        parent: "about-me"
        weight: <Lower numbers will appear further to the left>
    ```

# Other projects used in this theme

The theme does not secretely download any resources from other websites 
or CDNs. It does, however, make use of two other projects where the 
files are included in this theme.

## GNU FreeFont

The fonts under static/fonts are parts of the project [GNU 
FreeFont](https://www.gnu.org/software/freefont/). They are licenced 
under GPLv3 or later (you decide). Licenses should also be included in 
the .woff files themselves. Some of the fonts are edited by me to take 
up less space by including fewer characters.

The icons used for the `contact-box` shortcode are from *Font Awesome* 
project. Specifically, the project's font file `fa-brands-400.woff2` is 
used. It's licence is SIL OFL 1.1 (https://scripts.sil.org/OFL). A HTML 
comment is included in the contact-box shortcode to show the licence and 
source.
