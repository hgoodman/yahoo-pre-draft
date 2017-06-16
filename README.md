[![Build Status](https://travis-ci.org/hgoodman/yahoo-pre-draft.svg?branch=master)](https://travis-ci.org/hgoodman/yahoo-pre-draft)
[![Chrome Extension](https://img.shields.io/badge/chrome-extension-blue.svg)](https://chrome.google.com/webstore/detail/pre-draft-rankings-for-ya/lopaeiabeananjanjciigpdemchnmona)

## Pre-Draft Rankings Clipboard for Yahoo Fantasy Sports

Tired of manually selecting preferred players for your fantasy sports draft? This extension lets you copy and paste player names from your custom cheatsheet and load them into the Yahoo pre-draft interface. Here's how it works:

Navigate to "Draft" > "Pre-Draft Rankings" from the menu and click "Edit My Pre-Draft Player Rankings". Click the button to expand the default player list and paste your player names in the provided text box. Click "Next" to organize your player list and then click to search for players and queue them to be added to your list. Click "Save Changes" when your players have been added to the queue. All done!

This extension is for those who choose to auto-draft and/or those who get their cheatsheets from third-party sites like fantasypros.com.

Source code is available at:
github.com/hgoodman/yahoo-pre-draft

This is a third-party extension, not supported by Yahoo!

## Releases

### 0.1.0
* First release for fantasy football

### 0.2.0
* Add support for Yahoo fantasy sports other than football
* Add alternate spellings for a couple hockey players and several baseball players
* Improve player name matching:
  * Convert accented characters with diacritics to ASCII equivalents
  * Treat hyphens as spaces
  * Ignore case
* Add gulpfile and spec tests

### 0.2.1
* Overhaul name matching system to account for alternate spellings of common first names

### 0.2.2
* Fix bug introduced in 0.2.1
