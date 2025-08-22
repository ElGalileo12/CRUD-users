import React from "react";
import { Controller } from "react-hook-form";
import FormTextField from "../userFormTextFiled";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  control: any;
  name: string;
  placeholder: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  keyboardType?: "default" | "email-address" | "numeric";
  editable?: boolean;
  errors?: any;
};

export default function ControlledTextField({
  control,
  name,
  placeholder,
  icon,
  keyboardType = "default",
  editable = true,
  errors,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      // Conecta el input con react-hook-form
      render={({ field: { value, onChange } }) => (
        <FormTextField
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          editable={editable}
          keyboardType={keyboardType}
          icon={icon}
          error={errors?.[name]?.message}
        />
      )}
    />
  );
}
