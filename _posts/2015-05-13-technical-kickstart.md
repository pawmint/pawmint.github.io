---
layout: page
title: "Technical Kickstart"
category: tools
date: 2015-05-13 15:31:27
---

# Setup the project management tools:

The PAWMint team uses agile methods to develop the projects and smart tools to communicate. Before getting started with the technical job, install all communication apps :

* Box is used to save docs
* Slack is used for chatting
* Basecamp is a project management plateform
* GitHub is a cloud allowing code versioning
* Techntuts is a blog with tutorial dedicated to our project
* Googledoc is the place where we share docs
                         
All these networks will allow you to communicate with the other members of the team. 

# Setup a coding environment:


## Get the right OS

You need to install an appropriate OS for development on your computer:

* If you have a Mac, you are all set
* If you have Windows, you might want to install Linux in double boot. Therefore, follow carefully [this tutorial] (http://doc.ubuntu-fr.org/cohabitation_ubuntu_windows)

Once you have the right OS on your computer, it will be time for you to learn how to use the Terminal: basically, instead of using a mouse and the interface you are used to, you will communicate with your computer through command lines, in shell language. You can learn how to do this by following  [this tutorial] (http://cli.learncodethehardway.org/book/) !

## Vim

Vim is a code editor. Here is a tutorial written by Romain on how to install Vim: [install Vim] (https://basecamp.com/1972788/projects/1029605/documents/8556069)

You'll find a vim basic configuration file [here] (https://gist.github.com/RomainEndelin/70e3863822e699edae40). Start with reading the `.vimrc` and following what's written in the headers. 


Then start learning the basics with http://www.labnol.org/internet/learning-vim-for-beginners/28820/ (the first link they give sounds good to me). Also make sure you have this cheatsheet open somewhere ;).

![Vim cheatsheet](https://cdn.shopify.com/s/files/1/0165/4168/files/preview.png)


## Tmux

You'll find a tmux basic config file on [here] (https://gist.github.com/RomainEndelin/70e3863822e699edae40)


Put `.tmux.conf` in your home folder.

Then start learning how to use it with http://www.sitepoint.com/tmux-a-simple-start/, but please notice that in your setup Ctrl-B has been replaced by Ctrl-A (which is much more convenient!), and the arrows have been replaced by hjkl (vim-style).

### Pair programming on same tmux session

- To join the `ubi` tmux session with your own user session: `tmux new-session -t ubi -s <nameit>`
- To get dynamically sized windows: `tmux setw -g aggressive-resize on`

## Pair programming:

TODO

## Virtualenv:

First read the first 2 sections of http://simononsoftware.com/virtualenv-tutorial/, but stop before the INSTALLATION section, it's outdated. Then, follow http://www.silverwareconsulting.com/index.cfm/2012/7/24/Getting-Started-wit….

## GitHub

You will use GitHub a lot, so you need to understand how it works. Therefore I recommend to read [this tutorial] (http://christopheducamp.com/2013/12/15/github-pour-nuls-partie-1/)

## ZSH

TODO (create a ready to use dotfile)

# LIST OF ALL TUTORIALS mentionned above

* Linux Dual Boot: http://doc.ubuntu-fr.org/cohabitation_ubuntu_windows
* Install Vim: https://basecamp.com/1972788/projects/1029605/documents/8556069)
* Use Vim: http://www.labnol.org/internet/learning-vim-for-beginners/28820/ 
* Install Tmux: https://basecamp.com/1972788/projects/1029605/documents/8556069)
* Use Tmux: http://www.sitepoint.com/tmux-a-simple-start/
* Install Virtualenv: http://www.silverwareconsulting.com/index.cfm/2012/7/24/Getting-Started-wit….
* Use GitHub: http://christopheducamp.com/2013/12/15/github-pour-nuls-partie-1/)


# Get started with the hardware part!

Now your computer and you are ready to face the most interesting: [Getting Started with the Gateway] (http://christopheducamp.com/2013/12/15/github-pour-nuls-partie-1/)
