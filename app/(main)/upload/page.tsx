import React from 'react'
import { auth } from '@clerk/nextjs/server'
import ResumeForm from '@/components/shared/ResumeForm'

export type PlanType = "free_plan" | "starter_plan" | "professional_plan" | "enterprise_plan";

const UploadPage = async () => {
  const { has } = await auth();
  // check user subscription
  const hasFreePlan = has({ plan: "free_plan" });
  const hasStarterPlan = has({ plan: "starter_plan" });
  const hasProPlan = has({ plan: "professional_plan" });
  const hasEnterprisePlan = has({ plan: "enterprise_plan" });

  // Determine the user current plan
  let currentPlan: PlanType = "free_plan";

  if (hasEnterprisePlan) {
    currentPlan = "enterprise_plan";
  } else if (hasProPlan) {
    currentPlan = "professional_plan";
  } else if (hasStarterPlan) {
    currentPlan = "starter_plan";
  } else if(hasFreePlan) {
    currentPlan = "free_plan";
  }

      return (
        <div className='px-4 py-4'>
          <ResumeForm currentPlan={currentPlan} />
        </div>
      )
  }

  export default UploadPage