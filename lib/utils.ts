import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevel(points: number): number {
  return Math.floor(Math.sqrt(points / 500)) + 1;
}

export function calculateNextLevelPoints(points: number): number {
  const currentLevel = calculateLevel(points);
  const nextLevelPoints = (currentLevel * currentLevel) * 500;
  return nextLevelPoints - points;
}
