# Quick-Generator

Woohoo! Version 2.0 is here!

A *decently* fast way to generate a node project

### Usage

Quick-generator now implements sub commands!

I've also added support for yarn, so the app will now see check to see that you have yarn and if you do, it prefers it to the standard npm



##### Basics

`qg <command> [options] [project]`



##### commands

`qg repo` creates a git repo at the specified directory, and with the options specified

`qg init` creates just the directory with the options specified



##### options

- `node` creates a node project and initializes it
- `electron` creates an electron project and initializes it
- `express` creats an express project and initializes it
- `micro` creates a micro project (zeit/micro) and initializes it
- `go` creates a go project