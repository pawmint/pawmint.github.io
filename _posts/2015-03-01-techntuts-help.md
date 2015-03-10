---
layout: page
title: "Tech'n'Tuts Help"
category: tools
order: 3
date: 2015-03-01 20:41:44
tags: jekyll
---

## Adding posts
Creating posts is easiest with the supplied script, simply execute the following from the repo's root folder:

```bash
ruby bin/jekyll-page title category [filename] [--edit]
```

where `title` is the title of page, `category` is one of the categories defined in the `_config.yml`. By default the `filename` will be derived from the title, but you can specify an explicit filename (without the date) by passing the third agument. Finally the `--edit` (or just `-e`) will launch the editor defined by the `$EDITOR` environment variable.

#### Example

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
To reorder elements in the navigation menu, simply add an order attribute to the [front matter](http://jekyllrb.com/docs/frontmatter/) of the page and the navigation links will be sorted accordingly (within it's section).

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
For convenience, a new directory will be created called `_pages` which contains symlinks to the posts without the data prefix, e.g. `2015-03-01-foo.md → foo.md`. This makes it a tad easier when opening files to edit.


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


## Edit content or repo locally instead of on GitHub
To edit Tech'n'Tuts on your local machine, you must clone the repo, edit and push to the `gh-pages` branch. This is the default branch for this repo. To test locally, you need to install [Jekyll](http://jekyllrb.com/) on your machine.
