import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
        <Ionicons
          name="home"
          size={24}
          color={state.index === 0 ? "#0c5a53" : "#999"}
        />
      </TouchableOpacity>

      {/* Buscador */}
      <TouchableOpacity>
        <Ionicons name="search" size={24} color="#999" />
      </TouchableOpacity>

      {/* Botón central Crear */}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => navigation.navigate("Crear")}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Notificaciones */}
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="#999" />
      </TouchableOpacity>

      {/* Configuración */}
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#8fd32c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
});
