import { extendTheme } from "@chakra-ui/react";
import { ButtonStyle as Button } from "./ButtonStyle";

export const theme = extendTheme({
  colors: {
    primary: "#a9b1ec",
    secondary: "#706fd3",
  },
  components: {
    Button,
  },
});
