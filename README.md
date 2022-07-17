# Victor Smirnov blog theme

Theme with customizations for [Victor Smirnov blog](https://victorsmirnov.blog).

I started the theme as a copy of the [Casper](https://github.com/TryGhost/Casper) theme version 5.2.1.

At the moment this is an in house project. The readme file should help me with planing and contains some quick notes.

## Planning and questions

* [x] Syntax highlighting.
* [x] GitHub actions for deployment.
* [ ] GitHub profile link.

## External documentation

* [Handlebars](http://handlebarsjs.com/)
* [Theme API](https://ghost.org/docs/themes/)
* [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com)

## Notes on theme files

- `default.hbs` - The parent template file, which includes your global header/footer
- `index.hbs` - The main template to generate a list of posts, usually the home page
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file.
For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive

## Development

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
# create .zip file
yarn zip
```

## PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- [Color Mod](https://github.com/jonathantneal/postcss-color-mod-function)


## SVG Icons

Casper uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`.
To use an icon just include the name of the relevant file, eg.
To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

## Copyright & License

Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).
Copyright (c) 2022-present Victor Smirnov <admin@victorsmirnov.blog> - Released under the [MIT license](LICENSE).
