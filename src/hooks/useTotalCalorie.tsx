import { User } from "@/types/api-responses/users";
import { useMemo } from "react";

function useTotalCalorie(user: User) {
  const totalRequiredCalorie = useMemo(() => {
    const { weight, height, age, gender, activityLevel, goal } = user;
    if (!weight || !height || !age || !gender || !activityLevel || !goal)
      return undefined;
    const s = gender === "male" ? 5 : -161;
    const bmr = 10 * weight + 6.25 * height - 5 * age + s;
    const factor = bmr * Number(activityLevel);
    const result = factor + Number(goal);

    return Math.round(result);
  }, [user]);

  return totalRequiredCalorie;
}

export default useTotalCalorie;
