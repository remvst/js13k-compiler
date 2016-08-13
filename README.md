# JS13K game compiler

Compiles games and optimizes them more than regular minifiers.
Also allows writing readable code with readable variable names and functions.

**DO NOT USE FOR REGULAR PROJECTS**

The script analyzes your source files and looks for common words in order to replace them with much shorter variable names.

It also creates the zip to submit as well as files for testing.

## Installation

Clone the repository, then run `npm install`.

## Usage

See the `samples/` directory for an example config file, as well the expected input/output.

Create a config file, then run `bin/build your-config.json`.
