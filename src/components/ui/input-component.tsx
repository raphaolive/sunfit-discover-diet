import React, { forwardRef } from "react";
import { Input as ChakraInput, Text, Box, InputProps } from "@chakra-ui/react";

interface CustomInputProps extends Omit<InputProps, "ref"> {
  label?: string;
  error?: string;
  isRequired?: boolean;
}

export const InputComponent = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, isRequired, ...props }, ref) => {
    return (
      <Box mb={6}>
        {label && (
          <Text mb={2} fontSize="sm" fontWeight="medium">
            {label}
            {isRequired && (
              <Text as="span" color="red.500" ml={1}>
                *
              </Text>
            )}
          </Text>
        )}
        <ChakraInput
          ref={ref}
          px={6}
          borderRadius="lg"
          borderColor={error ? "red.300" : "gray.200"}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px #3182ce",
          }}
          _hover={{
            borderColor: "gray.300",
          }}
          {...props}
        />
        {error && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {error}
          </Text>
        )}
      </Box>
    );
  }
);

InputComponent.displayName = "InputComponent";
