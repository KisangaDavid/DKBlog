---
title: "Puzzle: Charlie's Presents"
slug: CharliesPresents
publishDate: November 30, 2025
description: Charlie puts 26 presents in 100 boxes, labeled 1 to 100. Each second, Alic and Bob look in one box. Alice opens them in order...
---
<div classname="centered-image">

![Rooster](../../assets/roosterRiddleThumbnail.png)
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
Charlie puts 26 presents in 100 boxes, labeled 1 to 100. Each second, Alice and Bob look in one box. Alice opens them in order (1,2,3,...), while Bob opens the odds first, then the evens (1,3,5,...,2,4,6,...) Who is more likely to see all 26 presents first?

  
## Intuitive Solution

To get a sense of what the answer is, we can break down the puzzle into two cases: the case where the highest numbered box that contains a present is even, and the case where the highest numbered box that contains a present is odd. The probability of each case is *roughly* 50% (although not quite, which we'll prove in the following section). 

<br />

If the highest numbered box that contains a present (box *i*) is even, Bob cannot win. This is because both
Alice and Bob will reveal the 26th present precisely when they open box *i*. Since Alice opens all
even boxes before Bob (with the small exception box box 100, which they both open at the same time), she is guaranteed to never lose in this scenario.

<br />

If the highest numbered box that contains a present is odd, there are still plenty of scenarios in which Alice wins. Take, for example, the scenario where the two highest numbered boxes with presents in them are box 80 and 81. Alice will reveal all 26 presents in 81 seconds, but it will take Bob 90 seconds to do the same (50 seconds to uncover all the odd boxes, and then 40 more seconds to uncover even boxes until he uncovers box 80).

<br />

By looking at the two scenarios above, we can reasonably conclude that Alice should be more likely to reveal all 26 presents first.

<br /> 

## Rigorous Solution

Intuition is nice and all, but cold hard numbers are better! We begin our rigorous solution by calculating the exact probabilities of the two cases outlined above - the highest numbered box that contains a present (box *i*) is even / odd. Note that from here on out, *p* is assigned the probability that a given box contains a present (0.26), and *q* is assigned the probability that a given box does not contain a present (0.74):

$$
\begin{align*}
\Pr(\text{i is even})
    &= \Pr(\text{Box 100 has a present}) \\
    &\quad + \Pr(\text{Box 98 has a present and boxes 99 and 100 do not}) \\
    &\quad + \Pr(\text{Box 96 has a present and boxes 97--100 do not}) \\
    &\quad + \cdots \\
    &\quad + \Pr(\text{Box 26 has a present and boxes 27--100 do not}) \\
    &=(p) \\
    &\quad +(p)(q)^2 \\
    &\quad +(p)(q)^4 \\
    &\quad + \cdots \\
    &\quad +(p)(q)^{74} \\
    &= \frac{p(1 - q^{37})}{1 - q^{2}} \quad \text{(Sum of geometric series with }q^2\text{ as the common ratio)}\\
    &= 0.5747
\end{align*}
$$

Using the above, we can trivially derive the probability of *i* being odd to be 0.4253.

Say something about all even / all odd. Big ol' formula . Disregard. as will not make a significant difference in our probabilities
Armed with the above information, we can now begin calculating the exact probability that Bob reveals all26 presents first:

<br />

### Calculating Bob's Probability to Win
split into 3 cases, all even, all odd, mix. All even = Bob never wins, all odd = Bob always wins, case when mixed: 
<br />

> Alice will open any even numbered *e* in *e* seconds, while Bob will open any even numbered box *e* in (50 + *e* / 2) seconds. *e* < (50 + *e* / 2) for any *e* < 100, and *e* = (50 + *e* / 2) for *e* = 100.


Therefore, if the highest numbered box that contains a present is even, Alice will reveal all 26 presents first. 


<br />
<br />

### Case 2: The highest numbered box that contains a present is odd

In this case, it is not guaranteed that Bob will reveal the 26th present precisely when he opens box *i* - since he 
Therefore, there are many scenarios where Alice reveals the 26th present much earlier than Bob. - for example if 
the 2 highest  were 50 and 51.

<br />

### Calculating Bob's Probability of Winning

<br />

$$
\text{Result}= \sum_{n=2}^{37}p\, q^{n}\!\left(1 - q^{\lfloor n/2 \rfloor}\right)
$$

### Putting it Together: 
<br />

### Lemma #3: If the nim-sum of a position is not 0, there always exists a move that results in a position with a nim-sum of 0

> This lemma is a little more involved. First, let's define the
> shorthand *X<sub>y</sub>*. This is the value of the bit in 
> position *y* of *X's* binary representation. We'll 
> additionally define *N* to be the nim-sum of all of the 
> remaining piles, and *i* to be the position of the most 
> significant 1 bit in *N*. 

<div classname="centered-image with-border">

![Puzzle Poll](../../assets/26PresentsPoll.png)
<div classname="caption-text">
Twitter poll that reveals more than 80% of people were bamboozled by this puzzle!
</div>
</div>

$$
\text{Result}= \sum_{n=2}^{37}p\, q^{n}\!\left(1 - q^{\lfloor n/2 \rfloor}\right)
$$

<br />



