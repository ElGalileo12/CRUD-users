import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonActions } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";

import UsersListScreen from "../screens/UsersListScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import UserFormScreen from "../screens/UserFormScreen";
import AppHeader from "../components/AppHeader";

// Pantallas internas del stack
export type RootStackParamList = {
  UsersList: undefined;
  UserDetail: { id: string };
  UserForm: { mode: "create" } | { mode: "edit"; id: string };
};

export type RootTabParamList = {
  Inicio: { screen?: keyof RootStackParamList } | undefined;
  Crear: undefined;
  Buscador: undefined;
  Notificaciones: undefined;
  Config: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// Stack de Usuarios
function UsersStack({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => (
          <AppHeader
            title="Finanzauto"
            breadcrumb={[
              "Inicio",
              route.name === "UserDetail"
                ? "Detalle"
                : route.name === "UserForm"
                ? "Formulario"
                : "",
            ].filter(Boolean)}
            onPressInicio={() =>
              navigation.navigate("Inicio", { screen: "UsersList" })
            }
          />
        ),
      })}
    >
      <Stack.Screen name="UsersList" component={UsersListScreen} />
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="UserForm" component={UserFormScreen} />
    </Stack.Navigator>
  );
}

// Stack de Crear Usuario
function CreateStack({ navigation }: { navigation: any }) {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => (
          <AppHeader
            title="Finanzauto"
            breadcrumb={[
              "Inicio",
              route.name === "UserForm" ? "Crear usuario" : "",
            ]}
            onPressInicio={() =>
              navigation.navigate("Inicio", { screen: "UsersList" })
            }
          />
        ),
      })}
    >
      <Stack.Screen
        name="UserForm"
        component={UserFormScreen}
        initialParams={{ mode: "create" }}
      />
    </Stack.Navigator>
  );
}

//  Navegador raíz con notch
export default function RootNavigator() {
  return (
    <CurvedBottomBar.Navigator
      {...({
        type: "DOWN",
        height: 70,
        circleWidth: 65,
        bgColor: "white",
        borderTopLeftRight: 20,
        initialRouteName: "Inicio",
        circlePosition: "CENTER",
        style: {},
        width: 0,
        borderColor: "transparent",
        borderWidth: 0,
        shadowStyle: {},
        screenOptions: { headerShown: false },
        screenListeners: {},
        backBehavior: "none",
      } as any)}
      renderCircle={({
        navigate,
      }: {
        navigate: (routeName: string) => void;
      }) => (
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => navigate("Crear")}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      )}
      tabBar={({
        routeName,
        selectedTab,
        navigate,
      }: {
        routeName: string;
        selectedTab: string;
        navigate: (routeName: string) => void;
      }) => {
        let icon = "home";
        if (routeName === "Buscador") icon = "search";
        if (routeName === "Notificaciones") icon = "notifications-outline";
        if (routeName === "Config") icon = "settings-outline";

        return (
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
              if (routeName === "Inicio") {
                // reset al stack
                navigate("Inicio"); // asegura que está en el tab Inicio
                navigationRef.current?.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Inicio" }],
                  })
                );
              } else {
                navigate(routeName);
              }
            }}
          >
            <Ionicons
              name={icon}
              size={26}
              color={routeName === selectedTab ? "#0c5a53" : "#999"}
            />
          </TouchableOpacity>
        );
      }}
    >
      <CurvedBottomBar.Screen
        name="Inicio"
        position="LEFT"
        component={UsersStack}
      />
      <CurvedBottomBar.Screen
        name="Buscador"
        position="LEFT"
        component={() => null}
      />
      <CurvedBottomBar.Screen
        name="Crear"
        position="CENTER"
        component={CreateStack}
      />
      <CurvedBottomBar.Screen
        name="Notificaciones"
        position="RIGHT"
        component={() => null}
      />
      <CurvedBottomBar.Screen
        name="Config"
        position="RIGHT"
        component={() => null}
      />
    </CurvedBottomBar.Navigator>
  );
}

export const navigationRef = createNavigationContainerRef();

//  Estilos
const styles = StyleSheet.create({
  centerButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#8fd32c",
    alignItems: "center",
    justifyContent: "center",
    bottom: 20, // sobresale
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
