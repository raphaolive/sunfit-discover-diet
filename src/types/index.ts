export interface UserData {
  name: string;
  age: number;
  height: number; // in meters
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  goal: 'lose_fat' | 'gain_muscle';
  sex: 'man' | 'woman';
}

export interface DietPlan {
  tmb: number;
  dailyCalories: number;
  dietPlan: string;
  groceryList: string;
  suggestions: string;
}


export type SexInfo = {
  value: 'man' | 'woman';
  label: string;
  description?: string;
}

export type ActivityLevelOption = {
  value: UserData['activityLevel'];
  label: string;
  description: string;
};

export type GoalOption = {
  value: UserData['goal'];
  label: string;
  description: string;
};

