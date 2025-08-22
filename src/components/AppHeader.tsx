import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  breadcrumb?: string[];
  onPressInicio?: () => void; // callback opcional para volver al inicio
};

export default function AppHeader({
  title,
  breadcrumb = [],
  onPressInicio,
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Logo/título */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Breadcrumb + menú */}
      {breadcrumb.length > 0 && (
        <View style={styles.breadcrumb}>
          {/* Breadcrumb */}
          <View style={styles.breadcrumbItems}>
            {breadcrumb.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (item === "Inicio" && onPressInicio) {
                    onPressInicio();
                  }
                }}
              >
                <Text
                  style={[
                    styles.bcText,
                    index === breadcrumb.length - 1 && styles.bcActive,
                  ]}
                >
                  {item}
                  {index < breadcrumb.length - 1 && " › "}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Menú */}
          <Ionicons name="menu" size={30} color="#fff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
  },
  topBar: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    color: "#2b6d6b",
    fontWeight: "800",
    paddingHorizontal: 16,
    fontSize: 40,
  },
  breadcrumb: {
    backgroundColor: "#2b6d6b",
    paddingHorizontal: 28,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breadcrumbItems: {
    flexDirection: "row",
    alignItems: "center",
  },
  bcText: {
    color: "#e0eceb",
    fontSize: 17,
  },
  bcActive: {
    color: "#b8e986",
    fontWeight: "600",
  },
});
