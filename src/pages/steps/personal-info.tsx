import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FormLayout } from "@/components/layout/FormLayout";
import { InputComponent } from "@/components/ui/input-component";
import { useFormContext } from "@/context/FormContext";
import { personalInfoSchema, PersonalInfoForm } from "@/lib/validations";
import ButtonComponent from "@/components/ui/button-component";
import { SexInfo } from "@/types";
import Card from "@/components/ui/card";

const sexes: SexInfo[] = [
  { value: "man", label: "Masculino", description: "Pessoa do sexo masculino" },
  { value: "woman", label: "Feminino", description: "Pessoa do sexo feminino" },
];

export default function PersonalInfoPage() {
  const router = useRouter();
  const { formData, updateFormData, setCurrentStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: formData.name || "",
    },
  });

  const selectedGender = watch("gender");

  const onSubmit = (data: PersonalInfoForm) => {
    updateFormData(data);
    setCurrentStep(2);
    router.push("/steps/physical-data");
  };

  return (
    <FormLayout
      title="Informações Pessoais"
      subtitle="Vamos começar com suas informações básicas"
      currentStep={1}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
        <InputComponent
          {...register("name")}
          label="Qual é o seu nome?"
          placeholder="Digite seu nome completo"
          error={errors.name?.message}
          isRequired
        />

        <Text mb={2} fontSize="sm" fontWeight="medium">
          Qual é o seu sexo?
          <Text as="span" color="red.500" ml={1}>
            *
          </Text>
        </Text>

        <Flex direction="column" fontSize="sm" mb={4} gap={2}>
          {sexes.map((sex) => (
            <Card
              key={sex.value}
              item={sex}
              selectedItem={selectedGender}
              setValue={() => setValue("gender", sex.value)}
            />
          ))}
        </Flex>

        {errors && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {errors.gender?.message}
          </Text>
        )}

        <ButtonComponent
          w="100%"
          label="Próximo Passo"
          isSubmitting={isSubmitting}
        />
      </Box>
    </FormLayout>
  );
}
