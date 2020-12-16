[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Handlebars

## Prerequisites

- [jQuery DOM](https://git.generalassemb.ly/ga-wdi-boston/jquery-dom)
- [HTML-CSS](https://git.generalassemb.ly/ga-wdi-boston/html-css)
- [jQuery AJAX CRUD](https://git.generalassemb.ly/ga-wdi-boston/jquery-ajax-crud)

## Objectives

By the end of this, developers should be able to:

- Create Handlebars templates to render JSON data from an API.
- Read Handlebars documentation for understanding.
- Create handlebars partials.
- Utilize `if` and `each` helpers when creating templates.

## Preparation

1. Fork and clone this repository.
   [FAQ](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone)
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.
1. Install dependencies with `npm install`.

## What is Handlebars

Just a templating engine for JS.

But a little more:

> *Handlebars.js is a compiler built with JavaScript that takes any HTML
> and Handlebars expression and compiles them to a JavaScript
> function. This derived JavaScript function then takes one parameter, an
> object—your data—and it returns an HTML string with the object properties’
> values inserted (interpolated) into the HTML. So, you end up with a string
> (HTML) that has the values from the object properties inserted in the relevant
> places, and you insert the string on a page.*
> \- [javascriptissexy](https://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/)

[Handlebars Docs](http://handlebarsjs.com/)

## Before handlebars

Suppose that we just queried our back-end, a movie API, and received some data
in the form of a JSON string.

```JSON
{
  "movies":
    [
      {"title": "Thriller", "director": "Human"},
      {"title": "Sci Fi", "director": "Alien"},
      {"title": "Horror", "director": "Sailor"},
      {"title": "Drama", "director": "Pilot"},
      {"title": "Mystery", "director": "Detective"},
      {"title": "Adventure", "director": "Artist"}
    ]
}
```

Our front-end app might then parse that JSON and give us an array of JavaScript
objects, which we can then iterate through.

```javascript
data.forEach(function (movie) {
  // Do some action.
})
```

If we wanted to produce an `<li>` for each of these movies, and add them to a
`<ul>` with the id `movies`, we could do it like this:

```javascript
data.forEach(function (movie) {
  $("#movies").append("<li>" + movie.title + " By " + movie.director + "</li>")
})
```

Alternatively, we could specify some string to represent all of the HTML we
want to add, and then add it to the `<ul>` in one fell swoop.

```javascript
let moviesHtml = ""
data.forEach(function (movie) {
  moviesHtml += "<li>" +
                  movie.title + " By " + movie.director +
                "</li>"
})
$("#movies").html(moviesHtml)
```

This approach has some advantages over the first - for instance, we don't need
to worry about clearing the contents of `$("#movies")` each time.

## Demo: Why Handlebars

The examples above do a lot of combining Javascript and HTML, which can get messy.
Instead, Handlebars is one of many different templating engines that allows us
to keep our Javascript and HTML separate, helping us write cleaner code.

If we wanted to replicate the Javascript function above but use our Handlebars
templating magic, we could write a template `movies-page.handlebars` that looks
something like this:

```handlebars
<div class="container">
   <h2>Movies: </h2>
   <ul id="movies">
   {{#each movies as |movie|}}
     <li>
       {{movie.title}} By: {{movie.director}}
     </li>
   {{/each}}
   </ul>
</div>
```

In a separate file we could reference our template and then inject the compiled
HTML into our webpage, which has some element with a class `content` to hold
that new HTML.

```js
// our movies data
const data = { movies: [...] }
// our movies-page template
const moviesPageTemplate = require('../templates/movies-page.handlebars')
// give our template the data
const moviesPageHtml = moviesPageTemplate({ movies: data.movies })
// inject our compiled HTML into our webpage
$('.content').append(moviesPageHtml)
```

Handlebars allows us to display data on it's own, but it also includes helper
functions like the iterator `#each` and the ability to organize our templates
into partials, or template snippets that we can reuse throughout our templates.

If we wanted to use our list of movies on several pages, for instance, we could
create a partial `movies-list.handlebars`, and reference that partial anywhere we
want using the syntax `{{> movie-list}}`.

```handlebars
<div class="container">
   <h2>Movies: </h2>
   <ul id="movies">
   // Include our partial
   {{> movies-list}}
   </ul>
</div>
```

## Lab: Hands-on with Handlebars

Handlebars and front end templating will make a whole lot more sense once you
have a chance to look at it. In your teams, discuss and consider the following:

- Where is the book information coming from?
- What is happening in the `assets/scripts/app.js` file?
- How many times is `book-listing.handlebars` run?
- Draw the order in which each separate file is accessed.
- Be able to explain in plain English what is happening.
- What happens if you comment out the line that defines `showBooksTemplate`?
- Uncomment the line `{{>partial}}` from `book-listing.handlebars`, what does
  it do?
- What is this `{{log book}}` syntax all about?
  - How might it help us debug our templates?
- Why are we using `data-id` and not just `id` in `book-listing.handlebars`?
- What if the `books` array was empty?

Make sure to note any questions you come across and we'll go over them together.

## Event Delegation

When dealing with event delegation, we're faced with a small
problem that is simple to work-around if you know it exists. **Bubbling**
occurs when an event takes place on a child element of the
DOM that **does not** have an event handler of its own. In the scenario
that this happens, the browser will search up the DOM chain until it finds
an appropriate event handler.

<details>
<summary>What do you think would happen if I tried to add an event handler to something
contained in my template before it was rendered?</summary>
<br>
For events added to DOM nodes rendered after the document is ready, the event
should be added to the parent element that is rendered on page load so that when
an action is performed, the correct function is triggered for the event.
</details>

## Lab: Event Delegation

In your teams, work on the following:

- Add a *Remove* button as the last element for each section and give it classes of `btn btn-danger` so that it is styled with Bootstrap.
- Give each *Remove* button a `data-id` that corresponds to the book id.
- When the *Remove* button is clicked, make a `DELETE` request to the API at
  `/books/:id`.
- Upon success, remove the deleted book from the page. (Don't
  delete too many books!)

>**Hints**:
>Use the [jQuery `.on()` Documentation](http://api.jquery.com/on/) to apply the optional [`selector` parameter](http://api.jquery.com/on/#direct-and-delegated-events).
>Use the [jQuery `.data()` method](https://api.jquery.com/data/) to retrieve the id of the book to use in your API delete request.

**Food for thought**: We are allowing our users to delete books without any
confirmation. How do some of your favorite websites handle deletion confirmation?
Consider this when creating production-ready applications that allow users to
delete from databases.

## Demo: Helpers

Helpers, aka [block-helpers](https://handlebarsjs.com/guide/block-helpers.html), are
little functions that we can insert into our templates to perform different
functionality on blocks of our template code. Handlebars includes some helpers
for us for basic iteration and control flow like `#each` and `#if` but we can
also write custom helpers to perform other tasks with or on our data.

Webpack helps us organize our helpers by having us set our helpers directory in
the webpack config. Once configured, all we need is a Javascript file named
after our custom helper that exports a return function.

What is happening in our current helper in `./assets/templates/helpers/limit.js`?
Where might we use this functionality in our app?

## Demo: Cross-site scripting (XSS)

[Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting)
is a type of computer security vulnerability typically found in web applications.
XSS enables attackers to inject client-side scripts into web pages viewed by
other users. A cross-site scripting vulnerability may be used by attackers to
bypass access controls such as the same-origin policy.  XSS effects vary in
range from petty nuisance to significant security risk, depending on the
sensitivity of the data handled by the vulnerable site and the nature of any
security mitigation implemented by the site's owner.

A web developer might expect a user to create books with titles like
`"The Jungle Book"` but what if a user creates a book with the title
`"<script type='text/javascript'>alert('xss');</script>"`?

### In jQuery

Many jQuery methods are *unsafe*:

- `.html(book.title)` *unsafe*
- `.append(book.title)` *unsafe*

There are safe jQuery methods:

- `.text(book.title)`
- `.val(book.title)`

### In Handlebars

Handlebars defaults to safely displaying our data.

```js
{{ book.title }}
```

## Additional Resources

- [Handlebars Docs](http://handlebarsjs.com/)
  - [Handlebars Helpers Documentation](https://handlebarsjs.com/guide/builtin-helpers.html)
  - [Handlebars Helpers Log Documentation](https://handlebarsjs.com/guide/builtin-helpers.html#log)
- [Handlebars in Ten Minutes](http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/)
- [JavaScript is Sexy: Handlebars](http://javascriptissexy.com/handlebars-js-tutorial-learn-everything-about-handlebars-js-javascript-templating/)
- [XSS - Cross-Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
