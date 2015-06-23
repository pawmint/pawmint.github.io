---
layout: page
title: "Technical Kickstart"
category: deprecated
date: 2015-06-23 15:31:27
---

# Setup the project management tools:

The PAWMint team uses agile methods to develop the projects and smart tools to communicate. Before getting started with the technical job, install all communication apps :

* Box is used to save docs
* Slack is used for chatting
* Basecamp is a project management plateform
* GitHub is a cloud allowing code versioning
* Techntuts is a blog with tutorial dedicated to our project
* Googledoc is the place where we share docs
                         
All these networks will allow you to communicate with the other members of the team. Please refer to the page [Our Collaborative Platforms] (http://pawmint.github.io/techntuts/our-collaborative-platforms/) to install them all. 


# Setup a coding environment:


## Get the right OS

You need to install an appropriate OS for development on your computer:

* If you have a Mac, you are all set
* If you have Windows, you might want to install Linux in double boot. Therefore, follow carefully [this tutorial] (http://doc.ubuntu-fr.org/cohabitation_ubuntu_windows)


Once you have the right OS on your computer, it will be time for you to learn how to use the Terminal: basically, instead of using a mouse and the interface you are used to, you will communicate with your computer through command lines, in shell language. You can learn how to do this by following  [this tutorial] (http://cli.learncodethehardway.org/book/) !


## Vim (Code editor)

Vim is a code editor, you can open any file with it and modify it.

Here is a tutorial written by Romain on how to install Vim: [install Vim] (https://basecamp.com/1972788/projects/1029605/documents/8556069)
You'll find a vim basic configuration file [here] (https://gist.github.com/RomainEndelin/70e3863822e699edae40). Start with reading the `.vimrc` and following what's written in the headers. 

Then start learning the basics of Vim manipulation with http://www.labnol.org/internet/learning-vim-for-beginners/28820/ (the first link they give sounds good to me). Also make sure you have this cheatsheet open somewhere ;).

![Vim cheatsheet](https://cdn.shopify.com/s/files/1/0165/4168/files/preview.png)


## Tmux (Display tool)

Tmux is a "terminal multiplexer tool: it enables a number of terminals (or windows), each running a separate program, to be created, accessed, and controlled from a single screen." 

You'll find a tmux basic config file on [here] (https://gist.github.com/RomainEndelin/70e3863822e699edae40)
Put `.tmux.conf` in your home folder.

Then start learning how to use it with http://www.sitepoint.com/tmux-a-simple-start/, but please notice that in your setup Ctrl-B has been replaced by Ctrl-A (which is much more convenient!), and the arrows have been replaced by hjkl (vim-style).


### Pair programming on same tmux session

- To join the `ubi` tmux session with your own user session: `tmux new-session -t ubi -s <nameit>`
- To get dynamically sized windows: `tmux setw -g aggressive-resize on`


## Virtualenv (local environment builder)

A Virtual Environment is a tool to keep the dependencies required by different projects in separate places, by creating virtual Python environments for them. For example, you can work on a project which requires Django 1.3 while also maintaining a project which requires Django 1.0 by switching to one or the other isolated virtual environment.
Concretely, Virtualenv creates a folder which contains all the necessary executables to use the packages that a Python project would need. Once the Virtualenv folder exists, all you need is to activate it from your terminal and start working on your project. 

The Virtual Environment wrapper allows you to store all your Virtualenv folders (one for each Virtualenv) in the same folder.

To use Virtual Environment, first read the first 2 sections of http://simononsoftware.com/virtualenv-tutorial/, but stop before the INSTALLATION section, it's outdated. Then, follow http://www.silverwareconsulting.com/index.cfm/2012/7/24/Getting-Started-with-virtualenv-and-virtualenvwrapper-in-Python.


## SSH (secured communication protocol)

Our team bought virtual machines on Amazon, those are located in Amsterdam and Singapore. This allows us to connect and work from our local machines (used as a simple interface) on our virtual machines (which processes the programs). This communication is based on the SSH protocol, here's a very clear tutorial on how it works, and how to implement it: (http://openclassrooms.com/courses/reprenez-le-controle-a-l-aide-de-linux/la-connexion-securisee-a-distance-avec-ssh)


## GitHub (Hosting and versioning online tool)

GitHub is a hosting and versioning online space, on which you can store all your programs, share it in open source (with your colleagues or the whole world) and benefit from the talent of the geek community. You will use GitHub a lot, so you need to understand how it works. Therefore I recommend to read [this tutorial] (http://christopheducamp.com/2013/12/15/github-pour-nuls-partie-1/)


## ZSH (Shell interpreter) and Zprezto (Display designer)

ZSH is a shell interpreter, exactly like bash. Bash is the default interpreter and it's ok, but zsh is better (lol), it's much more user friendly.

Installing and configurating it is a bit painful, so you'd rather download a config file from your boss and install it this way!


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
