# mini-kalshi

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.js
```

To type check:

```bash
bun check
```

Run `bun fmt` to format the code.

This project was created using `bun init` in bun v1.4.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

built a simplified version of Kalshi where users can create prediction markets, bet against the market creator, and receive payouts based on the final resolution.

### How it works

1. Users sign up and sign in.
2. Users add fake money to their wallet using `/onramp`.
3. A creator creates a market with a YES or NO prediction and an initial wager.
4. Other users can bet only on the opposite outcome.
5. The total amount accepted from other users cannot exceed the creator's initial wager.
6. The creator resolves the market using `/resolve`.
7. Winners receive payouts according to the 2x rule.

When the creator wins:

```
const creatorPayout =
  totalBets * 2 + (initialWager - totalBets);
```

When the creator loses:

```
const userPayout = betAmount * 2;
```

Any unmatched amount from the creator's initial wager is returned to the creator.

For simplicity, every market settles once, and only its creator can resolve it.

No payment gateway, frontend, concurrency handling, or advanced market mechanics.
