---
layout: page
title: "Technical Kickstart"
category: tools
date: 2015-05-13 15:31:27
---

# Setup a coding environment (the vim way):

    Note: That's a very rough guide...

You'll find a vim and tmux basic config file on : https://gist.github.com/RomainEndelin/70e3863822e699edae40

## Vim

Start with reading the `.vimrc` (and following what's written in the headers). Then start learning the basics with http://www.labnol.org/internet/learning-vim-for-beginners/28820/ (the first link they give sounds good to me). Also make sure you have this cheatsheet open somewhere ;).

![Vim cheatsheet](https://cdn.shopify.com/s/files/1/0165/4168/files/preview.png)

## Tmux

Put `.tmux.conf` in your home folder. Start with http://www.sitepoint.com/tmux-a-simple-start/, but please notice that in your setup Ctrl-B has been replaced by Ctrl-A (which is much more convenient!), and the arrows have been replaced by hjkl (vim-style).

### Pair programming on same tmux session

- To join the `ubi` tmux session with your own user session: `tmux new-session -t ubi -s <nameit>`
- To get dynamically sized windows: `tmux setw -g aggressive-resize on`

## Pair programming:

TODO

## Virtualenv:

First read the first 2 sections of http://simononsoftware.com/virtualenv-tutorial/, but stop before the INSTALLATION section, it's outdated. Then, follow http://www.silverwareconsulting.com/index.cfm/2012/7/24/Getting-Started-wit….

## ZSH

TODO
