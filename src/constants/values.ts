const MINUTES: string[] = ["20", "80", "100", "200"];

const PLAN: string[] = ["30", "60", "120"];

const PRICETABLE: { [key: string]: number; } = {
   "011 016": 1.9,
   "011 017": 1.7,
   "011 018": 0.9,
   "016 011": 2.9,
   "017 011": 2.7,
   "018 011": 1.9,
}

export { MINUTES, PLAN, PRICETABLE };