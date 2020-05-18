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

# How to add a page to drop down menu

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
