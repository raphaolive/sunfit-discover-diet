import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/steps/personal-info");
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <Image src="/logo.png" alt="Logo" width={150} height={150} />
      <Box textAlign="center" maxW="600px">
        <Heading
          size="2xl"
          color="blue.600"
          mb={4}
          bgGradient="linear(to-r, blue.600, purple.600)"
          bgClip="text"
        >
          SunFit Discover Diet
        </Heading>

        <Text color="gray.400" mb={8} lineHeight="tall">
          Obtenha seu plano alimentar personalizado com recomendações
          nutricionais baseadas em Inteligência Artificial. Calcule sua TMB
          (Taxa Metabólica Basal) e receba um plano alimentar completo com lista
          de compras de supermercado.
        </Text>

        <Button
          size="lg"
          mt={8}
          px={12}
          py={6}
          borderRadius={12}
          fontSize="lg"
          onClick={handleGetStarted}
          transition="all 0.2s"
        >
          Comece agora - Grátis
        </Button>

        <Text fontSize="sm" color="gray.400" mt={4}>
          Leva apenas 2-3 minutos para completar
        </Text>
      </Box>
    </Box>
  );
}
