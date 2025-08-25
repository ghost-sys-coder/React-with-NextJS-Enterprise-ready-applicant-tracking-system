"use server";
import { auth } from "@clerk/nextjs/server";

export type SubscriptionPlan =
  | "free_plan"
  | "starter_plan"
  | "professional_plan"
  | "enterprise_plan";

export interface SubscriptionInfo {
    currentPlan: SubscriptionPlan;
    hasFreePlan: boolean;
    hasStarterPlan: boolean;
    hasProfessionalPlan: boolean;
    hasEnterprisePlan: boolean;
    isPremium: boolean;
}

// Map Clerk plan names to my database plan names
export const PLAN_MAPPING = {
    free_plan: "free_plan",
    starter_plan: "starter_plan",
    pro_plan: "professional_plan", // Clerk uses pro_plan but i want to use professional_plan
    enterprise_plan: "enterprise_plan"
} as const;

/** 
 * ! Get the current user's subscription information from the clerk auth object
 */
export async function getSubscriptionInfo(checkAuth: typeof auth) {
    const { has } = await checkAuth(); 
    
    // check user's subscription plan in clerk
    const hasFreePlan = has({ plan: "free_plan" });
    const hasStarterPlan = has({ plan: "starter_plan" });
    const hasProfessionalPlan = has({ plan: "pro_plan" });
    const hasEnterprisePlan = has({ plan: "enterprise_plan" });

    //  determin the highest active plan
    let currentPlan: SubscriptionPlan = "free_plan";

    if (hasEnterprisePlan) {
        currentPlan = "enterprise_plan";
    } else if (hasProfessionalPlan) {
        currentPlan = "professional_plan";
    } else if (hasStarterPlan) {
        currentPlan = "starter_plan";
    } else if (hasFreePlan) {
        currentPlan = "free_plan"
    }

    return {
        currentPlan,
        hasFreePlan,
        hasStarterPlan,
        hasProfessionalPlan,
        hasEnterprisePlan,
        isPremium: currentPlan !== "free_plan"
    }
}