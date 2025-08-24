import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { FormLayout } from "@/components/layout/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { goalSchema, GoalForm } from "@/lib/validations";
import { GoalOption } from "@/types";
import Card from "@/components/ui/card";
import ButtonComponent from "@/components/ui/button-component";

const goals: GoalOption[] = [
  {
    value: "lose_fat",
    label: "Perder Gordura",
    description:
      "Criar um déficit calórico para reduzir o percentual de gordura corporal",
  },
  {
    value: "gain_muscle",
    label: "Ganhar Músculo",
    description: "Construir massa muscular com nutrição adequada e treinamento",
  },
];

export default function GoalPage() {
  const router = useRouter();
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goal: formData.goal || undefined,
    },
  });

  const selectedGoal = watch("goal");

  const onSubmit = async (data: GoalForm) => {
    updateFormData(data);
    setCurrentStep(5);
    // Generate diet plan
    router.push("/results/diet-plan");
  };

  const goBack = () => {
    setCurrentStep(3);
    router.push("/steps/activity-level");
  };

  return (
    <FormLayout
      title="Seu Objetivo"
      subtitle="O que você gostaria de alcançar?"
      currentStep={4}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
        <Box mb={6}>
          <Flex direction="column" gap={2}>
            {goals.map((goal) => (
              <Card
                key={goal.value}
                item={goal}
                selectedItem={selectedGoal}
                setValue={() => setValue("goal", goal.value)}
              />
            ))}
          </Flex>
          {errors.goal && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {errors.goal.message}
            </Text>
          )}
        </Box>

        <Flex gap={4}>
          <Button flex="1" onClick={goBack}>
            Voltar
          </Button>
          <ButtonComponent label="Próximo Passo" isSubmitting={isSubmitting} />
        </Flex>
      </Box>
    </FormLayout>
  );
}
