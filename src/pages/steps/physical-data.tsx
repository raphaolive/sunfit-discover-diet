import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FormLayout } from "@/components/layout/FormLayout";
import { InputComponent } from "@/components/ui/input-component";
import { useFormContext } from "@/context/FormContext";
import { physicalDataSchema, PhysicalDataForm } from "@/lib/validations";
import ButtonComponent from "@/components/ui/button-component";

export default function PhysicalDataPage() {
  const router = useRouter();
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhysicalDataForm>({
    resolver: zodResolver(physicalDataSchema),
    defaultValues: {
      age: formData.age || undefined,
      height: formData.height || undefined,
      weight: formData.weight || undefined,
    },
  });

  const onSubmit = (data: PhysicalDataForm) => {
    updateFormData(data);
    setCurrentStep(3);
    router.push("/steps/activity-level");
  };

  const goBack = () => {
    setCurrentStep(1);
    router.push("/steps/personal-info");
  };

  return (
    <FormLayout
      title="Dados Físicos"
      subtitle="Nos conte sobre suas medidas corporais"
      currentStep={2}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
        <InputComponent
          {...register("age", { valueAsNumber: true })}
          type="number"
          label="Idade (anos)"
          placeholder="ex: 25"
          error={errors.age?.message}
          isRequired
        />

        <InputComponent
          {...register("height", { valueAsNumber: true })}
          type="number"
          step="0.01"
          label="Altura (metros)"
          placeholder="ex: 1.75"
          error={errors.height?.message}
          isRequired
        />

        <InputComponent
          {...register("weight", { valueAsNumber: true })}
          type="number"
          step="0.1"
          label="Peso (kg)"
          placeholder="ex: 70.5"
          error={errors.weight?.message}
          isRequired
        />

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
