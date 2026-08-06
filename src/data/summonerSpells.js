export const CLASSIC_SUMMONER_SPELLS = [
  { id: "flash", name: "Flash", cd: "300s", desc: "Teleports your champion a short distance toward your cursor's location.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerFlash.png" },
  { id: "ignite", name: "Ignite", cd: "210s", desc: "Target enemy champion takes 70-410 true damage over 5s and suffers Grievous Wounds.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerDot.png" },
  { id: "teleport", name: "Teleport", cd: "300s", desc: "After 3.5 seconds, teleports your champion to target allied structure, minion, or ward.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerTeleport.png" },
  { id: "smite", name: "Smite", cd: "75s", desc: "Deals 440-1000 true damage to target epic, large, or medium monster or enemy minion.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerSmite.png" },
  { id: "revive", name: "Revive (Classic)", cd: "540s", desc: "Instantly resurrects your champion at your team's Summoning Platform and increases movement speed for 12s.", icon: "https://static.wikia.nocookie.net/leagueoflegends/images/a/ab/Revive.png" },
  { id: "surge", name: "Surge (Classic)", cd: "180s", desc: "Empowers your champion, granting 10-78 AP (based on lvl) and 35-45% Attack Speed for 12 seconds.", icon: "https://static.wikia.nocookie.net/leagueoflegends/images/f/f7/Surge.png" },
  { id: "promote", name: "Promote (Classic)", cd: "180s", desc: "Promotes a target allied Siege Minion into a powerful super minion under your control.", icon: "https://static.wikia.nocookie.net/leagueoflegends/images/6/60/Promote.png" },
  { id: "rally", name: "Rally (Classic)", cd: "270s", desc: "Summons a beacon with 200+25xLvl HP for 15s that grants nearby allies +10-35 Attack Damage.", icon: "https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Rally.png" },
  { id: "clairvoyance", name: "Clairvoyance (Classic)", cd: "55s", desc: "Reveals a targeted area of the map for your team for 6 seconds.", icon: "https://static.wikia.nocookie.net/leagueoflegends/images/1/15/Clairvoyance.png" },
  { id: "ghost", name: "Ghost", cd: "210s", desc: "Your champion ignores unit collision and gains 27% Movement Speed for 10 seconds.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerHaste.png" },
  { id: "heal", name: "Heal", cd: "270s", desc: "Restores 90-345 Health to target champion and all nearby allies.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerHeal.png" },
  { id: "clarity", name: "Clarity", cd: "180s", desc: "Restores 40% of maximum Mana to your champion and nearby allies.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerMana.png" },
  { id: "cleanse", name: "Cleanse", cd: "210s", desc: "Removes all disables and summoner spell debuffs affecting your champion.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerBoost.png" },
  { id: "exhaust", name: "Exhaust", cd: "210s", desc: "Exhausts target enemy champion, slowing their Movement Speed by 30% and damage by 30% for 3s.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerExhaust.png" },
  { id: "barrier", name: "Barrier", cd: "210s", desc: "Shields your champion for 115-455 damage for 2 seconds.", icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/SummonerBarrier.png" },
  { id: "garrison", name: "Garrison (Dominion)", cd: "210s", desc: "Empowers allied turret or degrades enemy turret attack rate.", icon: "https://static.wikia.nocookie.net/leagueoflegends/images/e/e9/Garrison.png" }
];

export const COMMUNITY_GUIDES = [
  {
    id: "jax-classic-dodge-god",
    championId: "jax",
    title: "Season 1-2 Unkillable Dodge Jax (Heart of Gold & Gunblade Rush)",
    author: "DodgeMaster99",
    votes: 432,
    role: "Top",
    summary: "Old-school Jax guide featuring 21/9/0 masteries and Trinity + Gunblade double lifesteal sustain.",
    items: ["heart-of-gold", "trinity-force", "force-of-nature", "deathfire-grasp"],
    spells: ["flash", "ignite"],
    maxOrder: ["W", "Q", "E", "R"]
  },
  {
    id: "ahri-dfg-one-shot",
    championId: "ahri",
    title: "Challenger DFG Rush Ahri - Instant Burst Delete",
    author: "MidOrFeed",
    votes: 388,
    role: "Mid",
    summary: "Rushing Deathfire Grasp into Rabadon's for max Charm kill threat during Season 2 meta.",
    items: ["deathfire-grasp", "rabadons-deathcap", "philosophers-stone"],
    spells: ["flash", "ignite"],
    maxOrder: ["Q", "W", "E", "R"]
  },
  {
    id: "lee-jungle-wriggles",
    championId: "lee-sin",
    title: "Classic Season 2 Jungle Lee Sin (Wriggle's Ward Jump Strategy)",
    author: "InsecClassic",
    votes: 512,
    role: "Jungle",
    summary: "Aggressive counter-jungle build using Wriggle's Lantern for free ward jumps and early Dragon control.",
    items: ["wriggles-lantern", "trinity-force", "heart-of-gold"],
    spells: ["flash", "smite"],
    maxOrder: ["Q", "E", "W", "R"]
  }
];

export const PATCH_NOTES = [
  {
    patch: "Classic Rift v1.0.4",
    date: "August 2026",
    highlights: [
      "Jax Counter Strike (E) dodge rate scaling adjusted to match Season 1 baseline.",
      "Heart of Gold GP10 passive confirmed non-stacking with duplicate turtle shells.",
      "Deathfire Grasp active AP multiplier verified at 4% per 100 AP.",
      "Added 16 classic summoner spells including Revive and Surge to client selection."
    ]
  },
  {
    patch: "Classic Rift v1.0.3",
    date: "July 2026",
    highlights: [
      "Original 21/9/0 Offense, Defense, and Utility Mastery Trees added.",
      "Summoner Spell Clairvoyance cooldown updated to 55s.",
      "Restored legacy item Force of Nature HP regen scaling to 1.75% max health."
    ]
  }
];
