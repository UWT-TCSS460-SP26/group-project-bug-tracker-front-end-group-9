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