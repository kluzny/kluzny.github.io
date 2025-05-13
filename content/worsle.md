---
date: 2025-05-13
title: 'Worsle'
description: 'A Worse Wordle Variant'
---

# {{ $doc.title }}

## {{ $doc.description }}
In traditional Wordle, you have 6 chances to guess a secret word. While fun, this bite size game can often be completed in mere moments. Worsle is designed to exhaust, not only the player, but also the wordlist. 

Like traditional Wordle, correctly guessing one of the letters will show a yellow background and correctly guessing both the letter *and* it's position will color the background green. 

Worsle makes the game longer and more challenging by cheating. Upon a correct final guess, if there are still words that meet the correctly guess letter combinations, it will cheat until it can't find any new words with the same letters.

e.g. Let's say you have the matching letters `_ a b l e` guessing correctly the word `c a b l e` would normally win the game, but as long as `t` has not already been ruled out, the word will switch to `t a b l e`. This process continues until your final guess is the last possible valid word. The player is not limited to only 6 tries, but only wins once all possible word variants have been discovered.


## Special Thanks

* Josh Wardle - the inventor or Wordle
* Word List provided by [tabatkins/wordle-list](https://github.com/tabatkins/wordle-list)