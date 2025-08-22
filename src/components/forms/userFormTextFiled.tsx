import * as React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  placeholder: string;
  value?: string;
  onChangeText?: (t: string) => void;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  editable?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  error?: string;
};

export default function FormTextField({
  placeholder,
  value,
  onChangeText,
  icon = "card-outline",
  editable = true,
  keyboardType = "default",
  error,
}: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.inputRow}>
        {/* Ícono al inicio del input */}
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={value && value.trim() !== "" ? "#16242c" : "#9aa3a7"}
            style={styles.icon}
          />
        )}
        {/* Campo de texto */}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          keyboardType={keyboardType}
          style={[styles.input, !editable && styles.readonly]}
          placeholderTextColor="#9aa3a7"
        />
      </View>
      {/* Mensaje de error debajo del input */}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dfe5ea",
    borderRadius: 14,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#16242c",
  },
  readonly: {
    color: "#16242c",
  },
  error: {
    marginTop: 6,
    color: "red",
    fontSize: 12,
    marginLeft: 8,
  },
});
