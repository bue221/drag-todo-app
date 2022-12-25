import { Html, Head, Main, NextScript } from "next/document";
// chakra UI
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "theme";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
