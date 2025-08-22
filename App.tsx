import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { AppState, Platform } from "react-native";
import { navigationRef } from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();

function onAppStateChange(status: string) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function App() {
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
