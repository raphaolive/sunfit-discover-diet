import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button, Text, Heading, Flex, Spinner } from "@chakra-ui/react";
import { FormLayout } from "@/components/layout/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { pdfHandler } from "@/utils/pdfHandler";

export interface DietPlanResponse {
  tmb: number;
  dailyCalories: number;
  dietPlan: string;
  success: boolean;
}

export default function DietPlanPage() {
  const router = useRouter();
  const { formData, resetFormData } = useFormContext();
  const [dietPlan, setDietPlan] = useState<DietPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasGenerated = useRef(false);

  // Function to render text with bold formatting
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text as="span" key={index} fontWeight="bold">
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
  };

  const generateDietPlan = async () => {
    if (hasGenerated.current) return; // Prevent duplicate calls

    try {
      setLoading(true);
      hasGenerated.current = true;
      console.log("Form Data:", formData);
      const response = await fetch("/api/generate-diet-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate diet plan");
      }

      const data: DietPlanResponse = await response.json();
      setDietPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    resetFormData();
    router.push("/");
  };

  const handleSavePlan = () => {
    pdfHandler(dietPlan!, formData);
  };

  const handleRetry = () => {
    setError(null);
    generateDietPlan();
  };

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      generateDietPlan();
    } else {
      router.push("/steps/personal-info");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, router]);

  if (loading) {
    return (
      <FormLayout
        title="Gerando Seu Plano Alimentar"
        subtitle="Aguarde enquanto criamos seu plano de nutrição personalizado..."
        currentStep={5}
        totalSteps={5}
      >
        <Flex direction="column" align="center" gap={4} py={8}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600">Isso pode levar alguns momentos...</Text>
        </Flex>
      </FormLayout>
    );
  }

  if (error) {
    return (
      <FormLayout
        title="Erro"
        subtitle="Algo deu errado"
        currentStep={5}
        totalSteps={5}
      >
        <Box
          p={4}
          bg="red.50"
          borderRadius="md"
          borderLeft="4px"
          borderColor="red.500"
        >
          <Text color="red.700" fontWeight="medium">
            Erro
          </Text>
          <Text color="red.600">{error}</Text>
        </Box>
        <Button
          bg="#ffb700"
          _hover={{ backgroundColor: "#ffc739" }}
          onClick={handleRetry}
          mt={4}
        >
          Tentar Novamente
        </Button>
        <Button onClick={handleStartOver}>Começar Novamente</Button>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      title="Seu Plano Alimentar Personalizado"
      subtitle={`Olá ${formData.name}! Aqui está seu plano de nutrição customizado.`}
      currentStep={5}
      totalSteps={5}
    >
      <Box w="100%">
        {dietPlan && (
          <>
            {/* Summary Cards */}
            <Flex gap={4} mb={4} wrap="wrap">
              <Box
                flex="1"
                minW="150px"
                p={2}
                bg="blue.50"
                borderRadius="md"
                textAlign="center"
              >
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                  {dietPlan.tmb}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  TMB (kcal/dia)
                </Text>
              </Box>
              <Box
                flex="1"
                minW="150px"
                p={2}
                bg="green.50"
                borderRadius="md"
                textAlign="center"
              >
                <Text fontSize="2xl" fontWeight="bold" color="green.600">
                  {dietPlan.dailyCalories}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Calorias Alvo
                </Text>
              </Box>
            </Flex>

            {/* Diet Plan Content */}
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p={6}
              mb={6}
              maxH="350px"
              overflowY="auto"
              scrollBehavior="smooth"
              scrollbar="hidden"
            >
              <Box as="div">
                {dietPlan.dietPlan.split("\n").map((line, index) => {
                  if (line.startsWith("# ")) {
                    return (
                      <Heading key={index} size="lg" mt={4} mb={2}>
                        {renderTextWithBold(line.replace("# ", ""))}
                      </Heading>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <Heading key={index} size="md" mt={3} mb={2}>
                        {renderTextWithBold(line.replace("## ", ""))}
                      </Heading>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <Heading key={index} size="sm" mt={3} mb={2}>
                        {renderTextWithBold(line.replace("### ", ""))}
                      </Heading>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <Text key={index} ml={4} mb={1}>
                        • {renderTextWithBold(line.replace("- ", ""))}
                      </Text>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <Text key={index} mb={2}>
                        {renderTextWithBold(line)}
                      </Text>
                    );
                  }
                  return <Box key={index} mb={2} />;
                })}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Flex gap={4} wrap="wrap">
              <Button flex="1" minW="200px" onClick={handleSavePlan}>
                Salvar Plano Alimentar
              </Button>
              <Button
                bg="#ffb700"
                _hover={{ backgroundColor: "#ffc739" }}
                flex="1"
                minW="200px"
                onClick={handleStartOver}
              >
                Criar Novo Plano
              </Button>
            </Flex>
          </>
        )}
      </Box>
    </FormLayout>
  );
}
