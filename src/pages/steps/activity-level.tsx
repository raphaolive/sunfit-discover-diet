import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { FormLayout } from "@/components/layout/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { activityLevelSchema, ActivityLevelForm } from "@/lib/validations";
import { ActivityLevelOption } from "@/types";
import Card from "@/components/ui/card";
import ButtonComponent from "@/components/ui/button-component";

const activityLevels: ActivityLevelOption[] = [
  {
    value: "sedentary",
    label: "Sedentário",
    description: "Pouco ou nenhum exercício, trabalho de escritório",
  },
  {
    value: "lightly_active",
    label: "Levemente Ativo",
    description: "Exercício leve 1-3 dias/semana",
  },
  {
    value: "moderately_active",
    label: "Moderadamente Ativo",
    description: "Exercício moderado 3-5 dias/semana",
  },
  {
    value: "very_active",
    label: "Muito Ativo",
    description: "Exercício intenso 6-7 dias/semana",
  },
  {
    value: "extremely_active",
    label: "Extremamente Ativo",
    description:
      "Exercício muito intenso, trabalho físico ou treino duas vezes ao dia",
  },
];

export default function ActivityLevelPage() {
  const router = useRouter();
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityLevelForm>({
    resolver: zodResolver(activityLevelSchema),
    defaultValues: {
      activityLevel: formData.activityLevel || undefined,
    },
  });

  const selectedLevel = watch("activityLevel");

  const onSubmit = (data: ActivityLevelForm) => {
    updateFormData(data);
    setCurrentStep(4);
    router.push("/steps/goal");
  };

  const goBack = () => {
    setCurrentStep(2);
    router.push("/steps/physical-data");
  };

  return (
    <FormLayout
      title="Nível de Atividade"
      subtitle="Quão ativo você é semanalmente?"
      currentStep={3}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
        <Box mb={6}>
          <Flex direction="column" gap={2}>
            {activityLevels.map((level) => (
              <Card
                key={level.value}
                item={level}
                selectedItem={selectedLevel}
                setValue={() => setValue("activityLevel", level.value)}
              />
            ))}
          </Flex>
          {errors.activityLevel && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {errors.activityLevel.message}
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
