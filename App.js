import { Provider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";

// note que criamos o arquivo src/config/theme.js
import { themeDark, themeLight } from "./src/config/theme";
import { useColorScheme } from "react-native";

export default function App() {
  // pega o tema do dispositivo
  const colorScheme = useColorScheme();
  // criação de tema
  // https://callstack.github.io/react-native-paper/docs/guides/theming/#creating-dynamic-theme-colors
  const isDarkMode = colorScheme === "dark";
  
  // operador ternário
  const theme = isDarkMode ? themeDark : themeLight;

  return (
    <Provider theme={theme}>
      {/* aqui usamos o provider do RNP */}
      <AppNavigator />
    </Provider>
  );
}
