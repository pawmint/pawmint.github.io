---
layout: page
title: "Tech'n'Tuts Help"
category: tools
order: 3
date: 2015-03-01 20:41:44
---

### Adding posts
Creating posts is easiest with the supplied script, simply execute the following from the repo's root folder:

```bash
ruby bin/jekyll-page title category [filename] [--edit]
```

where `title` is the title of page, `category` is one of the categories defined in the `_config.yml`. By default the `filename` will be derived from the title, but you can specify an explicit filename (without the date) by passing the third agument. Finally the `--edit` (or just `-e`) will launch the editor defined by the `$EDITOR` environment variable.

#### Example

```bash
ruby bin/jekyll-page "My New Page" tools
```

will produce a file _posts/2015-03-01-my-new-page.md with the [front matter](http://jekyllrb.com/docs/frontmatter/) already defined:

```
---
layout: page
title: "My New Page"
category: tools
date: 2014-03-01 12:00:00
---
```

### Managing categories
Categories are listed in `_config.yml` in the `sections` object. Each line defines own category, the first element being the category id used in the posts' [front matter](http://jekyllrb.com/docs/frontmatter/). Categories will appear in the navigation menu when their first post is created. Currently, the categories available are `web`, `home`, `tools`, `deploy`, `admin` and `misc`.

### Navigation order
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

### Some handy symlinks
For convenience, a new directory will be created called `_pages` which contains symlinks to the posts without the data prefix, e.g. `2015-03-01-foo.md → foo.md`. This makes it a tad easier when opening files to edit.