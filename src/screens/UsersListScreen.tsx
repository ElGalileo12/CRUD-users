import * as React from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers, deleteUser } from "../api/users";
import UserCard from "../components/UserCard";
import type { User } from "../types/user";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "UsersList">;

const PAGE_SIZE = 6; // Cantidad de usuarios por página

export default function UsersListScreen({ navigation }: Props) {
  // Hook de react-query para obtener usuarios de forma paginada/infinita
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["users"], // clave de cache
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchUsers(pageParam, PAGE_SIZE);
      return response;
    },
    getNextPageParam: (lastPage) => {
      // Calcula si hay más páginas disponibles
      const nextPage = lastPage.page + 1;
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      return nextPage < totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  // Unifica los datos de todas las páginas en un solo arreglo
  const items: User[] = React.useMemo(() => {
    return (data?.pages ?? []).flatMap((p) => p.data);
  }, [data]);

  // Cargar más cuando se llegue al final de la lista
  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  //  Indicador de carga al final de la lista (scroll infinito)
  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={{ marginVertical: 12 }} />;
  };

  return (
    <View style={styles.container}>
      {/* Estado: cargando */}
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      ) : items.length === 0 ? (
        // Estado: lista vacía
        <View style={styles.center}>
          <Text>No hay usuarios</Text>
        </View>
      ) : (
        // Estado: lista con datos
        <>
          <Text style={styles.info}>Consulta y Registro{"\n"}de Usuarios</Text>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UserCard
                item={item}
                onPress={() =>
                  navigation.navigate("UserDetail", { id: item.id })
                }
                // Eliminar usuario y refrescar lista
                onDelete={async (id) => {
                  try {
                    await deleteUser(id);
                    await refetch();
                  } catch (err) {
                    console.error("Error al eliminar usuario:", err);
                  }
                }}
              />
            )}
            onEndReachedThreshold={0.4}
            onEndReached={onEndReached}
            // Refrescar la lista con "pull to refresh"
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ paddingVertical: 8, paddingBottom: 100 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f9" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  fabText: { color: "#fff", fontSize: 28, lineHeight: 28, fontWeight: "700" },
  // Título de la lista
  info: {
    fontSize: 28,
    fontWeight: "800",
    paddingHorizontal: 30,
    marginTop: 20,
  },
});
