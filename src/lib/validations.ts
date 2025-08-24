import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Nome deve conter pelo menos 2 caracteres').max(50, 'Nome deve ter menos de 50 caracteres'),
  gender: z.enum(['man', 'woman']),
});

export const physicalDataSchema = z.object({
  age: z.number().min(16, 'Deve ter pelo menos 16 anos').max(100, 'Deve ter menos de 100 anos'),
  height: z.number().min(1.0, 'A altura deve ser pelo menos 1.0m').max(2.5, 'A altura deve ser menos de 2.5m'),
  weight: z.number().min(30, 'O peso deve ser pelo menos 30kg').max(300, 'O peso deve ser menos de 300kg'),
});

export const activityLevelSchema = z.object({
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
});

export const goalSchema = z.object({
  goal: z.enum(['lose_fat', 'gain_muscle']),
});

export const completeFormSchema = personalInfoSchema
  .merge(physicalDataSchema)
  .merge(activityLevelSchema)
  .merge(goalSchema);

export type PersonalInfoForm = z.infer<typeof personalInfoSchema>;
export type PhysicalDataForm = z.infer<typeof physicalDataSchema>;
export type ActivityLevelForm = z.infer<typeof activityLevelSchema>;
export type GoalForm = z.infer<typeof goalSchema>;
export type CompleteForm = z.infer<typeof completeFormSchema>;
