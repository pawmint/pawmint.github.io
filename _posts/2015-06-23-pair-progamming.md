---
layout: page
title: "Pair progamming: Tmux"
category: workflow
date: 2015-06-23 05:00:00
---

# Pair programming over a terminal

Run `ssh -R *:6900:localhost:22 -i ~/.ssh/pawmint_rsa pawm@normandie.ubismart.org` on your computer, so other users can access it by `ssh USER@normandie.ubismart.org -p 6900`.

You probably don't want your coworker to connect as your main user. Create a tmux user, and initialize its ssh authorization. We will basically add your coworkers' key to your ssh authorized_key, from their github account:

```bash
$ adduser tmux
$ su tmux
$ mkdir ~/.ssh
$ touch ~/.ssh/authorized_keys
$ chmod 700 ~/.ssh
$ chmod 600 ~/.ssh/authorized_keys
$ gem install github-auth
$ gh-auth add --users=johndoe
```

Now your coworkers can connect through `ssh tmux@normandie.ubismart.org -p 6900`

Lastly, you actually want to share your terminal with your coworker, using *tmux*. You should actually use [Wemux](https://github.com/zolrath/wemux). It's a tmux enhancement with lot of facilities for sharing session. Check out their README.

Host will start the session with `wemux start`. Clients will join with `wemux mirror` (read-only), `wemux pair` (read-write, but sticked to the host current window) or `wemux rogue` (completely free). You can even configure the tmux user's `bashrc`, so that the clients will join your session automatically (https://github.com/zolrath/wemux#automatic-ssh-client-modes).

# Pair programming among several editor

**/!\ Not yet tested /!\ **

Have a look at [Floobits](https://floobits.com). It seems to handle Neovim, Emacs, Sublime Text & IntelliJ IDEA, plus a web-editor for those who want.

# Sharing your local webserver

TODO

# Screen-sharing

If you are using Google Chrome, you can share your screen using Appear.in or Google Hangout, as described in the [visioconf section](/techntuts{% post_url 2015-06-23-communication %}#visioconf).

# Good practices of pair programming

Common problem while connected to the same session is the window synchronisation. The users cannot edit different `tmux` windows. Let's get more freedom!

**Open the session:** After connecting to the remote server execute:

```shell
tmux new-session -t <target session> -s <new session>
```

* `target session` is the name of the current session you want to connect

* `new session` is a new identifier (e.g. append your name)

When you work like this, you may want activate **aggressive resize** so that each user always gets the biggest screen size possible depending on who is sharing that screen: `tmux setw -g aggressive-resize on`.

**Disconnect from the session:** as usual _PREFIX_ `d`, in our setup: `Ctrl+a d`

**Reconnect to the session:** as usual

```shell
tmux attach -t <target session name>
```

**List sessions:**

```shell
tmux ls
```

**Cancel (close, kill) the session:** _PREFIX_ `:` and type "kill-session", in our setup: `Ctrl+a :kill-session` or command-line:

```shell
tmux kill-session                          # closes the current session
tmux kill-session -t <target session name> # from any shell
```

For a **completely independent session** (no shared windows) you can copy the project:

```shell
tmuxinator copy <project name> <new name>
```

* `project name` is usually the same as the `target session`, to see project names use `tmuxinator list`
