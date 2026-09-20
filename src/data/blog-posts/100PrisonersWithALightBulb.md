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
table {
  table-layout: auto;
  border-collapse: collapse;
  margin-inline: auto;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #738aa7;
  text-align: left;
}

th {
  font-weight: 600;
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
a random prisoner and bring them to
a room containing only a single light bulb.
The prisoner will be able to observe the current state of the light bulb, 
as well as toggle it if they wish. The warden will never touch the lightbulb, and its initial state on day 1 is off. The prisoner also has the option of announcing that
all prisoners have visited the room at some point in
time. If the announcement is true, then all prisoners are set free. However, if it is false, then all the prisoners are executed. The warden leaves, and the prisoners huddle 
together to discuss their fate. Can they agree on a procedure that will guarantee their freedom in as short a time as possible?
> Note: Everyone I've talked to who was familiar with this puzzle had only ever heard of solution #2. However, there exist much better solutions, which will be proven below!

## Solutions

Solutions are presented in order of increasing complexity. 

[Solution #1: Lucky Chunks](#solution-1-lucky-chunks) <br />
[Solution #2: One Counting Prisoner](#solution-2-one-counting-prisoner) <br />
[Solution #3: Staged Counter Selection](#solution-3-staged-counter-selection) <br />
[Solution #4: Multiple Counters](#solution-4-multiple-counters) <br /> <br />

### Solution 1: Lucky Chunks
**Procedure**: The prisoners prearrange to track their time in prison in 100 day chunks. During their stay, they act as follows:
- If it is a prisoner's first time visiting the room in a given 100 day chunk, do nothing.
- If it is a prisoner's second time visiting the room in a given 100 day chunk, turn the lightbulb on.
- On the last day of each 100 day chunk, if the light bulb is off, declare that every prisoner has visited the room. Otherwise, turn the lightbulb off.

This procedure allows the prisoners to detect whether each person was brought to the room exactly once during a pre-determined 100 day chunk. If so, the light will remain off on the last day of the chunk. If any prisoner was selected more than once in the chunk, they turn the bulb on, signalling to the prisoner entering on the 100th day that there has been at least 1 repeat. That prisoner then turns the bulb off, and a new chunk of 100 days is tested. <br /> <br />
**Expected Runtime:** <br />
The expected number of days until the prisoners are free, denoted as $\mathbb{E}[X]$, can be calculated as follows:

$$
\begin{align*}
\mathbb{E}[\text{X}]
    &= \mathbb{E}\left[\text{days per chunk} * \text{number of chunks taken}\right] \\[0.3em]
    &= 100 \cdot \mathbb{E}\left[\text{number of chunks taken}\right] && \text{(days per chunk is constant)} \\[0.3em]
    &= 100 \cdot \frac{1}{Pr(\text{a single chunk is successful})} && \text{(expectation of a geometric random variable)} \\[0.8em]
    &= 100 \cdot \frac{1}{1 * 0.99 * 0.98 * 0.97 * \cdots * 0.01} \\[0.8em]
    &= \frac{100^{101}}{100!} \\[0.8em]
    &\approx 1.07 * 10^{44} \text{ days}
\end{align*}
$$
Thus, the prisoners should expect to be free in roughly $1.07 * 10^{44}$ days. This is unfortunately many orders of magnitude higher the current age of the universe. Even if our prisoners were immortal, I doubt any of them would have the patience to commit to this strategy. Let's find something better for them! <br /> <br/>

### Solution 2: One Counting Prisoner

**Procedure**: 
- The first prisoner to visit the room is designated "the counter." They keep an internal count in their head, initialized to 1.
- If a non-counter sees an off lightbulb and they have never switched the lightbulb on before, they switch it on.
- If the counter sees an on lightbulb, they increment their internal count and switch the lightbulb off.
- Once the counter's internal count reaches 100, they declare that all prisoners have visited the room.

Under this procedure, every prisoner except for the counter switches the lightbulb on exactly once. The counter's internal count tracks precisely $1$ + the number of times the lightbulb has been switched on, which forms a strict lower bound for the number of unique prisoners that have visited the room. Thus, when the count reaches 100, the counter may declare with full confidence that all prisoners have visited the room at least once.

**Expected Runtime:** <br />
To determine the expected number of days until the prisoners are free, first lets define a couple useful random variables and probabilities:
> X - Number of days until the prisoners are free <br />
> Y<sub>i</sub> - Number of days for the counter to count from i to i + 1 <br />
> Z<sub>i</sub> - Number of days for a prisoner who has not yet toggled the light to be brought in at count i <br />
> PZ<sub>i</sub> - Daily probability that a prisoner who has not yet toggled the light is brought in at count i <br />
> W<sub>i</sub> - Number of days for the counter to be brought in at count i <br />
> PW<sub>i</sub> - Daily probability that the counter is brought in at count i <br />

Notice that for the counter to count from $i$ to $i + 1$, two things must happen: a prisoner who hasn't yet toggled the light must be selected, and then the counter must be selected. Thus, $Y_i = Z_i + W_i$. Let's mark this down, and derive the expected values for $Z_i$ and $W_i$:
$$
\begin{align*}
(1) \quad &Y_i = Z_i + W_i \\[1em]
(2) \quad &\mathbb{E}\left[Z_i\right]
    = \frac{1}{\text{PZ}_{i}}
    = \frac{1}{\frac{100-i}{100}} 
    = \frac{100}{100 - i} && (\text{expectation of a geometric random variable}) \\[1em]
(3) \quad &\mathbb{E}\left[W_i\right]
    = \frac{1}{\text{PW}_{i}}
    = \frac{1}{\frac{1}{100}} 
    = 100 && (\text{expectation of a geometric random variable}) \\[1em]
\end{align*}
$$

With the above, we can now calculate $\mathbb{E}[X]$:

$$
\begin{align*}
\mathbb{E}\left[X\right]
    &= 1 + \mathbb{E}\left[\sum_{i=1}^{99}Y_i\right] \\[0.8em] 
    &= 1 + \mathbb{E}\left[\sum_{i=1}^{99}\left(Z_i + W_i\right)\right]  && \text{(using equation 1)}\\[0.8em]
    &= 1 + \sum_{i=1}^{99}\left(\mathbb{E}\left[Z_i\right]\right) +\sum_{i=1}^{99}\left(\mathbb{E}\left[W_i\right]\right) && \text{(linearity of expectation)}\\[0.8em]
    &= 1 + \sum_{i=1}^{99}\left(\frac{100}{100-i}\right) +\sum_{i=1}^{99}100 && \text{(using equations 2 and 3)}\\[0.8em]
    &= 1 + 100 \sum_{j=1}^{99}\left(\frac{1}{j}\right) + 9{,}900 && \text{(substituting $j$ for $100 - i$)}\\[0.8em]
    &= 1 + 100H_{99} + 9{,}900 && \text{(\href{https://en.wikipedia.org/wiki/Harmonic_number}{harmonic number} shorthand)}\\[0.3em]
    &\approx 1 + 100\cdot 5.177 + 9{,}900 && \text{(known value of the $99th$ harmonic number)}\\[0.3em]
    &\approx 10{,}419 \text{ days}
\end{align*}
$$

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

### Solution 3: Staged Counter Selection

**Procedure**: 
The prisoners prearrange to split their time in prison into two stages: stage $1$ will last for $100$ days, and stage $2$ will last until the prisoners are free. They then act as follows: <br />
- Stage $1$:
  - If a prisoner enters the room for the first time and the lightbulb is off, they consider themselves "counted." They are forbidden from turning the lightbulb on in the second stage.
  - If a prisoner enters the room for the second time and the lightbulb is off, they turn it on, designate themselves as "the counter," and set their internal count to the current day - $1$.
  - If a prisoner enters the room for the first time on day $100$ and the lightbulb is off, they immediately declare that all prisoners have visited the room. <br />
- Stage $2$:
  - The prisoners act identically to the *One Counter* solution, with the exception that the "counted" prisoners from above are never allowed to turn the lightbulb on.

To show intuitively why this procedure works, let's define $K$ as the first day a prisoner enters the room for the second time during stage $1$. The prisoner entering on day $K$ will know that they're the first repeat visitor because the lightbulb will still be off. They therefore also know that the number of unique visitors so far is exactly $K - 1$. If this prisoner is assigned the role of counter, and the already-counted prisoners are not allowed to touch the lightbulb in the $2$nd stage, then the counter only needs to count $100 - (K - 1)$ other prisoners during stage $2$ to have full confidence that all prisoners have visited the room.
<br />

**Expected Runtime:** <br />
We can calculate the expected runtime of this procedure by taking the weighted average of $X$ over all possible values of $K$:

$$
\begin{align*}
(4) \quad \mathbb{E}\left[X\right]
      &= \sum_{k=2}^{101}Pr\left(K=k\right)\mathbb{E}\left[X | K=k\right] \\
\end{align*}
$$

Notice that in order for the first repeat visit to happen on day $K$, the previous $K-1$ visiting prisoners must have all been distinct. Additionally, the $K$th prisoner must be non-distinct, i.e. drawn from the previous $K - 1$ prisoners. These two facts allow us to calculate $Pr(K=k)$: <br />

$$
\begin{align*}
(5) \quad Pr(K=k)
    &= Pr\left(\text{No duplicate visits in {k - 1} days}\right) \cdot Pr\left(\text{Duplicate visit on {k}th day}\right) \\[0.3em]
    &= \left(\frac{100}{100} \cdot \frac{99}{100} \cdot \frac{98}{100} \cdots \frac{(100 - (k - 2))}{100}\right) \left(\frac{k - 1}{100}\right) \\[1em]
    &= \left(\frac{100 \cdot 99 \cdot 98 \cdots (100 - (k - 2))}{100^{k - 1}}\right) \left(\frac{k - 1}{100}\right) \\[1em]
    &= \left(\frac{100 \cdot 99 \cdot 98 \cdots (102 - k)}{100^{k}}\right) \left(k - 1\right) \\[1em]
    &= \left(\frac{\frac{100!}{(101 - k)!}}{100^k}\right)\left(k - 1\right) \hspace{8em} (\text{factorial form of a falling power}) \\[1em]
    &= \frac{(k - 1)(100!)}{(100^k)(101 - k)!}
\end{align*}
$$

By the law of total probability, the sum of $Pr(K=k)$ over all possible values of $k$ must equal $1$. We can use this fact to derive the following, which will come in handy during the final calculation of $\mathbb{E}\left[X\right]$:
$$
\begin{align*}
\quad 1 &= \sum_{k=2}^{101} \frac{(k - 1)(100!)}{(100^k)(101 - k)!} &&\implies &&(\text{multiply both sides by $100$})\\[1em] 
100 &= 100\sum_{k=2}^{101} \frac{(k - 1)(100!)}{(100^k)(101 - k)!} &&\implies &&(\text{simplify}) \\[1em] 
100 &= \sum_{k=2}^{101} \frac{(k - 1)(100!)}{(100^{k-1})(101 - k)!} &&\implies &&(\text{substitute $j$ for $k - 1$}) \\[1em]
(6) \quad \quad 100 &= \sum_{j=1}^{100} \frac{j(100!)}{(100^{j})(100 - j)!}
\end{align*}
$$

The calculation of $\mathbb{E}\left[X|K=k\right]$ is similar to the calculation of $\mathbb{E}\left[X\right]$ in the one counter solution. There are, however, two important distinctions: first, a constant $100$ is added to the expectation to account for the length of the first stage, and second, the summation over $Y_i$ begins at $k - 1$ since $k - 1$ prisoners have already been accounted for during the first stage. <br />

$$
\begin{align*}
(7) \quad \mathbb{E}\left[X | K = k\right]
    &= 100 + \mathbb{E}\left[\sum_{i=k - 1}^{99}Y_i\right] \\[1em] 
    &= 100 + \mathbb{E}\left[\sum_{i=k - 1}^{99}\left(Z_i + W_i\right)\right] &&\text{(using equation 1)}\\[1em] 
    &= 100 + \sum_{i=k - 1}^{99}\left(\mathbb{E}\left[Z_i\right]\right) +\sum_{i=k-1}^{99}\left(\mathbb{E}\left[W_i\right]\right) && \text{(linearity of expectation)}\\[1em] 
    &= 100 + \sum_{i=k-1}^{99}\left(\frac{100}{100-i}\right) +\sum_{i=k-1}^{99}100 && \text{(using equations 2 and 3)}\\[1em] 
    &= 100 + 100 \sum_{j=1}^{101-k}\left(\frac{1}{j}\right) + 100 (101-k) && \text{(substituting $j$ for $100 - i$)}\\[1em] 
    &= 100 + 100(H_{101 - k}) + 100(101 - k) && \text{(\href{https://en.wikipedia.org/wiki/Harmonic_number}{harmonic number} shorthand)}\\[1em] 
    &= 100(H_{101 - k} - k + 102)
\end{align*}
$$


With all of the above, we can finally begin to calculate $\mathbb{E}[X]$:

$$
\begin{align*}
(8) \quad \mathbb{E}\left[X\right]
      &= \sum_{k=2}^{101}Pr\left(K=k\right)\mathbb{E}\left[X | K=k\right] \\
      &= \sum_{k=2}^{101}\frac{(k - 1)(100!)}{(100^k)(101 - k)!}  (100(H_{101 - k} - k + 102))  \hspace{4em} \text{(using equations $4$ and $5$)} \\[1em] 
      &= \sum_{k=2}^{101}\frac{(k - 1)(100!)}{(100^{k - 1})(101 - k)!}  (H_{101 - k} - k + 102)  \\[1em] 
      &= \sum_{j=1}^{100}\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j + 101) \hspace{6.5em} \text{(substitute $j$ for $k - 1$)} \\[1em] 
      &= \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) + 101\sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}\right) \\[1em] 
           &= \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) + 101 \cdot 100 \hspace{2.8em} \text{(using equation 6)} \\[1em] 
       \qquad &= 10{,}100 + \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) \\[1em] 
\end{align*}
$$ 
All that work and the form is still messy 😢. Let's define / derive a couple more terms that will allow us to simplify further:
$$
\begin{align*}
&(9) \quad &&a_j = \frac{100!}{(100^j)(100-j)!}  \implies \\
& \quad &&a_{j + 1} = \frac{100!}{(100^{j + 1})(99-j)!} = a_j\left(\frac{100-j}{100}\right) \implies \\[1em] 
&(10) \quad &&100(a_j - a_{j + 1}) = 100\left(a_j - a_j\left(\frac{100-j}{100}\right)\right) = j(a_j) \implies \\[1em] 
&(11)\quad  && \frac{a_{j}}{101-j} = \frac{a_{j - 1}}{100}  \\[1.5em]
&(12) \quad &&b_j = H_{100-j} - j  \implies \\[0.5em] 
& \quad &&b_{j - 1} = H_{101-j} - j + 1  \implies \\[0.5em] 
&(13) \quad &&b_j - b_{j - 1} =  H_{100-j} - j - (H_{101-j} - j + 1) = - \frac{1}{101-j}- 1 \\[0.5em] 
\end{align*}
$$ 


Starting back where we left off:
$$
\begin{align*}
\quad \mathbb{E}\left[X\right]
&= 10{,}100 + \sum_{j=1}^{100}\left(\frac{(j)(100!)}{(100^{j})(100 - j)!}  (H_{100 - j} - j)\right) \\[1em] 
&= 10{,}100 + \sum_{j=1}^{100}j(a_j)(b_j) &&\text{(using equations $9$ and $12$)} \\[1em] 
&= 10{,}100 + 100\sum_{j=1}^{100}(a_j - a_{j + 1})(b_j) &&\text{(using equation $10$)} \\[1em] 
&= 10{,}100 + 100\left(\sum_{j=1}^{100}(a_j)(b_j) - \sum_{j=1}^{100}(a_{j + 1})(b_j) \right) &&\text{(distributing $b_j$)} \\[1em] 
&= \ldots\left(\sum_{j=1}^{100}(a_j)(b_j) - \sum_{k=2}^{101}(a_{k})(b_{k - 1}) \right) &&\text{($k = j + 1$ in the second sum)} \\[1em] 
&= \ldots\left((a_1)(b_1) - (a_{101})(b_{100}) + \sum_{j=2}^{100}(a_j)(b_j - b_{j - 1}) \right) &&\text{(combining the sums)} \\[1em] 
&= \ldots\left(H_{99} - 1 + \frac{100!}{100^{100}} + \sum_{j=2}^{100}(a_j)(b_j - b_{j - 1})   \right) &&\text{(simplifying constants)}\\[1em] 
&= \ldots\left(H_{99} - 1 + \frac{100!}{100^{100}} + \sum_{j=2}^{100}(a_j)\left(- \frac{1}{101-j}- 1\right)\right) &&\text{(using equation $13$)}\\[1em] 
&= \ldots\left(H_{99} - 1 + \frac{100!}{100^{100}} + \sum_{j=2}^{100}- \frac{a_j}{101-j}- \sum_{j=2}^{100}(a_j)\right)  &&\text{(distributing $a_j$)}\\[1em] 
&= \ldots\left(H_{99} - 1 + \frac{100!}{100^{100}} + \sum_{j=2}^{100}- \frac{a_{j - 1}}{100}- \sum_{j=2}^{100}(a_j)\right) &&\text{(using equation $11$)}\\[1em] 
&= \ldots\left(H_{99} - 1 + \frac{100!}{100^{100}} - \frac{1}{100}\sum_{k=1}^{99} a_{k}- \sum_{j=2}^{100}(a_j)\right) &&\text{($k=j-1$ in the first sum)}\\[1em] 
&= \ldots\left(H_{99} - 1 + \frac{100!}{100^{100}} - \frac{101}{100}\sum_{j=2}^{99}\left(a_{j}\right) -\frac{a_1}{100} - a_{100}\right) &&\text{(combining the sums)}\\[1em] 
&\approx 10{,}100 + 100\left(4.167 - \frac{101}{100}\sum_{j=2}^{99}\left(a_{j}\right)   \right) &&\text{(combining constants)} \\[1em] 
&\approx 10{,}517 - 101 \left(\sum_{j=2}^{99}\frac{100!}{(100^j)(100-j)!}   \right) &&\text{(reverting $a_j$)} \\
&\approx 9{,}385 \text{ days}
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

The simulation once again matches up with our calculations 😊. Using this procedure, the prisoners should expect to be free in $9{,}384$ days, or roughly $25.7$ years. We were able to shave almost three years off of the standard one counter solution! <br /> <br />

### Solution 4: Multiple Counters

**Procedure:** The prisoners first define the following parameters:
> $a$: The number of sub-counters <br />
> $q$: The number of prisoners each sub-counter is responsible for counting <br />
> $s_1$: The length of the first stage <br />
> $s_2$: The length of the second stage <br />
> Note: $aq$ must equal 99

They then pick one prisoner to be the "main counter" and $a$ other prisoners to be "sub-counters." The main counter and sub-counters keep track of how many prisoners they have counted so far, denoted $count$ and initialized to $0$. Each prisoner also keeps track of two additional variables $t_1$ and $t_2$, which represents the number of times they must turn the lightbulb on in each phase. Regular prisoners initialize $t_1$ to $1$, all other instances of $t_1$ and $t_2$ are initialized to $0$: <br /> <br />
| Initial Variable Values per Prisoner Type | $t_1$ | $t_2$ | $count$
| ---| --- | --- | --- |
| Main counter | $0$ | $0$ | $0$ |
| Sub-counter | $0$ | $0$ | $0$ |
| Regular prisoner | $1$ | $0$ | N/A |
<br />

Once the setup is settled, Stages $1$ and $2$ are repeated in sequence until the head counter declares that all prisoners have visited the room. The prisoners act as follows during each stage:<br /> 

- Stage $1$:
  - If any prisoner sees an off lightbulb and has a positive $t_1$, they turn the lightbulb on and decrement $t_1$.
  - If a sub-counter sees an on lightbulb and has a $count$ less than $q$, they turn it off and increment $count$. If $count$ now equals $q$, they increment $t_2$.
  - If it is the last day of stage $1$ and the current prisoner still sees an on lightbulb after executing any relevant actions above, they turn the lightbulb off and increment $t_1$.
- Stage $2$:
  - If any prisoner sees an off lightbulb and has a positive $t_2$, they turn the lightbulb on and decrement $t_2$.
  - If the main counter sees an on lightbulb, they turn the lightbulb off and increment their internal count. If their internal count is now equal to $a$, they declare all prisoners have visited the room.
  - If it is the last day of stage $2$ and the current prisoner still sees an on lightbulb after executing any relevant actions above, they turn the lightbulb off and increment $t_2$.

Intuitively, this procedure improves on the one-counter solution by allowing multiple sub-counters to count prisoners during stage $1$. During stage $2$, the main counter counts the number of sub-counters who have counted their "quota" of $q$ prisoners. For the main counter to be sure that each prisoner has visited the room at least once, each sub-counter needs to count to $q$ in stage $1$, and the main counter needs to count to $a$ in stage $2$. With well-chosen parameters, this ends up taking significantly less time than a single counter counting to $99$.

Mathematically calculating the expected runtime of this procedure is quite difficult, if not impossible, so we rely entirely on simulation for efficiency analysis.

**Simulating the Procedure:**