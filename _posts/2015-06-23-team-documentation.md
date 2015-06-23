---
layout: page
title: "Team documentation: Tech'N'Tuts"
category: workflow
order: 6
date: 2015-06-23 07:00:00
tags: jekyll thibaut romain
---

## Work on your local Tech'N'Tuts

Install your Tech'N'Tuts locally with:

```bash
git clone git@github.com:pawmint/techntuts.git
git checkout gh-pages
gem install jekyll
cd techntuts
bin/jekyll-page -l
```

You can then edit the post you want with `$EDITOR _pages/<my_page>.md`.

Then test your changes by running `jekyll serve`, and access your local Tech'N'Tuts at `http://127.0.0.1:4000/techntuts/`

Finally, push your changes to Github when you are satisfied, and they will take effect after a few second.

## Adding posts
Creating posts is easiest with the supplied script, simply execute the following from the repo's root folder:

```bash
ruby bin/jekyll-page title category [filename] [--edit]
```

where `title` is the title of page, `category` is one of the categories defined in the `_config.yml`. By default the `filename` will be derived from the title, but you can specify an explicit filename (without the date) by passing the third agument. Finally the `--edit` (or just `-e`) will launch the editor defined by the `$EDITOR` environment variable.

### Example

```bash
ruby bin/jekyll-page "My New Page" tools
```

will produce a file `_posts/2015-03-01-my-new-page.md` with the [front matter](http://jekyllrb.com/docs/frontmatter/) already defined:

```
---
layout: page
title: "My New Page"
category: tools
date: 2014-03-01 12:00:00
---
```

## Managing categories
Categories are listed in `_config.yml` in the `sections` object. Each line defines own category, the first element being the category id used in the posts' [front matter](http://jekyllrb.com/docs/frontmatter/). Categories will appear in the navigation menu when their first post is created. Currently, the categories available are `web`, `home`, `tools`, `deploy`, `admin` and `misc`.


## Navigation order
To reorder elements in the navigation menu, we have to hack on the date of the pages: the earlier the date, the lower the page will be in its category. In practice, each category's pages'  dates work as a countdown: the first pages starts on 2015-06-23 12:00:00 (or any other datetime), and the following pages will go decreasing : 11am, 10am, 9:30am, etc. It doesn't matter whether you put a step of 1 hour or 1 min between two pages.

It should be possible simply add an order attribute to the [front matter](http://jekyllrb.com/docs/frontmatter/) of the page, and the navigation links would be sorted accordingly (within it's section). However... In practice it doesn't seem to work!

```
---
layout: page
title: "My New Page"
category: tools
date: 2015-03-01 12:00:00
order: 1
---
```



## Some handy symlinks
For convenience, a new directory will be created called `_pages` which contains symlinks to the posts without the data prefix, e.g. `2015-03-01-foo.md → foo.md`. This makes it a easier when opening files to edit.

After a `git clone`/`git pull`, run `ruby bin/jekyll-page -l` to regenerate the symlinks.


## Tagging for better search results
The search bar included in the main menu only check posts titles, categories and tags. To add tags to enable easier post retrieval through search, simply add the following to the post's front matter:

```
tags: topic1 topic2 topic3
```

Additionally, a full-text search is available in the footer. However, it may get heavy to load if there are many posts in the future.


## Archiving posts
To archive a post, simply add the following in the front matter of the post:

```
archive: true
```

## Jekyll's Markdown tricks

### Link to another post

To make a link towards another Tech'N'Tuts post, you can use a [Jekyll template](http://jekyllrb.com/docs/templates/#post-url) : `[Another post]({{ "{% post_url another-post " }}%})`

### Link to anchor inside a post

Simply make a link to your a dasherized-version of your section: `[My link](#my-section)`.
