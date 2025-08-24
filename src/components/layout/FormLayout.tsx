import React, { ReactNode } from "react";
import { Box, Heading, Text, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";

interface FormLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps?: number;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <Center minH="100vh">
      <Flex direction="column" gap={6} h="100vh" p={8}>
        {/* Header */}
        <Flex direction="column" align="center">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
          <Text color="gray.400">
            Planejamento nutricional personalizado com IA
          </Text>
        </Flex>
        {/* Form Card */}
        <Box
          mx="auto"
          w="100%"
          p={6}
          flex={1}
          alignContent="center"
        >
          <Flex
            direction="column"
            gap={4}
            w="350px"
            maxW="100%"
            
          >
            <Flex direction="column" gap={2} textAlign="center">
              <Heading size="lg" color="gray.200">
                {title}
              </Heading>
            </Flex>
            {subtitle && (
              <Text fontSize="md" color="gray.300" m="auto">
                {subtitle}
              </Text>
            )}
            {children}
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
};
