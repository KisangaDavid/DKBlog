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

If the highest numbered box that contains a present  is even, Bob cannot win. This is because both
Alice and Bob will reveal the 26th present precisely when they open this box. Since Alice opens all
even boxes before Bob (with the small exception box box 100, which they both open at the same time), she is guaranteed to never lose in this scenario.

<br />

If the highest numbered box that contains a present is odd, there are still plenty of scenarios in which Alice wins. Take, for example, the scenario where the two highest numbered boxes with presents in them are box 80 and 81. Alice will reveal all 26 presents in 81 seconds, but it will take Bob 90 seconds to do the same (50 seconds to uncover all the odd boxes, and then 40 more seconds to uncover even boxes until he uncovers box 80).

<br />

By looking at the two scenarios above, we can reasonably conclude that Alice should be more likely to reveal all 26 presents first.

<br /> 

## Rigorous Solution

Intuition is nice and all, but cold hard numbers are better! We begin our rigorous solution by calculating the exact probabilities of the two cases outlined above - the highest numbered box that contains a present is even / odd. First, let's define three terms that will be used extensively in the rest of this writeup:
>$i$: the highest numbered box that contains a present <br />
>$p$: the probability a given box contains a present, (0.26) <br />
>$q$: the probability a given box does not contain a present, (0.74) <br />

With our terms defined, we can now calculate the aforementioned probabilities:

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



It follows from the above that the probability of $i$ being odd is 0.4253.

<br />

Additionally, let's calculate the probability that all 26 presents happen to be placed into even boxes:

$$

\Pr(\text{all 26 presents are in an even box})= \\\\[0.5cm]
\quad \frac{\text{\# of configurations where all 26 presents are in even boxes}}{\text{\# of total configurations possible}} = \\\\[0.5cm]
\quad \frac{\binom{50}{26}}{\binom{100}{26}} = \\\\[0.5cm]
1.73*10^{-10}

$$

As there are the same amount of even and odd boxes, the probability that all 26 boxes happen to be placed into odd boxes is also $1.73*10^{-10}$. Since these probabilities are ***extremely*** small, I'll save us some time and digital paper by disregarding these scenarios in future calculations - including them wouldn't make a noticable difference in our final computed probabilities.

<br />

Finally, let's calculate the amount of time it takes Alice and Bob to reveal all 26 presents. For this, we'll define two additional terms: <br />
>$e$: the highest even-numbered box that contains a present <br />
>$o$: the highest odd-numbered box that contains a present <br />

Defining these terms makes calculating how long it takes each participant to reveal all 26 presents simple - Alice will reveal the 26th present in exactly $\text{max}(e, o)$ seconds, while 
Bob will reveal the 26th present in exactly $50 + \frac{e}{2}$ seconds (Bob reveals all 50 odd boxes first, then reveals all even boxes
sequentially until he reveals box $e$).


Armed with the above information, we can now begin calculating the exact probability that Bob reveals all 26 presents first.

<br />
<br />

### Calculating Bob's Probability to Win

First, we split the possible configurations of presents into two cases, $e$ > $o$, and $e$ < *0*. 

**e > o:** <br />
Alice will reveal all 26 presents in $e$ seconds, and Bob will reveal all 26 presents in $50 + \frac{e}{2}$ seconds. For any $e \leq 100$, $e \leq 50 + \frac{e}{2}$. Therefore, Bob can never win in this scenario.

**e < o:** <br />
Alice will reveal all 26 presents in $o$ seconds, and Bob will reveal all 26 presents in $50 + \frac{e}{2}$ seconds. Therefore, Bob wins if $50 + \frac{e}{2} < o$. We can calculate Bob's overall probability of winning by calculating his probability of winning for each distinct value of e, and then summing them all together:

$$
\begin{align*}
\Pr(\text{Bob wins}) &\approx \sum_{x \in E}\Pr(e=x)\Pr(o>50+\frac{x}{2}) \\[0.4cm]
&=\sum_{n=1}^{50}\Pr(e=2n)\Pr(o>50+n) \\
\end{align*}
$$

Note that this probability is technically an approximation, as joint probabilities can only be calculated by multiplying individual probabilities if the random variables in question are *independent* - in this case, $e$ and $o$ actually have a (very) weak inverse correlation. To understand the inverse correlation intuitively, imagine that $e = 2$. This means that there are 25 odd boxes with presents in them, immediately forcing $o > 50$. This constraint does not exist if $e=100$. Luckily for us, this correlation only becomes noticable for very low values of $e$ and $o$. These scenarios are extremely unlikely, so treating $e$ and $o$ as independent random variables will not noticebly skew our final computed probabilities.

<br />

With that out of the way, let's breakdown $\Pr(e=2n)$ into something we can actually calculate:

$$
\begin{align*}
\Pr(e=2n) &= \Pr(\text{Box 2n has a present}) \\
  &\quad * \Pr(\text{Box 2n+2 does not have a present}) \\
  &\quad * \Pr(\text{Box 2n+4 does not have a present}) \\
  &\quad * \cdots \\
  &\quad * \Pr(\text{Box 100 does not have a present}) \\
&=(p)(q)^{50-n} 
\end{align*}
$$

<br />

We'll do the same for $\Pr(o > 50 + n)$:

$$
\begin{align*}
\Pr(o > 50 + n) &= 1 -\Pr(o <= 50 + n) \\
  &= 1 - \Pr(\text{No odd numbers higher than 50 + n are included}) \\
  &= 1 - q^{\text{\# of odd numbers between n and 100}} \\
  &= 1 - q^{\lfloor\frac{50-n}{2}\rfloor} \\
\end{align*}
$$

<br />

With all of the above, we can finally calculate Bob's probability of revealing all 26 presents first:

$$
\begin{align*}
\Pr(\text{Bob wins})
&=\sum_{n=1}^{50}\Pr(e=2n)\Pr(o>50+n) \\
&=\sum_{n=1}^{50}(p)(q)^{50-n}(1 - q^{\lfloor\frac{50-n}{2}\rfloor}) \\
&= 0.2394
\end{align*}
$$

<br />

### Calculating Alice's Probability of Winning

We again split the possible configurations of presents into two cases, $e$ > $o$, and $e$ < *0*.

**e > o:** <br />
Alice will reveal all 26 presents in $e$ seconds, and Bob will reveal all 26 presents in $50 + \frac{e}{2}$ seconds. For any $e < 100$, $e < 50 + \frac{e}{2}$. Therefore, Alice will win as long as $e \neq 100$.

$$
\begin{align*}
\Pr(\text{Alice wins} \mid e > o) &= \Pr(e \neq 100 \mid e > o) \\[0.2cm]
&=1 - \Pr(e = 100 \mid e > o) \\[0.2cm]
&=1 - \frac{\Pr(e > o \mid e=100)\Pr(e = 100)}{\Pr(e > o)} \qquad \text{(Bayes' Theorem)} \\[0.2cm]
&=1 - \frac{(1)(0.26)}{(0.5747)} \\[0.2cm]
&= 0.5476
\end{align*}
$$

From the above, if $e> o$, Alice will reveal all 26 presents first 54.76% of the time.

**e < o:** <br />
Alice will reveal all 26 presents in $o$ seconds, and Bob will reveal all 26 presents in $50 + \frac{e}{2}$ seconds. Therefore, Alice wins if $50 + \frac{e}{2} > o$.

<br />



### Lemma #3: If the nim-sum of a position is not 0, there always exists a move that results in a position with a nim-sum of 0

> This lemma is a little more involved. First, let's define the
> shorthand *X<sub>y</sub>*. This is the value of the bit in 
> position *y* of *X's* binary representation. We'll 
> additionally define *N* to be the nim-sum of all of the 
> remaining piles, and $i$ to be the position of the most 
> significant 1 bit in *N*. 

<div classname="centered-image with-border">

![Puzzle Poll](../../assets/26PresentsPoll.png)
<div classname="caption-text">
Twitter poll that reveals more than 80% of people were bamboozled by this puzzle!
</div>
</div>

<br />



