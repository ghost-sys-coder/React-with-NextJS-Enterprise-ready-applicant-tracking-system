import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data cleanup functions

export function cleanData(feedback: string) {
  return feedback.replace("```json", "").replace("```", "");
}

export function cleanedAiResponse(feedback: string) {
  return feedback
    ?.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

// Get Rating color
export function getRatingColor(rating: string) {
  switch (rating) {
    case "Excellent": return "text-green-600 bg-green-100";
    case "Very Good": return "text-blue-600 bg-blue-100";
    case "Good": return "text-yellow-600 bg-yellow-100";
    case "Poor": return "text-red-600 text-red-100";
    default: return "text-gray-600 bg-gray-100"
  }
}

export function getScoreColor(score: number) {
  if (score > 80) return "text-green-600";
  if (score > 60) return "text-yellow-600";
  return "text-red-600";
}

export function getRatingBadgeColor(rating: string) {
  switch (rating) {
    case "Excellent": return "bg-green-100 text-green-800 border-green-200";
    case "Very Good": return "bg-blue-100 text-blue-800 border-blue-200";
    case "Good": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Poor": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
}