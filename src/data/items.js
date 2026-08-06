export const LEGACY_ITEMS = [
  {
    id: "heart-of-gold",
    name: "Heart of Gold",
    price: 825,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3097.png",
    stats: ["+200 Health", "+5 Gold per 10 seconds"],
    category: "Gold Generation",
    tags: ["Health", "Goldper10"],
    classicQuote: "Iconic GP10 turtle shell item favored by classic supports and tanks.",
    description: "Unique Passive: Gains +5 Gold per 10 seconds."
  },
  {
    id: "force-of-nature",
    name: "Force of Nature",
    price: 2750,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3083.png",
    stats: ["+76 Magic Resist", "+40 Health Regen per 5", "+8% Movement Speed"],
    category: "Defense",
    tags: ["MagicResist", "HealthRegen", "MovementSpeed"],
    classicQuote: "The ultimate classic anti-mage tank item featuring percentage max health regen.",
    description: "Unique Passive: Regenerates 1.75% of your maximum health per 5 seconds."
  },
  {
    id: "philosophers-stone",
    name: "Philosopher's Stone",
    price: 800,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3096.png",
    stats: ["+9 Health Regen per 5", "+8 Mana Regen per 5"],
    category: "Gold Generation",
    tags: ["HealthRegen", "ManaRegen", "Goldper10"],
    classicQuote: "Builds into Shurelya's Reverie. Core on Season 1-3 supports.",
    description: "Unique Passive: Gains +5 Gold per 10 seconds."
  },
  {
    id: "deathfire-grasp",
    name: "Deathfire Grasp (DFG)",
    price: 3100,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3128.png",
    stats: ["+120 Ability Power", "+10% Cooldown Reduction"],
    category: "Magic",
    tags: ["AbilityPower", "CooldownReduction"],
    classicQuote: "Nuke burst item for classic AP mages like Ahri, Veigar, and LeBlanc.",
    description: "Unique Active: Deals 15% (+4% per 100 AP) of target's max HP as magic damage and increases subsequent magic damage taken by 20% for 4 seconds (60s CD)."
  },
  {
    id: "sword-of-the-occult",
    name: "Sword of the Occult",
    price: 1200,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3141.png",
    stats: ["+10 Attack Damage"],
    category: "Attack",
    tags: ["AttackDamage"],
    classicQuote: "The AD counterpart to Mejai's Soulstealer for snowballing high-risk plays.",
    description: "Unique Passive: Grants +5 AD per stack (max 20). At 20 stacks, grants +15% Movement Speed."
  },
  {
    id: "madreds-bloodrazor",
    name: "Madred's Bloodrazor",
    price: 3800,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3153.png",
    stats: ["+40 Attack Damage", "+40% Attack Speed", "+25 Armor"],
    category: "Attack",
    tags: ["AttackDamage", "AttackSpeed", "Armor"],
    classicQuote: "Tank-shredder predecessor to Blade of the Ruined King.",
    description: "Unique Passive: Basic attacks deal bonus magic damage equal to 4% of target's maximum health."
  },
  {
    id: "wriggles-lantern",
    name: "Wriggle's Lantern",
    price: 1600,
    icon: "https://ddragon.leagueoflegends.com/cdn/3.15.1/img/item/3154.png",
    stats: ["+15 Attack Damage", "+30 Armor", "+10% Life Steal"],
    category: "Jungle",
    tags: ["AttackDamage", "Armor", "LifeSteal"],
    classicQuote: "The essential Season 2-3 jungler item with free ward placing.",
    description: "Passive: Basic attacks against monsters have a 20% chance to deal 500 bonus magic damage. Active: Places a Stealth Ward (3 min duration)."
  },
  {
    id: "infinity-edge",
    name: "Infinity Edge",
    price: 3800,
    icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3031.png",
    stats: ["+80 Attack Damage", "+25% Critical Strike Chance"],
    category: "Attack",
    tags: ["AttackDamage", "CriticalStrike"],
    classicQuote: "The classic marksman core power spike.",
    description: "Unique Passive: Critical Strike damage is increased from 200% to 250%."
  },
  {
    id: "rabadons-deathcap",
    name: "Rabadon's Deathcap",
    price: 3300,
    icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3089.png",
    stats: ["+120 Ability Power"],
    category: "Magic",
    tags: ["AbilityPower"],
    classicQuote: "Crown jewel of classic mage builds.",
    description: "Unique Passive: Increases Ability Power by 30%."
  },
  {
    id: "trinity-force",
    name: "Trinity Force",
    price: 4073,
    icon: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3078.png",
    stats: ["+30 AD", "+30 AP", "+30% AS", "+10% Crit", "+250 HP", "+250 Mana", "+5% MS"],
    category: "Attack",
    tags: ["AttackDamage", "AbilityPower", "AttackSpeed", "Health"],
    classicQuote: "Tons of Damage! Phreak's favorite core item.",
    description: "Unique Passive: Spellblade - After using an ability, next basic attack deals 150% base AD bonus physical damage."
  }
];

export const ITEM_CATEGORIES = ["All", "Gold Generation", "Attack", "Magic", "Defense", "Jungle"];
export const STAT_FILTERS = ["AttackDamage", "AbilityPower", "Health", "Armor", "MagicResist", "AttackSpeed", "Goldper10"];
