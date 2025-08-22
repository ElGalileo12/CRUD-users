import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  control: any;
  name: string;
  editable?: boolean;
  styles: any;
  errors?: any;
};

export default function ControlledDatePicker({
  control,
  name,
  editable = true,
  styles,
  errors,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name={name}
        // react-hook-form conecta este campo con el formulario
        render={({ field: { value, onChange } }) => (
          <View style={styles.inputWrapper}>
            <Ionicons
              name="calendar-outline"
              size={20}
              style={[styles.icon, { color: value ? "#16242c" : "#9aa3a7" }]}
            />
            {/* Campo que abre el DatePicker */}
            <TouchableOpacity
              style={styles.dateField}
              onPress={() => setShow(true)}
              disabled={!editable}
            >
              <Text
                style={value ? styles.selectedText : styles.placeholderText}
              >
                {value
                  ? new Date(value).toLocaleDateString()
                  : "Fecha de nacimiento"}
              </Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShow(false);
                  if (selectedDate) {
                    onChange(selectedDate.toISOString());
                  }
                }}
              />
            )}
          </View>
        )}
      />
      {/* Error del campo si existe */}
      {errors?.[name] && (
        <Text style={styles.error}>{errors[name].message}</Text>
      )}
    </>
  );
}
