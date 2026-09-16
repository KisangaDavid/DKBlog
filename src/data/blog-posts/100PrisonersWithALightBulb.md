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
**Expected Runtime:** <br />
The expected number of days until the prisoners are free, denoted as $\mathbb{E}[X]$, can be calculated as follows:

$$
\begin{align*}
\mathbb{E}[\text{X}]
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

**Expected Runtime:** <br />
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
    &= 1 + \sum_{i=1}^{99}\left(\frac{100}{100-i}\right) +\sum_{i=1}^{99}100 && \text{(using equations 1 and 2 from above)}\\
    &= 1 + 100 \sum_{j=1}^{99}\left(\frac{1}{j}\right) + 9{,}900 && \text{(substituting $j$ for $100 - i$)}\\
    &= 1 + 100 * H_{99} + 9{,}900 && \text{(\href{https://en.wikipedia.org/wiki/Harmonic_number}{harmonic number} shorthand)}\\
    &\approx 1 + 100 * 5.177 + 9{,}900 && \text{(known value of the $99th$ harmonic number)}\\
    &\approx 10{,}419 \text{ days}
\end{align*}
$$

<br />

**Simulating the Procedure:** <br />
```py
import random

NUM_ITERATIONS = 10000
NUM_PRISONERS = 100

simulated_results = []

def num_days_for_new_prisoner(counted_prisoners):
    num_days = 1
    while True:
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner not in counted_prisoners:
            counted_prisoners.add(chosen_prisoner)
            return num_days 
        num_days += 1

def num_days_for_counter(counting_prisoner):
    num_days = 1
    while True:
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner == counting_prisoner:
            return num_days
        num_days += 1
        
for i in range(0, NUM_ITERATIONS):
    counting_prisoner = random.randint(1, NUM_PRISONERS)
    counted_prisoners = {counting_prisoner}
    num_days_for_escape, counting_prisoner_count = 1, 1
    while counting_prisoner_count < NUM_PRISONERS:
        num_days_for_escape += num_days_for_new_prisoner(counted_prisoners)
        num_days_for_escape += num_days_for_counter(counting_prisoner)
        counting_prisoner_count += 1
    simulated_results.append(num_days_for_escape)

mean = sum(simulated_results) / NUM_ITERATIONS
std_dev = (sum((x - mean) ** 2 for x in simulated_results) / NUM_ITERATIONS)**0.5

print(
    f"Mean: {mean:.0f}\n"
    f"Min: {min(simulated_results)}\n"
    f"Max: {max(simulated_results)}\n"
    f"Mean Standard Error: {std_dev / NUM_ITERATIONS**0.5:.1f}"
)
```
Output:
> Avg: 10,420 <br />
> Min: 6,978 <br />
> Max: 14,554 <br />
> Mean Standard Error: 10.0

The simulations back up our calculations! Using this procedure the prisoners should expect to be free in around $10{,}419$ days, or just over $28.5$ years. This is much more reasonable than solution #$1$, but we can still do better!
<br /> <br />
### Solution #3: Staged Counter Selection

**Procedure**: 
The prisoners prearrange to split their time in prison into two stages: stage $1$ will last for $100$ days, and stage $2$ will last until the prisoners are free. They then act as follows: <br />
- Stage $1$:
  - If a prisoner enters the interrogation room for the first time and the lightbulb is off, they consider themselves "counted." They are forbidden from turning the lightbulb on in the second stage.
  - If a prisoner enters the interrogation room for the second time and the lightbulb is off, they turn it on, designate themselves as "the counter," and set their internal count to the current day - $1$.
  - If a prisoner enters the interrogation room for the first time on day $100$ and the lightbulb is off, they immediately declare that all prisoners have visited the room. <br />
- Stage $2$:
  - The prisoners act identically to the *One Counter* solution, with the exception that the "counted" prisoners from above are never allowed to turn the lightbulb on.

To show intuitively why this procedure works, let's define $K$ as the first day a prisoner enters the interrogation room for the second time during stage $1$. The prisoner entering on day $K$ will know that they're the first repeat visitor because the lightbulb will still be off. They therefore also know that the number of unique visitors so far is exactly $K - 1$. If this prisoner is assigned the role of counter, and the already-counted prisoners are not allowed to touch the lightbulb in the $2$nd stage, then the counter only needs to count $100 - (K - 1)$ other prisoners during stage $2$ to have full confidence that all prisoners have visited the interrogation room.
<br />

**Expected Runtime:** <br />
We can calculate the expected runtime of this procedure by taking the weighted average of $X$ over all possible values of $K$:

$$
\begin{align*}
(3) \quad \mathbb{E}\left[X\right]
      &= \sum_{k=2}^{101}Pr\left(K=k\right)\mathbb{E}\left[X | K=k\right] \\
\end{align*}
$$

Notice that in order for the first repeat visit to happen on day $K$, the previous $K-1$ visiting prisoners must have all been distinct. Additionally, the $K$th prisoner must be non-distinct, i.e. drawn from the previous $K - 1$ prisoners. These two facts allow us to calculate $Pr(K=k)$: <br />

$$
\begin{align*}
(4) \quad Pr(K=k)
    &= Pr\left(\text{No duplicate visits in {k - 1} days}\right) \cdot Pr\left(\text{Duplicate visit on {k}th day}\right) \\
    &= \left(\frac{100}{100} \cdot \frac{99}{100} \cdot \frac{98}{100} \cdots \frac{(100 - (k - 2))}{100}\right) \left(\frac{k - 1}{100}\right) \\
    &= \left(\frac{100 \cdot 99 \cdot 98 \cdots (100 - (k - 2))}{100^{k - 1}}\right) \left(\frac{k - 1}{100}\right) \\
    &= \left(\frac{100 \cdot 99 \cdot 98 \cdots (102 - k)}{100^{k}}\right) \left(k - 1\right) \\
    &= \left(\frac{\frac{100!}{(101 - k)!}}{100^k}\right)\left(k - 1\right) \hspace{8em} (\text{factorial form of a falling power}) \\
    &= \frac{(k - 1)(100!)}{(100^k)(101 - k)!}
\end{align*}
$$

By the law of total probability, the sum of $Pr(K=k)$ over all possible values of $k$ must equal $1$. We can use this fact to derive the following, which will come in handy during the final calculation of $\mathbb{E}\left[X\right]$:
$$
\begin{align*}
\quad 1 &= \sum_{k=2}^{101} \frac{(k - 1)(100!)}{(100^k)(101 - k)!} &&\implies &&(\text{multiply both sides by $100$})\\  
100 &= 100\sum_{k=2}^{101} \frac{(k - 1)(100!)}{(100^k)(101 - k)!} &&\implies &&(\text{simplify}) \\ 
100 &= \sum_{k=2}^{101} \frac{(k - 1)(100!)}{(100^{k-1})(101 - k)!} &&\implies &&(\text{substitute $j$ for $k - 1$}) \\
(5) \quad \quad 100 &= \sum_{j=1}^{100} \frac{j(100!)}{(100^{j})(100 - j)!}
\end{align*}
$$

The calculation of $\mathbb{E}\left[X|K=k\right]$ is similar to the calculation of $\mathbb{E}\left[X\right]$ in the one counter solution. There are, however, two important distinctions: first, a constant $100$ is added to the expectation to account for the length of the first stage, and second, the summation over $Y_i$ begins at $k - 1$ since $k - 1$ prisoners have already been accounted for during the first stage. <br />

$$
\begin{align*}
(6) \quad \mathbb{E}\left[X | K = k\right]
    &= 100 + \mathbb{E}\left[\sum_{i=k - 1}^{99}Y_i\right] \\
    &= 100 + \mathbb{E}\left[\sum_{i=k - 1}^{99}\left(Z_i + W_i\right)\right] \\
    &= 100 + \sum_{i=k - 1}^{99}\left(\mathbb{E}\left[Z_i\right]\right) +\sum_{i=k-1}^{99}\left(\mathbb{E}\left[W_i\right]\right) && \text{(linearity of expectation)}\\
    &= 100 + \sum_{i=k-1}^{99}\left(\frac{100}{100-i}\right) +\sum_{i=k-1}^{99}100 && \text{(using equations (1) and (2))}\\
    &= 100 + 100 \sum_{j=1}^{101-k}\left(\frac{1}{j}\right) + 100 (101-k) && \text{(substituting $j$ for $100 - i$)}\\
    &= 100 + 100(H_{101 - k}) + 100(101 - k) && \text{(\href{https://en.wikipedia.org/wiki/Harmonic_number}{harmonic number} shorthand)}\\
    &= 100(H_{101 - k} - k + 102)
\end{align*}
$$


With all of the above, we are finally ready to calculate $\mathbb{E}[X]$:

$$
\begin{align*}
\quad \mathbb{E}\left[X\right]
      &= \sum_{k=2}^{101}Pr\left(K=k\right)\mathbb{E}\left[X | K=k\right] \\
      &= \sum_{k=2}^{101}\frac{(k - 1)(100!)}{(100^k)(101 - k)!}  (100(H_{101 - k} - k + 102))  \hspace{4em} \text{(substitutions using equations $4$ and 6)} \\
      &= \sum_{k=2}^{101}\frac{(k - 1)(100!)}{(100^{k - 1})(101 - k)!}  (H_{101 - k} - k + 102)  \\
      &= \sum_{j=1}^{100}\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j + 101) \hspace{6.5em} \text{(substituting $j$ for $k - 1$)} \\
      &= \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) + 101\sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}\right) \\
           &= \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) + 101 \cdot 100 \hspace{2.8em} \text{(substitution using equation 5)} \\
      &= 10{,}100 + \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) \\
      &\approx 9{,}384 \text{ days}
\end{align*}
$$ 

**Simulating the Procedure:**
```py
import random

NUM_ITERATIONS = 10000
NUM_PRISONERS = 100
PHASE_ONE_LENGTH = 100

simulated_results = []

def num_days_for_new_prisoner(counted_prisoners):
    num_days = 1
    while True:
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner not in counted_prisoners:
            counted_prisoners.add(chosen_prisoner)
            return num_days 
        num_days += 1

def num_days_for_counter(counting_prisoner):
    num_days = 1
    while True:
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner == counting_prisoner:
            return num_days
        num_days += 1

def execute_phase_one():
    counted_prisoners = set()
    for _ in range(0, PHASE_ONE_LENGTH):
        chosen_prisoner = random.randint(1, NUM_PRISONERS)
        if chosen_prisoner in counted_prisoners:
            return counted_prisoners, chosen_prisoner
        counted_prisoners.add(chosen_prisoner)
    return counted_prisoners, chosen_prisoner 
    
for i in range(0, NUM_ITERATIONS):
    counted_prisoners, counting_prisoner = execute_phase_one()
    num_days_for_escape = PHASE_ONE_LENGTH
    counting_prisoner_count = len(counted_prisoners)
    while counting_prisoner_count < NUM_PRISONERS:
        num_days_for_escape += num_days_for_new_prisoner(counted_prisoners)
        num_days_for_escape += num_days_for_counter(counting_prisoner)
        counting_prisoner_count += 1
    simulated_results.append(num_days_for_escape)

mean = sum(simulated_results) / NUM_ITERATIONS
std_dev = (sum((x - mean) ** 2 for x in simulated_results) / (NUM_ITERATIONS - 1))**0.5

print(
    f"Mean: {mean:.0f}\n"
    f"Min: {min(simulated_results)}\n"
    f"Max: {max(simulated_results)}\n"
    f"Mean Standard Error: {std_dev / NUM_ITERATIONS**0.5:.1f}"
)
```
Output:
> Avg: 9,382 <br />
> Min: 5,688 <br />
> Max: 13,734 <br />
> Mean Standard Error: 11.3


### Solution #4: Multiple Counters