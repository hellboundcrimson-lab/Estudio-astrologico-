
export interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  latitude?: number;
  longitude?: number;
  currentEnergyState?: string;
}

export enum ActiveTab {
  DASHBOARD = 'dashboard',
  CHART = 'chart',
  BLUEPRINT = 'blueprint',
  KARMIC_LAB = 'karmic_lab',
  INCARNATIONS = 'incarnations',
  STARSEED = 'starseed',
  AKASHIC = 'akashic',
  GROWTH = 'growth',
  SETTINGS = 'settings'
}

export interface PlanetPlacement {
  name: string;
  symbol: string;
  sign: string;
  degree: number;
  house: number;
  description: string;
  isSidereal?: boolean;
}

export interface Incarnation {
  era: string;
  location: string;
  role: string;
  karmicLesson: string;
  astrologicalMarker: string;
}

export interface Point {
  name: string;
  sign: string;
  degree: number;
  symbol: string;
  description: string;
}

export interface Aspect {
  type: string;
  planets: string[];
  meaning: string;
  color?: string;
}

export interface Chakra {
  name: string;
  status: string;
  description: string;
  color: string;
  starseedLink?: string;
  practice?: string;
}

export interface ProfileSection {
  title: string;
  content: string;
  emoji: string;
}

export interface Interpretation {
  classical: string;
  karmicBalance: string;
  siderealAnalysis: string;
  incarnations: Incarnation[];
  starseed: {
    origin: string;
    connectionDegrees: string;
    narrative: string;
  };
  akashicMessage: string;
  spiritualAdvice: string[];
  planets: PlanetPlacement[];
  siderealPlanets: PlanetPlacement[];
  aspects: Aspect[];
  chakras: Chakra[];
  ascendant: Point;
  midheaven: Point;
  profileBreakdown: ProfileSection[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
