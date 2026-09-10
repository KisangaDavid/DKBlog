---
title: "Puzzle: 100 Prisoners and a Light Bulb"
slug: 100-prisoners-1-lightbulb
publishDate: September 12, 2026
description: One hundred prisoners have been newly ushered into prison. The warden tells them that starting tomorrow, each of them...
---

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

  .centered-image-presents img {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.7em;
    max-height: 32em;
    object-fit: contain;
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

  .katex {
    overflow-x: auto;
  }

</style>

<div classname="centered-image-presents">

![Presents](../../assets/100PrisonersWithALightBulb.jpg)

</div>

## The Puzzle
One hundred prisoners have been newly ushered into prison. The warden tells
them that starting tomorrow, each of them will be placed in an isolated cell,
unable to communicate with each other. Each day, the warden will choose
one of the prisoners uniformly at random and bring them to
an interrogation room containing only a single light bulb.
The prisoner will be able to observe the current state of the light bulb, 
as well as toggle it if they wish. The prisoner also has the option of announcing that
they believes all prisoners have visited the interrogation room at some point in
time. If this announcement is true, then all prisoners are set free, but if it is
false, all prisoners are executed. The warden leaves, and the prisoners huddle 
together to discuss their fate. Can they agree on a procedure that will guarantee their freedom in as short a time as possible?

## Solutions

Solutions are presented in order of increasing optimality / complexity. 
>Note: This puzzle is quite a bit more famous than the puzzles I typically cover - if you’re even slightly interested in logic puzzles, odds are that you’ve seen this one before. However, most sources I've come across present an unoptimal procedure (described in solution #2) as the answer. With a couple intuitive optimizations, we can do quite a bit better!

### Solution #1: Lucky Combinations
and decide to act as follows:If the highest numbered box that contains a present is odd, there are still plenty of scenarios in which Alice wins. Take, for example, the scenario where the two highest numbered boxes with presents in them are boxes 80 and 81. Alice reveals all 26 presents in 81 seconds, but it will take Bob 90 seconds to do the same (50 seconds to uncover all the odd boxes, and then 40 more seconds to uncover even boxes until he uncovers box 80).

By looking at the two scenarios above, we can intuitively conclude that Alice should be more likely to reveal all 26 presents first.
