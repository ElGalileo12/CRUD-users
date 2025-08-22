import * as React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/users";
import UserForm from "../components/forms/userForm";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { Ionicons } from "@expo/vector-icons";

// Tipado de la ruta para asegurar que recibimos el parámetro correcto
type UserDetailRouteProp = RouteProp<RootStackParamList, "UserDetail">;

export default function UserDetailScreen() {
  // Hook de navegación con tipado de stack
  const navigation =
    useNavigation<
      import("@react-navigation/native-stack").NativeStackNavigationProp<RootStackParamList>
    >();

  // Obtenemos los parámetros de la ruta (ej: el id del usuario)
  const route = useRoute<UserDetailRouteProp>();
  const { id } = route.params;

  // Llamada a la API con React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id], // clave única para este query
    queryFn: () => fetchUser(id), // función que trae el usuario
  });

  // Mientras se carga mostramos un spinner
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  // Si hay error o no llega data mostramos un mensaje
  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text>Error cargando usuario</Text>
      </View>
    );
  }

  // Render principal cuando sí hay datos
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      <View style={styles.header}>
        <Text style={styles.info}>Información{"\n"}del usuario</Text>
        {/* Botón para navegar al formulario en modo edición */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("UserForm", { mode: "edit", id })}
        >
          <Ionicons name="create-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Formulario mostrado en modo "solo lectura" con los datos del usuario */}
      <UserForm mode="view" initialValues={data} />
    </ScrollView>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scroll: { flex: 1, backgroundColor: "#eef6e8" },
  info: {
    fontSize: 28,
    fontWeight: "800",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f8e6",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  editButton: {
    backgroundColor: "#8fd32c",
    borderRadius: 50,
    padding: 15,
  },
});
