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

Blog posts will go in `content/blog/` but you will also need a list page 
to show all the posts when clicking the blog tab.

Start with creating `blog/_index.html` with something like the following 
front matter:

```
title: "My Blog"
menu:
  navbar:
    title: "Blog"
    weight: 30
```

That's all you need for this file – the page itself is constructed by 
the the layout files for the theme. If you use another title than "Blog" 
for the menu, set "blogTabName" to the same thing in `params:` in your 
site config. However, it is unlikely that you need to use a different 
name since the title of the page is what determines what it says on the 
blog tab.

Now you can start adding posts by doing:

```
hugo new blog/my-first-post.md
```

If you add categories or tags to your post, you can list all posts of 
that tag or category by clicking the links in a blog post.

There is currently no way to list all tags or categories but I will 
likely add this feature later on.

The blog should be a main section. Hugo makes the sections with the most 
pages main sections by default, but if for some reason it isn't, add it 
to the main sections manually in your site config:

```
params:
  mainSections = ["blog"]
```

# How to add a page to drop down menu

1.  Create the top-level menu in config.yaml or your equivalent. An 
    example:

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
