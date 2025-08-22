import * as React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import UserForm, { UserFormValues } from "../components/forms/userForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUser, updateUser } from "../api/users";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  RootStackParamList,
  RootTabParamList,
} from "../navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type Props = NativeStackScreenProps<RootStackParamList, "UserForm">;

export default function UserFormScreen({ route }: Props) {
  const mode = "mode" in route.params ? route.params.mode : "create";
  const userId = "id" in route.params ? route.params.id : undefined;
  const qc = useQueryClient();

  // obtenemos navegación del TAB para poder saltar a Inicio
  const tabNav = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  // Si es edición, traigo los datos del usuario
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId!),
    enabled: mode === "edit" && !!userId,
  });

  // Mutación de creación
  const createMutation = useMutation({
    mutationFn: async (v: UserFormValues) => createUser(v),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      Alert.alert("Éxito", "Usuario creado");
      // en vez de goBack, mandamos directo a Inicio > UsersList
      tabNav.navigate("Inicio", { screen: "UsersList" });
    },
    onError: (e: any) => {
      Alert.alert("Error", e?.message ?? "No se pudo crear");
    },
  });

  // Mutación de edición
  const updateMutation = useMutation({
    mutationFn: async (v: UserFormValues) => updateUser(userId!, v),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      Alert.alert("Éxito", "Usuario actualizado");
      // lo mismo aquí
      tabNav.navigate("Inicio", { screen: "UsersList" });
    },
    onError: (e: any) => {
      Alert.alert("Error", e?.message ?? "No se pudo actualizar");
    },
  });

  // Si está cargando en modo edición
  if (mode === "edit" && isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#8fd32c" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.info}>
        {mode === "edit"
          ? "Editar información del usuario"
          : "Información del usuario"}
      </Text>

      <UserForm
        mode={mode}
        initialValues={mode === "edit" ? user : {}}
        onSubmit={async (v) => {
          if (mode === "edit") {
            await updateMutation.mutateAsync(v);
          } else {
            await createMutation.mutateAsync(v);
          }
        }}
        accentColor="#8fd32c"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef6e8" },
  content: { paddingBottom: 100 },
  info: { fontSize: 28, fontWeight: "bold", margin: 16 },
});
