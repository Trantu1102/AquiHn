export interface AQIDataPoint {
  date: string; // Display date e.g., "4/11"
  fullDate: string; // ISO date for sorting if needed, e.g., "2023-11-04"
  aqi: number;
  status: string;
}

export enum AQILevel {
  GOOD = 'Good',
  MODERATE = 'Moderate',
  UNHEALTHY_SENSITIVE = 'Unhealthy for Sensitive Groups',
  UNHEALTHY = 'Unhealthy',
  VERY_UNHEALTHY = 'Very Unhealthy',
  HAZARDOUS = 'Hazardous',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}