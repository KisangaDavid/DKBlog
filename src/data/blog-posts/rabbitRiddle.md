---
title: "Puzzle: Jumping Rabbits"
slug: rabbitRiddle
publishDate: December 30, 2025
description: You are called upon to reorganize a group of rabbits. The rabbits are initially lined up in a single-file row as shown below...
---
<div classname="centered-image">

![Rooster](../../assets/rabbitRiddleThumbnail.png)
</div>

<style>
  p {
    margin-bottom: 0em;
  }

pre {
  line-height: 0.9em;
  display: block;
  margin: 0 auto;
}
  h2 {
    margin-bottom: 1em;
    font-size: 2em;
  }

  .caption-text {
    font-size: 0.9em;
    line-height: 1.5em;
    text-align: center;
    margin-right: 1em;
    margin-left: 1em;
    margin-top: 0em;
    color: var(--text-secondary);
  }

  .centered-image img {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.7em;
  }

  .with-border img {
    border-radius: 8px;
    border: 1px solid black;
  }

  .image-container {
    display: flex;
    gap: 0.5%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .image-container .double-image-and-caption {
    display: flex;
    width: 49.75%;
    flex-direction: column;
    margin-bottom: 0em;
  }
</style>
## Puzzle
You are called upon to reorganize a group of rabbits. The rabbits are initially lined up in a single-file row as shown below:

<div classname="centered-image">

![Row of rabbits](../../assets/rabbitRow.png)
<div classname="caption-text">
Three white rabbits facing right, one empty spot, and then three black rabbits facing left.
</div>
</div>

<br />


The rabbits may move as follows:
1. A rabbit may only move in the direction it is facing.

2. A rabbit may move one space forward to an open spot, or it may jump over one other rabbit to reach an open spot.

Following the above rules, can you rearrange the rabbits so that all the black rabbits end up on the left and all the white rabbits end up on the right?

[Try the interactive version of the puzzle here!](https://theriddleman.com/rabbitRiddle)

<br />

## Solution

The key trick to this puzzle is that the rabbits must be "interwoven". That is, we should never perform a move that puts two rabbits of the same color next to each other (until they reach their ending positions). This prevents deadlocks, situations in which there are no valid moves. That's it! Performing moves that interweave the rabbits and prevent premature deadlocks naturally leads to the solution:

<div classname="centered-image with-border">

![Rabbit Riddle solution](../../assets/rabbitSolution.gif)
<div classname="caption-text">
Animation showing the solution
</div>
</div>

<br />