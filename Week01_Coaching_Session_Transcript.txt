====================================================================
Week 01 Coaching Session Transcript
Participant: Vivian
Role: Learning Coach and Software Mentor (AI)
====================================================================

COACH: Welcome! Just to be clear from the start, this is a coaching
session, not a test. It is perfectly okay—and even encouraged—to say
"I don't know" or "I made a mistake." That's the fastest way we'll
learn today.

Since we're in a chat interface, whenever we get into code, I'll ask
you to paste the relevant snippet directly into our conversation.

Before we dive in — I want to confirm I've got your name right. Is
it Vivian?

VIVIAN: yes

COACH: Great, thanks Vivian! And just to reiterate — this is a safe
space to think out loud. If something doesn't quite click or you
second-guess a decision you made, that's totally fine and actually
really useful for us to dig into together.

Let's start with Topic 1: Express Routing. Could you paste a snippet
from your server.js file that shows how you set up one of your
routes — and walk me through what that route does?

VIVIAN:
```javascript
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Static middleware to serve the public folder (css, images, client js)
app.use(express.static('public'));

// Home page route
app.get('/', async (req, res) => {
  const title = 'Home';
  res.render('home', { title });
});

// Organizations page route
app.get('/organizations', async (req, res) => {
  const title = 'Organizations';
  res.render('organizations', { title });
});

// Service Projects page route
app.get('/projects', async (req, res) => {
  const title = 'Service Projects';
  res.render('projects', { title });
});

// Service Project Categories page route
app.get('/categories', async (req, res) => {
  const title = 'Categories';
  const categories = [
    'Environmental',
    'Educational',
    'Community Service',
    'Health and Wellness',
  ];
  res.render('categories', { title, categories });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

COACH: Thanks for sharing that — nice clean setup.

I notice each of your route handlers is declared as
`async (req, res) => {...}`, even though none of them actually use
`await` inside — they just render a view synchronously.

What made you choose to write them as async functions here?

VIVIAN: I wrote them as async because I was planning ahead for when
I add a database or API calls to fetch real data for those routes
later. Since I was only rendering static views for now, I didn't end
up using await inside them yet.

COACH: That makes a lot of sense — it's a reasonable habit to build
in early, especially knowing you'll likely add database calls soon.

Here's a follow-up to test that a bit further: if one of these async
route handlers eventually does an await someDbCall() and that call
throws an error, what do you think would happen to your Express app
if you didn't have a try/catch around it?

VIVIAN: If an error is thrown inside an async route handler without
a try/catch block (in Express 4), Express won't automatically catch
the rejected Promise. The request will end up hanging until it times
out because next(err) is never called, or it could result in an
unhandled Promise rejection that crashes the server. To handle it
properly, I'd need to either wrap the code in a try/catch block and
pass the error to next(err), or use a wrapper package like
express-async-handler.

COACH: That's a really solid answer — you've clearly thought through
both the practical failure mode (hanging request / unhandled
rejection) and the two standard fixes. That's exactly the kind of
forward-thinking that'll save you debugging headaches later.

One small nuance worth flagging for your own awareness (not a test
question, just useful): Express 5 actually changed this behavior —
it does auto-catch rejected promises in async handlers and forwards
them to your error middleware. But since you're likely on Express 4
for this course, your reasoning is spot on for the version you're
using.

That wraps up Topic 1 nicely. Let's move to Topic 2: JavaScript
Language Principles.

Could you paste a snippet of a JavaScript function from your
project — could be from server.js, a client-side script, or wherever
you've written custom logic — and walk me through what it does and
why you wrote it that way?

VIVIAN: [pasted the same server.js snippet as above]

COACH: That's the same server.js snippet you shared for Topic 1 — no
problem at all, this happens.

For Topic 2, I'm looking for something that shows off a JavaScript
language principle specifically — things like array/object
destructuring, template literals, array methods (.map(), .filter()),
arrow functions with interesting logic, ternaries, spread/rest
syntax, etc.

Looking at the code you just pasted, there's actually a small
candidate in your /categories route — the categories array. But
that's fairly simple. Do you have a snippet elsewhere in your
project — maybe in one of your .ejs files where you loop through
that array, or any other .js file — that shows some JavaScript logic
like a loop, conditional, or array method in action?

VIVIAN: categories.ejs
It loops through the categories array
```ejs
<% categories.forEach((category) => { %>
  <article class="card">
    <h2><%= category %></h2>
  </article>
<% }) %>
```

COACH: That's a great example — thanks for pulling that out.

Let's dig into it a bit. You used .forEach() here to loop through
the array and output an <article class="card"> block for each
category.

Walking through this line by line: (category) => { %> — what's
happening with that arrow function syntax, and why does the loop
"pause" in the middle to let you write regular HTML/EJS markup
before it picks back up with <% }) %>?

VIVIAN: The (category) => { syntax is an arrow function passed as a
callback to .forEach(). It takes the current element of the array
during each iteration and assigns it to the category variable.
The loop doesn't actually 'pause'—when EJS compiles the file on the
server, it translates the whole template into JS code. The HTML
between <% ... %> tags gets compiled as string output inside the
body of that loop callback. Opening the block with <% ... { %> and
closing it later with <% }) %> just tells EJS to evaluate everything
in between for every item in the array.

COACH: That's an excellent and technically precise answer — you
clearly understand that EJS is really just JavaScript templating
under the hood, compiling the whole thing into a function that
builds up a string. A lot of people get tripped up thinking the HTML
and JS are somehow interleaved at runtime, but you've got the right
mental model: it's all just code, and the HTML chunks are
effectively string literals being appended in sequence.

That covers Topic 2 nicely. Let's move to Topic 3: EJS Partials and
Pages.

Could you paste a snippet showing one of your EJS partials (like
your header or footer) and how it's included in one of your page
templates — and explain why you chose to structure it that way?

VIVIAN:
```html
</main>
  <footer class="site-footer">
    <div class="footer-container">
      <p>&copy; <%= new Date().getFullYear() %> Service Connect. All rights reserved.</p>
    </div>
  </footer>
  <script>
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  </script>
</body>
</html>
```

COACH: Nice — that's a good one. I like that you're dynamically
generating the copyright year with new Date().getFullYear() instead
of hardcoding it.

A couple of things I want to understand about your thinking here:

Could you show me the line in one of your page templates (like
home.ejs) where you actually include this footer partial — and
explain why you decided to break the footer out into its own
partial file instead of just writing it directly into each page?

VIVIAN: <%- include('partials/footer') %>
The reason for breaking the footer into footer.ejs is reuse. Every
page needs the same closing layout, footer markup, copyright year,
navigation toggle script, and closing </body> / </html> tags. If
that code were copied into every page, any future change would have
to be made over and over.
With a partial, you edit the footer once and every page that
includes it gets the update automatically. It also keeps each page
template focused on its own content instead of repeating shared site
structure.

COACH: Good explanation — DRY principle applied well, and you're
right that it keeps each page template focused on its unique
content.

Quick follow-up: you used <%- include(...) %> here, with a dash
instead of an equals sign. What's the difference between <%- and <%=
in EJS, and why does it matter for an include?

VIVIAN: <%= outputs HTML-escaped content to prevent XSS attacks,
while <%- outputs raw, unescaped HTML directly.
For an include(), it matters because the partial returns a string of
raw HTML elements (like <footer>, <script>, etc.). If you use <%=,
EJS escapes the HTML tags into entities like &lt;footer&gt;, causing
the literal markup code to display on the browser screen instead of
rendering the structural components.

COACH: Exactly right, and clearly explained — you understand not
just the "what" but the "why" that would actually bite you if you
got it backwards (literal escaped tags showing up on the page
instead of the styled footer).

That wraps up Topic 3. Let's move to our last one: Topic 4: Frontend
CSS.

Could you paste a snippet of CSS from your style.css file — ideally
something a bit more interesting than a basic rule (like a
flexbox/grid layout, a media query, a hover state, or something with
CSS variables) — and walk me through what it does and why you styled
it that way?

VIVIAN: [pasted full style.css stylesheet]

COACH: Thanks for sharing the full stylesheet — there's a lot of
good stuff in here. Let's zoom in on one piece:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
```

This is a nice responsive grid technique. Walk me through what
repeat(auto-fit, minmax(260px, 1fr)) actually does — how does it
decide the number of columns, and why did you pick this approach
over something like a media query with fixed column counts?

VIVIAN: repeat(auto-fit, minmax(260px, 1fr)) creates a fully fluid
layout without hardcoded breakpoints.
minmax(260px, 1fr) ensures columns are at least 260px wide, but
allows them to grow to fill remaining space. auto-fit calculates how
many 260px tracks fit in the container width and stretches them
evenly across the row.
I chose this over media queries because it handles every screen size
automatically with one line of CSS. Media queries rely on fixed
viewport breakpoints, whereas this approach responds dynamically to
the container's width, making the grid far more modular and
maintenance-free.

COACH: That's a really thorough and accurate explanation — you
clearly understand why auto-fit + minmax works, not just that it
does. The "no hardcoded breakpoints" framing is exactly the right
way to think about intrinsic web design versus the older
media-query-driven approach.

That completes all four topics: Express Routing, JavaScript Language
Principles, EJS Partials/Pages, and Frontend CSS. You demonstrated
solid understanding across the board — especially the nuance around
<%- vs <%= escaping and the async/await error handling discussion.

====================================================================
End of Session
====================================================================
