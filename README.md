# Menus

This theme supports drop-down menus in the navigation bar. If you want 
to add a a new menu to the navigation bar, put the following in the 
front matter, e.g. in `content/contact.md`:

```
menu:
  navbar:
    title: <What you want the name of the menu to be>
    weight: <Lower numbers will appear further to the left>
```

If you want to add a page to a drop-down menu, first give it a parent, 
which will not refer to any page:

```
menu:
  navbar:
  - identifier: "about-me"
    name: "About Me"
    url: "#"
    weight: 50
```

Then add your page to it by putting the following in its front matter:

```
menu:
  navbar:
    title: "Projects"
    parent: "about-me"
    weight: 40
```

## Configuring the blog menu

I had to make a special case for how to deal with the blog menu. The 
theme highligts the currently active menu, which works by seeing if the 
current page is in that menu. Since blog posts shouldn't be listed in 
the drop-down menu, we have to find some other way to show the blog tab 
as active even when a post is open, instead of the index page for the 
blog. The solution I choose is to highlight the menu matching the site 
parameter `blogTabName` when the current page is in the *categories* or 
*tags* sections (for when showing lists of posts in categories or with 
specific tags), or when the section of the current page is one of the 
main sections (for when viewing individual blog posts).

Hugo sets the main section to the section with the most pages by default 
but you can also define it in your `config.yaml` with e.g:

```
params:
  mainSections = ["blog"]
```
