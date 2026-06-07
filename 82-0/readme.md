# 🏀 82-0: The Perfect Season

**82-0** is a browser-based NBA roster-building game. Draft five legends across different eras via a slot machine, then simulate an 82-game season to see if your team can achieve a perfect undefeated record.

**[▶ Launch the Game — Open `index.html` in your browser](index.html)**

---

## 🎮 How to Play

The objective of **82-0** is to construct a historical NBA roster capable of achieving a perfect undefeated season. Your success is determined by a **non-linear simulation engine** that evaluates the raw statistical output of five selected legends against a full 82-game schedule.

### 1️⃣ The Decades Rule

Roster construction is governed by era diversity. Each round the slot machine picks a **random NBA team** and **decade** from one of the following eras:

| Era | Available Players |
|-----|-------------------|
| **1960s** | Russell, Chamberlain, Robertson, West, Baylor, Barry & more |
| **1970s** | Abdul-Jabbar, Erving, Walton, McAdoo, Gervin, Thompson & more |
| **1980s** | Bird, Magic, Jordan, Olajuwon, Ewing, Malone & more |
| **1990s** | Jordan, Olajuwon, Robinson, Shaq, Malone, Payton & more |
| **2000s** | Kobe, Duncan, LeBron, Wade, Iverson, Nash, Nowitzki & more |
| **2010s** | LeBron, Curry, Durant, Harden, Westbrook, Giannis & more |
| **2020s** | Jokić, Dončić, Giannis, Embiid, SGA, Tatum & more |

> **Note:** You must select **5 different decades** across your 5 roster spots. No repeat eras!

### 2️⃣ Statistical Aggregation

The engine uses **real per-game stats from Basketball Reference**. Five core metrics determine your team's strength:

| Metric | Impact on Season |
|--------|-----------------|
| **Points (PTS)** | The baseline for offensive output |
| **Rebounds (REB)** | Possession control and second-chance opportunities |
| **Assists (AST)** | Offensive efficiency and team flow |
| **Steals (STL)** | Perimeter defense and transition volume |
| **Blocks (BLK)** | Rim protection and defensive stops |

Your team's **Strength Rating** is a cumulative total of these categories across all roster spots.

### 3️⃣ The Slot Machine 🎰

Each round begins with a **slot machine** that randomly assigns a **team** and **decade** combination. You then select the best available player from that team in that era. The game consists of **5 rounds** — one for each roster position.

### 4️⃣ Skip System ⏭️

You have strategic skips to avoid bad rolls:

- **1 Team Skip** — Re-rolls a new team in the same decade
- **1 Decade Skip** — Re-rolls both team and decade

Use them wisely — they're limited per game!

### 5️⃣ Era Adjustment

Different decades have different statistical environments. A 30 PPG average in the 1960s is **not** equivalent to 30 PPG in the 2020s. The engine accounts for **era-adjusted benchmarks** when calculating your team's rating.

### 6️⃣ The 82-Game Simulation

Once the draft is finalized, the engine runs your aggregate stats through a **win-projection curve**:

- **The Curve:** The relationship between stats and wins is **non-linear**. As your team strength increases, each additional win becomes significantly harder to earn.
- **The Threshold:** To reach the elusive **82-0** record, your roster must maximize cumulative output across all five statistical categories simultaneously.
- **The Verdict:** Results range from 💀 historically bad to 🏆 **PERFECT SEASON!**

---

## 🛠️ Tech Stack

- **Pure HTML/CSS/JavaScript** — No frameworks, no dependencies
- **Real NBA Stats** — 200+ players across 7 decades with accurate per-game averages
- **Basketball-Reference inspired data** — PTS, REB, AST, STL, BLK from historical seasons
- **Animated slot machine** — With spinning reels and visual effects
- **Particle background** — subtle court-themed visual ambiance
- **Confetti celebration** — For achieving 82-0!

## 🚀 How to Run

Simply open **`index.html`** in any modern browser. No server or installation required.

```
open index.html     # macOS
start index.html    # Windows
xdg-open index.html # Linux
```

## 🧠 Strategy Tips

- **Prioritize well-rounded players** — A deficiency in rebounds or blocks can tank your season even with elite scoring
- **Use skips on weak combos** — Don't waste a pick on a low-stat player if you can help it
- **Target 2020s stars** — They have the highest era-adjustment factor (1.0x), meaning their raw stats count fully
- **Balance your roster** — The simulation rewards total team strength, not individual brilliance

---

*"The road to 82-0 is paved with tough choices."*