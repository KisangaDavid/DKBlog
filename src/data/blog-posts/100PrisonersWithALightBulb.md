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

  .katex .vlist a {
  pointer-events: auto;
  position: relative;
  color: #3c3cc7;
  z-index: 1;
}

</style>

<div classname="centered-image-presents">

![Presents](../../assets/100PrisonersWithALightBulb.jpg)

</div>

# WIP

## The Puzzle
One hundred prisoners have been newly ushered into prison. The warden tells
them that starting tomorrow, each of them will be placed in an isolated cell,
unable to communicate with each other. Each day, the warden will choose
one of the prisoners uniformly at random and bring them to
an interrogation room containing only a single light bulb, which is initially switched off.
The prisoner will be able to observe the current state of the light bulb, 
as well as toggle it if they wish. The prisoner also has the option of announcing that
they believe all prisoners have visited the interrogation room at some point in
time. If the announcement is true, then all prisoners are set free. however, if it is false, then all the prisoners are executed. The warden leaves, and the prisoners huddle 
together to discuss their fate. Can they agree on a procedure that will guarantee their freedom in as short a time as possible?

## Solutions

Solutions are presented in order of increasing optimality / complexity. 
>Note: This puzzle is quite a bit more famous than the puzzles I typically cover - if you’re even slightly interested in logic puzzles, odds are that you’ve seen this one before. However, most sources I've come across present an unoptimal procedure (described in solution #2) as the answer. With a couple intuitive optimizations, we can do quite a bit better!

### Solution #1: Lucky Chunks
**Procedure**: The prisoners prearrange to track their time in prison in 100 day chunks. During their stay, they act as follows:
- If it is a prisoner's first time visiting the interrogation room in a given 100 day chunk, do nothing.
- If it is a prisoner's second time visiting the interrogation room in a given 100 day chunk, turn the lightbulb on.
- On the last day of each 100 day chunk, if the light bulb is off, declare that every prisoner has visited the interrogation room. Otherwise, turn the lightbulb off.

This procedure allows the prisoners to detect whether each person was brought to the interrogation room exactly once during a pre-determined 100 day chunk. If so, the light will remain off on the last day of the chunk. If any prisoner was selected more than once in the chunk, they turn the bulb on, signalling to the prisoner entering on the 100th day that there has been at least 1 repeat. That prisoner then turns the bulb off, and a new chunk of 100 days is tested. <br /> <br />
The expected number of days until the prisoners are free under this procedure can be calculated as follows:

$$
\begin{align*}
\mathbb{E}\left[\text{days until free}\right]
    &= \mathbb{E}\left[\text{days per chunk} * \text{number of chunks taken}\right] \\
    &= 100 * \mathbb{E}\left[\text{number of chunks taken}\right] && \text{(days per chunk is constant)} \\
    &= 100 * \frac{1}{Pr(\text{a single chunk is successful})} && \text{(expectation of a geometric random variable)} \\
    &= 100 * \frac{1}{1 * 0.99 * 0.98 * 0.97 * ... * 0.01} \\
    &= 100 * \frac{100^{100}}{100!} \\
    &\approx 1.07 * 10^{44} \text{ days}
\end{align*}
$$
Thus, the prisoners should expect to be free in roughly $1.07 * 10^{44}$ days. This is unfortunately many orders of magnitude higher the current age of the universe. Even if our prisoners were immortal, I doubt any of them would have the patience to commit to this strategy. Let's find something better for them! <br /> <br/>

### Solution #2: One Counting Prisoner

**Procedure**: 
- The first prisoner to visit the interrogation room is designated "the counter." They keep an internal count in their head, initialized to 1.
- If a non-counter sees an off lightbulb and they have never switched the lightbulb on before, they switch it on.
- If the counter sees an on lightbulb, they increment their internal count and switch the lightbulb off.
- Once the counter's internal count reaches 100, they declare that all prisoners have visited the interrogation room.

Under this procedure, every prisoner except for the counter switches the lightbulb on exactly once. The counter's internal count tracks precisely $1$ + the number of times the lightbulb has been switched on, which forms a strict lower bound for the number of unique prisoners that have visited the interrogation cell. Thus, when the count reaches 100, the counter may declare with full confidence that all prisoners have visited the interrogation cell at least once.


To determine the expected number of days until the prisoners are free, first lets define a couple useful random variables and probabilities:
> X - Number of days until the prisoners are free <br />
> Y<sub>i</sub> - Number of days for the counter to count from i to i + 1 <br />
> Z<sub>i</sub> - Number of days for a prisoner who has not yet toggled the light to be brought in at count i <br />
> PZ<sub>i</sub> - Daily probability that a prisoner who has not yet toggled the light is brought in at count i <br />
> W<sub>i</sub> - Number of days for the counter to be brought in at count i <br />
> PW<sub>i</sub> - Daily probability that the counter is brought in at count i <br />

Now let's find closed-form solutions for $\mathbb{E}\left[Z_i\right]$ and $\mathbb{E}\left[W_i\right]$:
$$
\begin{align*}
 (1) \quad &\mathbb{E}\left[Z_i\right]
    = \frac{1}{\text{PZ}_{i}}
    = \frac{1}{\frac{100-i}{100}} 
    = \frac{100}{100 - i} && (\text{expectation of a geometric random variable}) \\
 (2) \quad &\mathbb{E}\left[W_i\right]
    = \frac{1}{\text{PW}_{i}}
    = \frac{1}{\frac{1}{100}} 
    = 100 && (\text{expectation of a geometric random variable}) \\
\end{align*}
$$

With the above, we can now calculate $\mathbb{E}[X]$:

$$
\begin{align*}
\mathbb{E}\left[X\right]
    &= 1 + \mathbb{E}\left[\sum_{i=1}^{99}Y_i\right] \\
    &= 1 + \mathbb{E}\left[\sum_{i=1}^{99}\left(Z_i + W_i\right)\right] \\
    &= 1 + \sum_{i=1}^{99}\left(\mathbb{E}\left[Z_i\right]\right) +\sum_{i=1}^{99}\left(\mathbb{E}\left[W_i\right]\right) && \text{(linearity of expectation)}\\
    &= 1 + \sum_{i=1}^{99}\left(\frac{100}{100-i}\right) +\sum_{i=1}^{99}100 && \text{(using equations (1) and (2) from above)}\\
    &= 1 + 100 \sum_{j=1}^{99}\left(\frac{1}{j}\right) + 9{,}900 && \text{(substituting $j$ for $100 - i$)}\\
    &= 1 + 100 * H_{99} + 9{,}900 && \text{(definition of a \href{https://en.wikipedia.org/wiki/Harmonic_number}{harmonic number})}\\
    &\approx 1 + 100 * 5.177 + 9{,}900 && \text{(known value of the $99th$ harmonic number)}\\
    &\approx 10{,}419 \text{ days}
\end{align*}
$$

We can sanity-check our calculations by simulating the procedure a couple thousand times:
```py
import random

NUM_ITERATIONS = 1000
NUM_PRISONERS = 100

simulated_results = []

def num_days_for_new_prisoner(counting_prisoner, flipped_light_prisoners):
    num_days = 1
    while True:
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner in flipped_light_prisoners or chosen_prisoner == counting_prisoner:
            num_days += 1
            continue
        flipped_light_prisoners.add(chosen_prisoner)
        return num_days

def num_days_for_counter(counting_prisoner):
    num_days = 1
    while True:
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner != counting_prisoner:
            num_days += 1
            continue
        return num_days

for i in range(0, NUM_ITERATIONS):
    flipped_light_prisoners = set()
    counting_prisoner = random.randint(1, NUM_PRISONERS)
    num_days_for_escape, counting_prisoner_count = 1, 1
    while counting_prisoner_count < NUM_PRISONERS:
        num_days_for_escape += num_days_for_new_prisoner(counting_prisoner, flipped_light_prisoners)
        num_days_for_escape += num_days_for_counter(counting_prisoner)
        counting_prisoner_count += 1
    simulated_results.append(num_days_for_escape)

mean = sum(simulated_results) / NUM_ITERATIONS
std_dev = (sum((x - mean) ** 2 for x in simulated_results) / NUM_ITERATIONS)**0.5

print(
    f"Avg: {mean:.0f}\n"
    f"Min: {min(simulated_results)}\n"
    f"Max: {max(simulated_results)}\n"
    f"Std Deviation: {(sum((x - mean)**2 for x in simulated_results) / NUM_ITERATIONS)**0.5:.0f}"
)
```
Output:
> Avg: 10,412 <br />
> Min: 7,418 <br />
> Max: 14,379 <br />
> Std Deviation: 998

The simulations back up our calculations! Using this procedure the prisoners should expect to be free in around $10{,}419$ days, or just over $28.5$ years. This is much more reasonable than solution #$1$, but we can still do better!
<br /> <br />
### Solution #3: PLACEHOLDER
**Procedure**:
PLACEHOLDER