import { Rankings, Prediction } from './types';

// ─── Food Taxonomy ──────────────────────────────────────────────────────────
// Broad groups mapping specific food words to taxonomy categories.
// Weight is intentionally low (0.3) so exact keyword matches dominate.

const TAXONOMY: Record<string, string[]> = {
  // Proteins
  poultry: ['chicken', 'turkey', 'hen', 'duck', 'cornish', 'wing', 'wings', 'drumstick', 'thigh', 'breast'],
  beef: ['beef', 'steak', 'burger', 'hamburger', 'brisket', 'meatball', 'meatloaf', 'sirloin', 'chuck', 'patty', 'veal'],
  pork: ['pork', 'bacon', 'ham', 'sausage', 'bratwurst', 'carnitas', 'chorizo', 'pulled'],
  white_fish: ['cod', 'tilapia', 'catfish', 'halibut', 'bass', 'sole', 'haddock', 'pollock', 'swai', 'mahi'],
  oily_fish: ['salmon', 'tuna', 'mackerel', 'trout', 'sardine', 'anchovy'],
  shellfish: ['shrimp', 'crab', 'lobster', 'clam', 'mussel', 'scallop', 'calamari', 'squid', 'prawn'],
  tofu_soy: ['tofu', 'tempeh', 'edamame', 'soy', 'seitan'],
  egg: ['egg', 'eggs', 'omelette', 'omelet', 'frittata', 'scramble', 'scrambled', 'quiche'],
  legume: ['bean', 'beans', 'lentil', 'lentils', 'chickpea', 'chickpeas', 'hummus', 'falafel', 'dal'],

  // Grains & Starches
  pasta: ['pasta', 'spaghetti', 'penne', 'fusilli', 'linguine', 'rigatoni', 'macaroni', 'noodle', 'noodles', 'lasagna', 'ravioli', 'tortellini', 'gnocchi', 'lo mein', 'chow mein', 'udon', 'ramen'],
  rice_grain: ['rice', 'risotto', 'pilaf', 'biryani', 'fried rice', 'jasmine', 'basmati', 'brown rice', 'wild rice', 'grain', 'quinoa', 'couscous', 'barley', 'farro', 'bulgur'],
  bread: ['bread', 'roll', 'rolls', 'bun', 'buns', 'biscuit', 'cornbread', 'flatbread', 'naan', 'pita', 'tortilla', 'croissant', 'bagel', 'toast', 'focaccia'],
  potato: ['potato', 'potatoes', 'fries', 'fry', 'hash', 'tater', 'tots', 'mashed', 'baked potato', 'wedges', 'sweet potato'],

  // Cooking Methods
  fried: ['fried', 'crispy', 'crunchy', 'breaded', 'tempura', 'fritter', 'fritters'],
  grilled: ['grilled', 'grille', 'charbroiled', 'barbecue', 'bbq', 'smoked', 'charred'],
  baked: ['baked', 'roast', 'roasted', 'oven'],
  steamed: ['steamed', 'poached', 'boiled', 'blanched'],
  braised: ['braised', 'stewed', 'slow-cooked', 'simmered'],
  sauteed: ['sauteed', 'sautéed', 'stir-fry', 'stir-fried', 'pan-seared', 'seared'],
  raw: ['raw', 'fresh', 'ceviche', 'tartare', 'carpaccio'],

  // Cuisines
  asian: ['teriyaki', 'kung pao', 'szechuan', 'orange chicken', 'general tso', 'katsu', 'bibimbap', 'bulgogi', 'kimchi', 'gyoza', 'dumpling', 'dumplings', 'wonton', 'pho', 'pad thai', 'curry', 'tikka', 'masala', 'tandoori', 'paneer'],
  mexican: ['taco', 'tacos', 'burrito', 'enchilada', 'quesadilla', 'tamale', 'chile', 'chipotle', 'guacamole', 'salsa', 'mexican', 'al pastor', 'asada', 'pozole'],
  italian: ['marinara', 'alfredo', 'pesto', 'bolognese', 'parmesan', 'parmigiana', 'caprese', 'bruschetta', 'italian'],
  mediterranean: ['mediterranean', 'greek', 'gyro', 'shawarma', 'kebab', 'kabob', 'tzatziki', 'tahini', 'olive'],

  // Meal Types
  soup: ['soup', 'chowder', 'bisque', 'stew', 'broth', 'chili', 'gumbo', 'minestrone', 'gazpacho', 'pho'],
  salad: ['salad', 'slaw', 'coleslaw', 'greens', 'arugula', 'spinach salad', 'caesar'],
  sandwich: ['sandwich', 'wrap', 'panini', 'sub', 'hoagie', 'club', 'melt', 'slider', 'sliders', 'po boy'],
  pizza: ['pizza', 'flatbread pizza', 'calzone', 'stromboli'],
  bowl: ['bowl', 'poke', 'grain bowl', 'power bowl', 'buddha bowl'],

  // Vegetables
  leafy_green: ['kale', 'spinach', 'chard', 'collard', 'lettuce', 'arugula', 'cabbage', 'bok choy'],
  root_veg: ['carrot', 'carrots', 'beet', 'beets', 'turnip', 'parsnip', 'radish', 'yam'],
  squash: ['squash', 'zucchini', 'pumpkin', 'butternut', 'acorn'],
  pepper: ['pepper', 'peppers', 'jalapeño', 'jalapeno', 'bell pepper', 'poblano', 'habanero', 'chili pepper'],
  mushroom: ['mushroom', 'mushrooms', 'portobello', 'shiitake', 'cremini'],
  corn: ['corn', 'cornmeal', 'polenta', 'grits', 'elote'],
  broccoli_cauli: ['broccoli', 'cauliflower', 'broccolini', 'romanesco'],
  tomato: ['tomato', 'tomatoes', 'marinara', 'pomodoro', 'sun-dried'],

  // Desserts & Sweets
  cake: ['cake', 'cupcake', 'cheesecake', 'brownie', 'brownies', 'blondie'],
  cookie: ['cookie', 'cookies', 'biscotti', 'shortbread', 'snickerdoodle', 'macaroon'],
  pie_pastry: ['pie', 'tart', 'cobbler', 'crumble', 'strudel', 'turnover', 'danish', 'pastry'],
  ice_cream: ['ice cream', 'gelato', 'sorbet', 'sundae', 'frozen yogurt', 'milkshake', 'smoothie'],
  pudding: ['pudding', 'mousse', 'custard', 'flan', 'tiramisu', 'panna cotta'],

  // Sauces & Preparations
  creamy: ['creamy', 'cream', 'alfredo', 'bechamel', 'au gratin', 'scalloped', 'mac and cheese'],
  spicy: ['spicy', 'hot', 'buffalo', 'sriracha', 'cajun', 'jerk', 'harissa', 'gochujang', 'wasabi'],
  sweet_prep: ['glazed', 'honey', 'teriyaki', 'sweet and sour', 'caramel', 'maple', 'brown sugar', 'cinnamon'],
  savory: ['garlic', 'herb', 'herbed', 'rosemary', 'thyme', 'oregano', 'basil', 'lemon', 'citrus'],

  // Dairy
  cheese: ['cheese', 'cheddar', 'mozzarella', 'provolone', 'swiss', 'gruyere', 'gouda', 'brie', 'feta', 'ricotta', 'queso', 'jack', 'colby'],
};

// Build reverse index: word → list of taxonomy groups
const WORD_TO_GROUPS: Map<string, string[]> = new Map();
for (const [group, words] of Object.entries(TAXONOMY)) {
  for (const word of words) {
    const existing = WORD_TO_GROUPS.get(word);
    if (existing) {
      existing.push(group);
    } else {
      WORD_TO_GROUPS.set(word, [group]);
    }
  }
}

// ─── Tokenizer ──────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'with', 'in', 'on', 'for', 'to',
  'is', 'are', 'was', 'at', 'by', 'from', 'its', 'w', 'w/', 'no', 'n',
  'style', 'homestyle', 'house', 'made', 'fresh', 'new',
]);

export function tokenize(name: string): string[] {
  const lower = name.toLowerCase();
  // Split on non-alphanumeric, keep words of length >= 2
  const words = lower.split(/[^a-z0-9]+/).filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
  return words;
}

// ─── IDF (Inverse Document Frequency) ──────────────────────────────────────

export function computeIDF(allDishNames: string[]): Map<string, number> {
  const docCount = allDishNames.length;
  const termDocCounts = new Map<string, number>();

  for (const name of allDishNames) {
    const tokens = Array.from(new Set(tokenize(name)));
    for (const token of tokens) {
      termDocCounts.set(token, (termDocCounts.get(token) || 0) + 1);
    }
  }

  const idf = new Map<string, number>();
  Array.from(termDocCounts.entries()).forEach(([term, count]) => {
    // Standard IDF with +1 smoothing
    idf.set(term, Math.log((docCount + 1) / (count + 1)) + 1);
  });
  return idf;
}

// ─── Taxonomy Groups for a Dish ─────────────────────────────────────────────

function getTaxonomyGroups(tokens: string[]): Set<string> {
  const groups = new Set<string>();
  for (const token of tokens) {
    const g = WORD_TO_GROUPS.get(token);
    if (g) {
      for (const group of g) {
        groups.add(group);
      }
    }
  }
  return groups;
}

// ─── Keyword Type Classification ────────────────────────────────────────────
// Food-type words (what it IS) matter much more than cooking method (how it's made).
// e.g., "salmon" matters way more than "baked" when predicting ratings.

const COOKING_METHOD_WORDS = new Set([
  'baked', 'roast', 'roasted', 'oven',
  'grilled', 'grille', 'charbroiled', 'barbecue', 'bbq', 'smoked', 'charred',
  'fried', 'crispy', 'crunchy', 'breaded', 'tempura', 'fritter', 'fritters',
  'steamed', 'poached', 'boiled', 'blanched',
  'braised', 'stewed', 'simmered',
  'sauteed', 'sautéed', 'seared',
  'glazed', 'marinated', 'seasoned', 'blackened', 'crusted',
  'stuffed', 'wrapped', 'topped', 'loaded',
  'raw', 'fresh', 'ceviche', 'tartare', 'carpaccio',
]);

// Food-type words get boosted — these identify WHAT the dish is
const FOOD_TYPE_WORDS = new Set([
  // Proteins
  'chicken', 'turkey', 'duck', 'hen', 'wing', 'wings', 'drumstick', 'thigh', 'breast',
  'beef', 'steak', 'burger', 'hamburger', 'brisket', 'meatball', 'meatloaf', 'sirloin', 'patty', 'veal',
  'pork', 'bacon', 'ham', 'sausage', 'bratwurst', 'carnitas', 'chorizo',
  'cod', 'tilapia', 'catfish', 'halibut', 'bass', 'sole', 'haddock', 'pollock', 'swai', 'mahi',
  'salmon', 'tuna', 'mackerel', 'trout', 'sardine',
  'shrimp', 'crab', 'lobster', 'clam', 'scallop', 'calamari', 'squid', 'prawn',
  'tofu', 'tempeh', 'edamame', 'seitan',
  'egg', 'eggs', 'omelette', 'omelet', 'frittata', 'quiche',
  // Grains
  'pasta', 'spaghetti', 'penne', 'linguine', 'rigatoni', 'macaroni', 'noodle', 'noodles',
  'lasagna', 'ravioli', 'tortellini', 'gnocchi', 'udon', 'ramen',
  'rice', 'risotto', 'pilaf', 'biryani', 'quinoa', 'couscous', 'barley', 'farro',
  'pizza', 'calzone',
  // Vegetables
  'broccoli', 'cauliflower', 'spinach', 'kale', 'cabbage', 'carrot', 'carrots',
  'squash', 'zucchini', 'pumpkin', 'butternut',
  'mushroom', 'mushrooms', 'portobello',
  'potato', 'potatoes', 'fries', 'tots',
  'corn', 'polenta', 'grits',
  'bean', 'beans', 'lentil', 'lentils', 'chickpea', 'chickpeas', 'falafel',
  // Meal types
  'soup', 'chowder', 'bisque', 'stew', 'chili', 'gumbo',
  'salad', 'slaw', 'coleslaw',
  'sandwich', 'wrap', 'panini', 'sub', 'melt', 'slider', 'sliders',
  'taco', 'tacos', 'burrito', 'enchilada', 'quesadilla',
  'cake', 'cupcake', 'cheesecake', 'brownie', 'brownies',
  'cookie', 'cookies', 'pie', 'tart', 'cobbler', 'pudding', 'mousse',
  // Cheese/dairy
  'cheese', 'cheddar', 'mozzarella', 'parmesan', 'feta', 'queso',
]);

const FOOD_TYPE_WEIGHT = 3.0;    // food identity keywords (salmon, chicken, soup)
const COOKING_METHOD_WEIGHT = 0.3; // cooking method keywords (baked, fried, grilled)
const OTHER_KEYWORD_WEIGHT = 1.0;  // everything else
const TAXONOMY_WEIGHT = 0.3;
const CATEGORY_WEIGHT = 0.2;

function getKeywordWeight(token: string): number {
  if (FOOD_TYPE_WORDS.has(token)) return FOOD_TYPE_WEIGHT;
  if (COOKING_METHOD_WORDS.has(token)) return COOKING_METHOD_WEIGHT;
  return OTHER_KEYWORD_WEIGHT;
}

// ─── Vegan/Plant-Based Detection ────────────────────────────────────────────
// "Vegan Chicken Tenders" is NOT chicken — it's a plant-based dish.
// We detect vegan markers and prevent false protein matches.

const VEGAN_MARKERS = new Set([
  'vegan', 'plant', 'impossible', 'beyond', 'meatless', 'plantbased',
  'veggie', 'vegetarian',
]);

function isVeganDish(tokens: string[]): boolean {
  return tokens.some((t) => VEGAN_MARKERS.has(t));
}

// Protein words that are "fake" in vegan dishes — matching these across
// vegan/non-vegan boundary should be penalized
const PROTEIN_WORDS = new Set([
  'chicken', 'turkey', 'duck', 'beef', 'steak', 'burger', 'hamburger',
  'pork', 'bacon', 'ham', 'sausage', 'meatball', 'meatloaf',
  'cod', 'salmon', 'tuna', 'shrimp', 'crab', 'lobster',
  'egg', 'eggs', 'cheese',
]);

// ─── Similarity ─────────────────────────────────────────────────────────────

export function similarity(
  tokensA: string[],
  tokensB: string[],
  idf: Map<string, number>,
  categoryA?: string,
  categoryB?: string
): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  const veganA = isVeganDish(tokensA);
  const veganB = isVeganDish(tokensB);
  const veganMismatch = veganA !== veganB;

  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  const arrA = Array.from(setA);
  const arrB = Array.from(setB);

  // 1. Exact keyword overlap — weighted by IDF × keyword type weight
  let keywordScore = 0;
  let maxPossible = 0;
  for (const t of arrA) {
    const idfW = idf.get(t) || 1;
    const typeW = getKeywordWeight(t);
    const w = idfW * typeW;
    maxPossible += w;
    if (setB.has(t)) {
      // If vegan mismatch and this is a protein word, don't count the match
      // "Vegan Chicken" and "Fried Chicken" should NOT match on "chicken"
      if (veganMismatch && PROTEIN_WORDS.has(t)) {
        // No score for this match — it's fake protein
      } else {
        keywordScore += w;
      }
    }
  }
  for (const t of arrB) {
    if (!setA.has(t)) {
      const idfW = idf.get(t) || 1;
      const typeW = getKeywordWeight(t);
      maxPossible += idfW * typeW;
    }
  }

  // 2. Taxonomy group overlap (light signal)
  const groupsA = getTaxonomyGroups(tokensA);
  const groupsB = getTaxonomyGroups(tokensB);
  let taxonomyScore = 0;
  let taxonomyMax = 0;
  const allGroups = Array.from(new Set([...Array.from(groupsA), ...Array.from(groupsB)]));
  for (const g of allGroups) {
    taxonomyMax += TAXONOMY_WEIGHT;
    if (groupsA.has(g) && groupsB.has(g)) {
      // If vegan mismatch, don't count protein taxonomy group matches
      if (veganMismatch && isProteinGroup(g)) {
        // No score
      } else {
        taxonomyScore += TAXONOMY_WEIGHT;
      }
    }
  }

  // 3. Same category bonus
  let categoryScore = 0;
  let categoryMax = CATEGORY_WEIGHT;
  if (categoryA && categoryB && categoryA.toLowerCase() === categoryB.toLowerCase()) {
    categoryScore = CATEGORY_WEIGHT;
  }

  const totalScore = keywordScore + taxonomyScore + categoryScore;
  const totalMax = maxPossible + taxonomyMax + categoryMax;

  if (totalMax === 0) return 0;
  return totalScore / totalMax;
}

const PROTEIN_GROUPS = new Set([
  'poultry', 'beef', 'pork', 'white_fish', 'oily_fish', 'shellfish', 'egg',
]);

function isProteinGroup(group: string): boolean {
  return PROTEIN_GROUPS.has(group);
}

// ─── Prediction ─────────────────────────────────────────────────────────────

const TOP_K = 5;
const MIN_SIMILARITY = 0.01;
const SKIP_SCORE = 0; // internal score for skipped dishes in weighted average
const CATEGORY_SKIP_THRESHOLD = 0.5; // if 50%+ of a category's dishes are skipped, boost skip signal
const CATEGORY_SKIP_WEIGHT = 0.4; // how strongly category skip ratio influences prediction

export interface DishContext {
  name: string;
  category?: string;
}

/**
 * Compute category skip ratios from rankings + category mapping.
 * Returns a map of category → skip ratio (0-1).
 */
function getCategorySkipRatios(
  rankings: Rankings,
  dishCategories?: Record<string, string>
): Map<string, number> {
  if (!dishCategories) return new Map();

  const catStats = new Map<string, { total: number; skipped: number }>();

  for (const [dishName, rating] of Object.entries(rankings)) {
    const cat = dishCategories[dishName];
    if (!cat) continue;
    const catLower = cat.toLowerCase();
    const stats = catStats.get(catLower) || { total: 0, skipped: 0 };
    stats.total++;
    if (rating === -1) stats.skipped++;
    catStats.set(catLower, stats);
  }

  const ratios = new Map<string, number>();
  Array.from(catStats.entries()).forEach(([cat, stats]) => {
    if (stats.total >= 2) { // need at least 2 dishes to establish a pattern
      ratios.set(cat, stats.skipped / stats.total);
    }
  });
  return ratios;
}

function buildPrediction(
  scored: { name: string; rating: number; sim: number }[],
  categorySkipRatio: number
): Prediction | null {
  if (scored.length === 0) return null;

  scored.sort((a, b) => b.sim - a.sim);
  const topK = scored.slice(0, TOP_K);

  // Weighted average rating — skips are treated as SKIP_SCORE (0)
  let totalWeight = 0;
  let weightedSum = 0;
  let skipCount = 0;
  for (const s of topK) {
    totalWeight += s.sim;
    const effectiveRating = s.rating === -1 ? SKIP_SCORE : s.rating;
    weightedSum += s.sim * effectiveRating;
    if (s.rating === -1) skipCount++;
  }

  let predictedRating = weightedSum / totalWeight;

  // Factor in category skip ratio: if most dishes in this category are skipped,
  // push prediction toward skip
  if (categorySkipRatio >= CATEGORY_SKIP_THRESHOLD) {
    const skipPull = categorySkipRatio * CATEGORY_SKIP_WEIGHT;
    predictedRating = predictedRating * (1 - skipPull);
  }

  // Confidence
  const bestSim = topK[0].sim;
  const countFactor = Math.min(topK.length / 3, 1);
  let confidence = bestSim * 0.7 + countFactor * 0.3;

  // Boost confidence for skip prediction if most neighbors are skips
  const skipRatio = skipCount / topK.length;
  if (skipRatio >= 0.5) {
    confidence = Math.max(confidence, skipRatio * 0.8);
  }

  const predictedSkip = predictedRating <= 1 && (skipRatio >= 0.4 || categorySkipRatio >= CATEGORY_SKIP_THRESHOLD);

  return {
    rating: predictedSkip ? -1 : Math.max(1, Math.round(predictedRating * 2) / 2),
    confidence: Math.min(confidence, 1),
    similarDishes: topK.map((s) => ({
      name: s.name,
      rating: s.rating,
      similarity: Math.round(s.sim * 100) / 100,
    })),
    predictedSkip,
  };
}

export function predict(
  dish: DishContext,
  rankings: Rankings,
  allDishNames: string[],
  dishCategories?: Record<string, string>
): Prediction | null {
  // Include both positive ratings AND skips (-1) as neighbors
  const ratedDishes = Object.entries(rankings).filter(([, r]) => r > 0 || r === -1);
  if (ratedDishes.length === 0) return null;

  const idf = computeIDF(allDishNames);
  const targetTokens = tokenize(dish.name);
  if (targetTokens.length === 0) return null;

  const scored: { name: string; rating: number; sim: number }[] = [];

  for (const [ratedName, rating] of ratedDishes as [string, number][]) {
    const ratedTokens = tokenize(ratedName);
    if (ratedTokens.length === 0) continue;

    const sim = similarity(
      targetTokens,
      ratedTokens,
      idf,
      dish.category,
      dishCategories?.[ratedName]
    );

    if (sim >= MIN_SIMILARITY) {
      scored.push({ name: ratedName, rating, sim });
    }
  }

  // Get category skip ratio for this dish's category
  const catSkipRatios = getCategorySkipRatios(rankings, dishCategories);
  const catRatio = dish.category ? (catSkipRatios.get(dish.category.toLowerCase()) || 0) : 0;

  return buildPrediction(scored, catRatio);
}

export function predictAll(
  dishes: DishContext[],
  rankings: Rankings,
  dishCategories?: Record<string, string>
): Map<string, Prediction> {
  const ratedDishes = Object.entries(rankings).filter(([, r]) => r > 0 || r === -1);
  if (ratedDishes.length === 0) return new Map();

  // Build IDF from all known dish names
  const allNames = [
    ...dishes.map((d) => d.name),
    ...Object.keys(rankings),
  ];
  const uniqueNames = Array.from(new Set(allNames));
  const idf = computeIDF(uniqueNames);

  // Pre-tokenize rated dishes
  const ratedTokenized = ratedDishes.map(([name, rating]) => ({
    name,
    rating,
    tokens: tokenize(name),
  }));

  // Category skip ratios (computed once)
  const catSkipRatios = getCategorySkipRatios(rankings, dishCategories);

  const results = new Map<string, Prediction>();

  for (const dish of dishes) {
    if (dish.name in rankings) continue; // already rated

    const targetTokens = tokenize(dish.name);
    if (targetTokens.length === 0) continue;

    const scored: { name: string; rating: number; sim: number }[] = [];

    for (const rated of ratedTokenized) {
      if (rated.tokens.length === 0) continue;
      const sim = similarity(
        targetTokens,
        rated.tokens,
        idf,
        dish.category,
        dishCategories?.[rated.name]
      );
      if (sim >= MIN_SIMILARITY) {
        scored.push({ name: rated.name, rating: rated.rating, sim });
      }
    }

    const catRatio = dish.category ? (catSkipRatios.get(dish.category.toLowerCase()) || 0) : 0;
    const pred = buildPrediction(scored, catRatio);
    if (pred) {
      results.set(dish.name, pred);
    }
  }

  return results;
}
