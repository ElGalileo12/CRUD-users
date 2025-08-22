import React from "react";
import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  control: any;
  name: string;
  data: { label: string; value: string }[];
  placeholder: string;
  icon: string;
  editable?: boolean;
  styles: any;
  errors?: any;
};

export default function ControlledDropdown({
  control,
  name,
  data,
  placeholder,
  icon,
  editable = true,
  styles,
  errors,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      // Conecta el dropdown con react-hook-form
      render={({ field: { value, onChange } }) => (
        <>
          <View style={styles.inputWrapper}>
            {/* Ícono a la izquierda del campo */}
            <Ionicons
              name={icon as any}
              size={20}
              style={[styles.icon, { color: value ? "#16242c" : "#9aa3a7" }]}
            />
            {/* Dropdown controlado */}
            <Dropdown
              style={styles.dropdown}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              value={value}
              onChange={(item) => onChange(item.value)}
              disable={!editable}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
            />
          </View>
          {/* Mensaje de error si lo hay */}
          {errors?.[name] && (
            <Text style={styles.error}>{errors[name].message}</Text>
          )}
        </>
      )}
    />
  );
}
