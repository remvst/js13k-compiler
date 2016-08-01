# JS13K game compiler

Compiles games and optimizes them more than regular minifiers.
Also allows writing readable code with readable variable names and functions.

**DO NOT USE FOR REGULAR PROJECTS**

The script analyzes your source files and looks for common words in order to replace them with much shorter variable names.

It also creates the zip to submit as well as files for testing.

## Installation

Clone the repository, then run `npm install`.

## Usage

In `config.json`, set the `INPUT` and `OUTPUT` options, then run `npm run build`.

See the `samples/` directory to see the expected input/output.
