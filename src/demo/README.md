# Useful Links #

* https://www.dashingd3js.com/why-build-with-d3js

*noted from ebook:*

Heydt, Michael. 2015. D3.js By Example. Packt Publishing: Birmingham - Mumbai.

### #1 Getting Started with D3.js ###

D3.js (D3-Data Driven Documents) is an open source JavaScript library that provides the facility for manipulating HTML documents based upon data, using JavaScript as the language for implementing the mapping of data to the documents.

Many consider D3.js as a data visualization library. This may be correct, but D3.JS provides much more to its user than just visualization, such as:
•  Efficient selection of items in the HTML DOM.
•  Binding of data to visual elements.
•  Specifications on handling the addition and removal of data items.
•  The ability to style DOM elements dynamically.
•  Definition of an interaction model for the user with the data.
•  The ability to specify transitions between data visualizations based upon dynamic changes in data.
•  D3.js helps you bring data to life using HTML, SVG,and CSS. It focuses on the data, the way it is presented to the user, the changes in visualization with changes in data, and the way the user interacts with data through the visualization.

# Data and data binding #

The data in D3.js is bound to the DOM elements. Through binding, D3.js tracks a collection of objects along with their properties, and based upon rules that you specify, it modifies the DOM of the document based upon that data.

The process of binding in D3.js consists ofthree stages:

* Enter, 
* Update, 
* and Exit.

# Modules #

* Shapes: lines, arcs, areas, scatterplot symbols
* Scales: coordinates browser, coding repetitive, complex, error-prone translations, axes, rendering visuals
* Layouts: prebuilt hierarchical, physical, most complicated part of data visualizations
* Behaviors: user interaction patterns, listening mouse events on visual elements, change presentation item
* Data-processing modules: various data-processing utilities (CSV, JSON, TSV, date/number formats)

# Js Bin #

Js Bin (http://jsbin.com/) is a website that functions as a development tool for facilitating the quick creation and sharing ofsimple JavaScript applications that run within the browser.

# bl.ocks.org #

bl.ocks.org (http://bl.ocks.org) is a service for D3.js code examples that you place on GitHub, a free source code and sharing repository, in anentity known as a gist. A gist is simply one or more reusable and sharable piece of code that are managed by GitHub. They are an excellent means of remembering and sharing small code examples.

# Embedding D3.js #

`<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>`

Note that we also have to specify `charset="utf-8"`. This is normally not required for most JavaScript libraries, but D3.js is UTF-8 encoded and not including this *can cause issues*. So, make sure you *don't forget this attribute*.

The actual D3.js code in this example consists of the following three functions placed within another `<script>` tag within the body of the document.

`d3.select('body')`
`.append('h1')`
`.text('Hello World!');`

All D3.js statements will start with the use of the d3namespace. This is the root of where we start accessing all the D3.js functions. In this line, we call the `.select()` function, passing its body.

The `.select()` function returns a D3.js object representing the body DOM object. We can immediately call `.append('h1')` to add the header element inside the body of the document.

The `.append()` function returns another D3.js object, but this one represents the new `h1` DOM element. So all we need to do is to make a *chained* call: `.text('Hello World!')`, and our code is complete.

This process of calling functions in this manner is referred to in D3.js parlance as *chaining*, and in general, it is referred to as a *fluent* API in programming languages. This chaining is the aforementioned mini-language.


### #2 Selections and Data Binding ###

At its core, D3.js is about *selection*, which is a process of finding and creating DOM elements that visualize data. At a simple level, a selection can just be a means of finding and manipulating elements in the DOM that already exist. However, D3.js selections can also be used for explicitly creating new elements in the DOM as well as for implicitly creating and removing DOM elements based upon the changes in an underlying data model.

it is *bad practice* to have identical ID values on a page:

`d3.selectAll('#div2').style('background-color', 'lightblue')`

If we want to ensure that this query returns only divelements, then we can use the following query, which places the type of the element before the hash symbol:

`d3.selectAll("div#div3").style('background-color', 'lightblue')`

# Accessor functions #

`d3.selectAll("div")`
`.style('background-color', function (d, i) {`
`return (i % 2 === 0) ? "lightblue" : "lightgray";`
`});`

`function (d, i)` --> An accessor function has *two parameters*, the first of which represents the *datum* that has been associated by D3.js to the DOM element.

The *second parameter* represents *the 0-based array position* of the DOM element in the result of the selection.

*The second parameter of an accessor function is optional.*

# SVG Element #
The mini-language for paths is quite robust, and therefore, also complex. The following table lists several other common path commands:

Command     Purpose
M           Line-to
L           Horizontal line-to
H           Veritcal line-to
V           Curve-to
C           Quadractic Bezier curve-to
Q           Smooth quadratic Bezier curve-to
T           Elliptical arc
A           Close path
Z           Move-to

D3 provides a number of tools to facilitate the use of paths that make them much simpler to use compared to manually specifying them with string literals.
