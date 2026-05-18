# TCSS460 Bug Reporter Frontend

## Raiden

### Toolset:

Pi (gemma4) with Ollama

### Context:

Next.JS project, frontend to OpenAPI documented route.

### Prompt:

Build a next JS frontend with a single form posting to POST /issues

### Outcome:

Agent generated a UI, using Tailwind for styling and mostly following our
OpenAPI spec. I decided the output was good enough, and moved on to edits.

Agent duplicated about half the code. Also used incorrect severity levels.
Text contrast in the form was really bad, so had to be adjusted.

Agent did not add UI feedback for errors, so I added in a flag. It was overly
reliant on `console.log` for feedback instead of UI elements.

Agent simulated API call delay, but didn't actually add a `fetch`. I added a
`fetch` call to my teams backend.

It looks like the agent built the app as more of a demo than a production app,
but with a couple notes about necessary changes for production.

## Riley Hopper

### Toolset
Claude Opus 4.7 (via claude.ai browser) and Claude Code

### Context
I provided the agent with the sprint details and description.

### Prompts

To Claude (browser):
"Could you help me make a Claude.md file for this"

To Claude Code:
"Let's make magic happen, take a look at Claude.md and ask any clarifying questions as needed"

### Outcome
The browser version of Claude first helped me construct a CLAUDE.md file for Claude Code we worked through each section together. After it produced the file, I read through it to make sure I agreed with everything.

Then I moved to Claude Code, provided it the OpenAPI spec and CLAUDE.md, and it built the frontend. Without being prompted, the agent added a "steps to reproduce" section that wasn't in either CLAUDE.md or the OpenAPI spec, so I corrected it and asked it to remove the new section. After that, the frontend was complete.

The result was a working Next.js app I was able to interact with changing the severity level, adding a description, and entering an email all worked. The app had a basic Facebook-style color scheme: white background, blue buttons.

What I'd do differently next time: I'd provide the agent with more specific code from the BE repo (an example request/response pair, or the relevant slice of the issues route handler) so it had a clearer picture of the actual route structure instead of inferring everything from the OpenAPI spec.

## Saeed

[AI Usage Report (PDF)](Esparza_AIUsage.pdf)
