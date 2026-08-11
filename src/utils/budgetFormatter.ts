import type { ProjectData } from '../types';

/**
 * Standard currency conversion: 1 USD = 83 INR
 * 1 Billion USD = ₹8,300 Crore
 * 1 Million USD = ₹8.3 Crore
 */
const USD_TO_INR_PER_BILLION_CRORES = 8300;

export function isIndianProject(country?: string): boolean {
  if (!country) return false;
  return country.trim().toLowerCase() === 'india';
}

/**
 * Converts a USD value in billions to Indian format (₹ Crore or ₹ Lakh Crore).
 */
export function convertUsdBillionsToInrString(amountInBillions: number): string {
  if (amountInBillions >= 100) {
    const lakhCrore = (amountInBillions * USD_TO_INR_PER_BILLION_CRORES) / 100000;
    return `₹${lakhCrore.toFixed(2).replace(/\.00$/, '')} Lakh Crore`;
  }
  const crore = Math.round(amountInBillions * USD_TO_INR_PER_BILLION_CRORES);
  return `₹${crore.toLocaleString('en-IN')} Crore`;
}

/**
 * Formats the project budget string according to country rules.
 * For India: Always formatted in ₹ Crore / ₹ Lakh Crore without any foreign units.
 * For other countries: Retains the source currency format.
 */
export function formatProjectBudget(project: Pick<ProjectData, 'Budget' | 'Country' | 'ParsedBudget'>): string {
  const { Budget, Country, ParsedBudget } = project;
  if (!Budget) return 'N/A';

  if (isIndianProject(Country)) {
    let b = Budget.trim();

    // If already contains INR indicators (₹, Crore, Lakh)
    if (b.includes('₹') || b.includes('Crore') || b.includes('Lakh') || b.includes('INR')) {
      // Remove extraneous symbols like leading ~, $, spaces
      b = b.replace(/^[~$ ]+/, '').trim();
      // Remove any trailing or misplaced $ or USD
      b = b.replace(/\$|USD/gi, '').trim();
      if (!b.startsWith('₹')) {
        b = `₹${b}`;
      }
      return b;
    }

    // If numerical parsed budget is available
    if (ParsedBudget != null && !isNaN(ParsedBudget) && ParsedBudget > 0) {
      return convertUsdBillionsToInrString(ParsedBudget);
    }

    // Try parsing directly from the budget string
    const matchBillion = b.match(/[\$€£]?\s*(\d+(?:\.\d+)?)\s*(?:Billion|B)/i);
    if (matchBillion) {
      const val = parseFloat(matchBillion[1]);
      return convertUsdBillionsToInrString(val);
    }

    const matchMillion = b.match(/[\$€£]?\s*(\d+(?:\.\d+)?)\s*(?:Million|M)/i);
    if (matchMillion) {
      const val = parseFloat(matchMillion[1]) / 1000;
      return convertUsdBillionsToInrString(val);
    }

    // Fallback: prepend ₹ if numeric
    return `₹${b.replace(/^[~$ ]+/, '')}`;
  }

  // For non-Indian projects, clean up any leading ~ or weird double symbols
  return Budget.trim().replace(/^~+/, '~');
}

/**
 * Returns display-ready components for rendering in the UI alongside currency icons.
 */
export function getProjectBudgetDisplay(project: Pick<ProjectData, 'Budget' | 'Country' | 'ParsedBudget'>): {
  isIndia: boolean;
  fullFormatted: string;
  displayValue: string;
} {
  const isIndia = isIndianProject(project.Country);
  const fullFormatted = formatProjectBudget(project);

  if (fullFormatted === 'N/A') {
    return { isIndia, fullFormatted: 'N/A', displayValue: 'N/A' };
  }

  // Remove leading currency symbols for clean display when rendered next to <IndianRupee> or <DollarSign>
  let displayValue = fullFormatted;
  if (isIndia) {
    displayValue = fullFormatted.replace(/^₹\s*/, '').trim();
  } else {
    displayValue = fullFormatted.replace(/^\$\s*/, '').trim();
  }

  return {
    isIndia,
    fullFormatted,
    displayValue
  };
}
