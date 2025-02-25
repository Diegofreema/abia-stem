import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  hideBelow?: "md" | "lg";
  hideFrom?: "sm" | "md" | "lg";
};
export const Responsive = ({
  children,
  hideBelow = "md",
  hideFrom,
}: PropsWithChildren<Props>) => {
  return (
    <Box hideBelow={hideBelow} hideFrom={hideFrom}>
      {children}
    </Box>
  );
};
