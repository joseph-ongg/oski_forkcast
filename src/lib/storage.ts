import { Rankings, DietaryPreferences } from './types';

const RANKINGS_KEY = 'croads_rankings';
const IGNORED_CATEGORIES_KEY = 'croads_ignored_categories';
const DIETARY_PREFS_KEY = 'croads_dietary_preferences';

export function loadRankings(): Rankings {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(RANKINGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveRankings(rankings: Rankings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(RANKINGS_KEY, JSON.stringify(rankings));
}

export function loadIgnoredCategories(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(IGNORED_CATEGORIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveIgnoredCategories(categories: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(IGNORED_CATEGORIES_KEY, JSON.stringify(categories));
}

export function loadDietaryPreferences(): DietaryPreferences {
  if (typeof window === 'undefined') return { diets: [], allergens: [] };
  try {
    const data = localStorage.getItem(DIETARY_PREFS_KEY);
    return data ? JSON.parse(data) : { diets: [], allergens: [] };
  } catch {
    return { diets: [], allergens: [] };
  }
}

export function saveDietaryPreferences(prefs: DietaryPreferences): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DIETARY_PREFS_KEY, JSON.stringify(prefs));
}
