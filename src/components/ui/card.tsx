import { ActivityLevelOption, SexInfo, GoalOption } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  item: ActivityLevelOption | GoalOption | SexInfo;
  selectedItem: string;
  setValue: (field: string, value: string) => void;
};

export default function Card({ item, selectedItem, setValue }: Props) {
  return (
    <Box
      p={3}
      borderColor={selectedItem === item.value ? "blue.500" : "gray.200"}
      borderRadius="lg"
      cursor="pointer"
      bg={selectedItem === item.value ? "#ffc739" : "gray.100"}
      onClick={() => setValue("activityLevel", item.value)}
      transition="all 0.2s"
    >
      <Flex align="center">
        <Box>
          <Text fontWeight="semibold" color="gray.800">
            {item.label}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {item.description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
