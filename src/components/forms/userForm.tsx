import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";

import UserAvatar from "../UserAvatar";
import ControlledTextField from "./Controlled/ControlledTextField";
import ControlledDropdown from "./Controlled/ControlledDropdown";
import ControlledDatePicker from "./Controlled/ControlledDatePicker";

export type UserFormValues = {
  id?: string;
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  phone?: string;
  dateOfBirth?: string;
  picture?: string;
};

export type UserFormMode = "create" | "edit" | "view";

type Props = {
  mode: UserFormMode;
  initialValues?: Partial<UserFormValues>;
  onSubmit?: (v: UserFormValues) => void | Promise<void>;
  accentColor?: string;
};

const schema = yup.object({
  id: yup.string().optional(),
  title: yup.string().required("El título es requerido"),
  firstName: yup.string().min(2).required("El nombre es requerido"),
  lastName: yup.string().min(2).required("El apellido es requerido"),
  email: yup.string().email().required("El correo es requerido"),
  gender: yup.string().required("El género es requerido"),
  phone: yup
    .string()
    .matches(/^[0-9]{9,15}$/)
    .required("El teléfono es requerido"),
  dateOfBirth: yup
    .date()
    .max(new Date())
    .required("La fecha de nacimiento es requerida"),
  picture: yup.string().url().required(),
});

const TITLES = [
  { label: "Mr", value: "mr" },
  { label: "Ms", value: "ms" },
  { label: "Mrs", value: "mrs" },
  { label: "Miss", value: "miss" },
  { label: "Dr", value: "dr" },
];

const GENDERS = [
  { label: "Masculino", value: "male" },
  { label: "Femenino", value: "female" },
  { label: "Otro", value: "otro" },
];

export default function UserForm({
  mode,
  initialValues,
  onSubmit,
  accentColor = "#8fd32c",
}: Props) {
  const editable = mode !== "view";
  // Inicializa react-hook-form con tipado de valores del formulario
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: {
      picture:
        initialValues?.picture ||
        "https://ik.imagekit.io/o5chwt6p8/Galileo?updatedAt=1755809270497",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  // effect que inicializa el formulario con los valores recibidos
  React.useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        picture:
          initialValues.picture ||
          "https://ik.imagekit.io/o5chwt6p8/Default?updatedAt=1755892893537",
      });
    }
  }, [initialValues, reset]);
  // Función que envía el formulario solo si es editable
  const submit: SubmitHandler<UserFormValues> = async (values) => {
    if (!editable) return;
    await onSubmit?.(values);
  };

  return (
    <View style={styles.page}>
      {/* Avatar */}
      <UserAvatar
        uri={initialValues?.picture}
        editable={editable}
        accentColor={accentColor}
        onChange={(uri) => setValue("picture", uri ?? "")}
      />

      {/* Card con los campos */}
      <View style={styles.formCard}>
        <ControlledTextField
          control={control}
          name="id"
          placeholder="ID"
          icon="key-outline"
          editable={false}
          errors={errors}
        />

        <ControlledDropdown
          control={control}
          name="title"
          data={TITLES}
          placeholder="Título"
          icon="document-text-outline"
          editable={editable}
          styles={styles}
          errors={errors}
        />

        <ControlledTextField
          control={control}
          name="firstName"
          placeholder="Nombres"
          icon="create-outline"
          editable={editable}
          errors={errors}
        />

        <ControlledTextField
          control={control}
          name="lastName"
          placeholder="Apellidos"
          icon="create-outline"
          editable={editable}
          errors={errors}
        />

        <ControlledDropdown
          control={control}
          name="gender"
          data={GENDERS}
          placeholder="Género"
          icon="male-female-outline"
          editable={editable}
          styles={styles}
          errors={errors}
        />

        <ControlledTextField
          control={control}
          name="email"
          placeholder="Correo electrónico"
          icon="mail-outline"
          keyboardType="email-address"
          editable={editable}
          errors={errors}
        />

        <ControlledDatePicker
          control={control}
          name="dateOfBirth"
          editable={editable}
          styles={styles}
          errors={errors}
        />

        <ControlledTextField
          control={control}
          name="phone"
          placeholder="Teléfono"
          icon="call-outline"
          keyboardType="numeric"
          editable={editable}
          errors={errors}
        />
      </View>

      {/* Botones */}
      {editable && (
        <View style={styles.botones}>
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            style={[styles.basicButton, { backgroundColor: accentColor }]}
          >
            <Ionicons
              name="checkmark"
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.ctaText}>
              {isSubmitting ? "Guardando…" : "Guardar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={[styles.basicButton, { backgroundColor: "#bebebe" }]}
          >
            <Ionicons
              name="close"
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.ctaText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#eef6e8", marginTop: 15 },

  formCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    marginHorizontal: 14,
    paddingVertical: 10,
    marginTop: 15,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  botones: { marginTop: 15, marginHorizontal: 60 },
  basicButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 15,
    marginVertical: 6,
  },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  // estilos dropdown reutilizados
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dfe5ea",
    borderRadius: 14,
    backgroundColor: "#fff",
    margin: 8,
    paddingHorizontal: 10,
  },
  icon: { marginRight: 8 },
  dropdown: { flex: 1, height: 48 },
  placeholderStyle: { color: "#9aa3a7", fontSize: 14 },
  selectedTextStyle: { color: "#16242c", fontSize: 14 },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dfe5ea",
    borderRadius: 14,
    backgroundColor: "#fff",
    margin: 8,
    paddingHorizontal: 10,
    height: 48,
  },
  dateField: { flex: 1 },
  selectedText: { color: "#16242c", fontSize: 16 },
  placeholderText: { color: "#9aa3a7", fontSize: 16 },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dfe5ea",
    borderRadius: 14,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 48,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: "#16242c",
  },
  placeholder: {
    color: "#9aa3a7",
  },

  //error
  error: {
    marginTop: 6,
    color: "red",
    fontSize: 12,
    marginLeft: 8,
    paddingHorizontal: 12,
  },
});
