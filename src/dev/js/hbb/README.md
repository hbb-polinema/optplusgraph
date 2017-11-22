### Custom data structure visualizations

Right now Online Python Tutor can render only basic Python data structures.

While this is sufficient for teaching introductory CS courses, intermediate and advanced CS students must learn
algorithms involving more sophisticated data structures such as binary trees and graphs.
The goal of this project is to create a set of effective custom renderers for data structures
such as:

- trees (maybe see [twyg library](http://www.johnnovak.net/twyg/quickstart/) for inspiration? or GraphViz, or even d3?)
- graphs
- numerical matrices
- simple 2D graphical worlds (e.g., for Pac-Man or Conway’s Game of Life)
- rendering lists of numbers as bar/line graphs, charts, and other quantitative data visualizations (e.g., using Google Charts API)
- file objects
- DSL components such as logic gates for a logic simulator written in Python, or proof trees for formal logic courses
- compiler data structures such as parser states, parse tables, AST construction, code generators, etc.
- relational algebra diagrams for database courses
- embedded image files (e.g., inline PNG images) to visualize Guzdial et al.'s [Media Computation](http://coweb.cc.gatech.edu/mediaComp-teach) algorithms online

These renderers will make Online Python Tutor useful in a far larger variety of CS courses and online textbooks
beyond CS0/CS1 sorts of intro classes.

One ultimate goal is to make OPT capable of visualizing classic AI, algorithm, and compiler textbook algorithms
that otherwise would need to be tediously built as one-off special-case visualizations.

From an email excerpt in May 2013: {
I recently added a feature to Online Python Tutor (OPT) that enables user programs to output HTML/CSS/JS, in addition to printing to stdout. Thus, if a program calls html_output(" ... "), when OPT steps over that line, it will render the HTML string in a div. This makes it possible to generate a wide array of visualizations in pure Python (by simply constructing strings that represent legal HTML/CSS/JS).

For the file I/O example, I can imagine creating a special File class that implements "file-like" stream I/O methods. Then the user program might look like:

    import VisualFile
    f = VisualFile(<string contents of the file>)
    for line in open(f):
        <parse line>


The class definition of VisualFile includes the proper HTML-generation code to render a pretty HTML representation of the file's contents. And when methods iterate over the file, it can render an HTML representation with certain lines or characters highlighted to represent, say, the current file pointer position, etc.
}


There are (at least) two main ways to implement this feature:

- Add custom data types to the trace and have the frontend render them
  specially using JS visualization libraries such as d3.

- Take advantage of OPT's (still-undocumented) ability to print
  arbitrary HTML/CSS/JS to the canvas (just like how it can print stdout
  output to a text box). This enables us to create custom data structure classes
  with printHTML() methods that print their graphical representation to
  the web page canvas. The dream here is to be able to write pure-Python modules for
  each custom data type, which can "pretty-print" as HTML/CSS/JS.