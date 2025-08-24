import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import React from "react";

type Props = {
  label: string;
  isSubmitting: boolean;
} & ButtonProps;

export default function ButtonComponent({
  label,
  isSubmitting,
  ...rest
}: Props) {
  return (
    <ChakraButton
      type="submit"
      minW="200px"
      loading={isSubmitting}
      bg="#ffb700"
      _hover={{backgroundColor: "#ffc739"}}
      {...rest}
    >
      {label}
    </ChakraButton>
  );
}
