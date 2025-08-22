import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { User } from "../types/user";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

type Props = {
  item: User;
  onPress: () => void;
  onDelete: (id: string) => void;
};

export default function UserCard({ item, onPress, onDelete }: Props) {
  // Estado para mostrar/ocultar el modal de confirmación
  const [showConfirm, setShowConfirm] = React.useState(false);

  // Acción al deslizar hacia la izquierda → muestra botón de eliminar
  const renderRightActions = () => (
    <View
      style={{ width: 85, justifyContent: "center", alignItems: "flex-end" }}
    >
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setShowConfirm(true)}
      >
        <Ionicons name="trash-outline" size={28} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.cardWrapper}>
        {/* Card deslizable con Swipeable */}
        <Swipeable renderRightActions={renderRightActions}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={onPress}
          >
            {/* Parte superior de la card (nombre + id) */}
            <View style={styles.top}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.id}>ID: {item.id}</Text>
            </View>

            {/* Imagen del usuario superpuesta */}
            <Image source={{ uri: item.picture }} style={styles.avatar} />

            {/* Parte inferior de la card (detalle + flecha) */}
            <View style={styles.bottom}>
              <Text style={styles.detail}>Ver detalle</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#2b6d6b"
              />
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>

      {/* Modal de confirmación al eliminar */}
      <Modal
        visible={showConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Encabezado del modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novedad</Text>
              <Text style={styles.modalSubtitle}>Eliminar</Text>
            </View>

            {/* Mensaje de confirmación */}
            <Text style={styles.modalMessage}>
              ¿Está seguro de que desea eliminar el registro?
            </Text>

            {/* Botones Aceptar / Cancelar */}
            <View style={styles.modalbutton}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => {
                  setShowConfirm(false);
                  onDelete(item.id); // Elimina al usuario
                }}
              >
                <Text style={styles.acceptText}>✓ Aceptar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>✕ Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Contenedor externo de la card
  cardWrapper: {
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    overflow: "hidden",
  },
  // Card principal
  card: {
    borderRadius: 20,
    elevation: 3,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#efefef",
  },
  // Parte superior (nombre + id)
  top: {
    backgroundColor: "#cce6e3",
    height: 110,
    borderRadius: 20,
    justifyContent: "center",
    paddingLeft: 50,
  },
  // Parte inferior (detalle + flecha)
  bottom: {
    backgroundColor: "#efefef",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 160,
  },
  // Imagen de usuario
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 10,
    borderWidth: 1,
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 10,
  },
  // Texto de nombre
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2b6d6b",
    marginLeft: 110,
  },
  // Texto de ID
  id: {
    fontSize: 12,
    color: "#000",
    marginLeft: 110,
    marginTop: 8,
    fontWeight: "500",
  },
  // Texto detalle
  detail: {
    textAlign: "right",
    fontWeight: "600",
    color: "#2b6d6b",
  },
  // Botón de eliminar (deslizable)
  deleteButton: {
    backgroundColor: "#f8d0d0",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  // Estilos del modal
  modalHeader: {
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(26, 95, 95, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "80%",
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#a2d032",
  },
  modalSubtitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#2b6d6b",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  // Botón aceptar
  acceptButton: {
    backgroundColor: "#a2d032",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  acceptText: {
    color: "#fff",
    fontWeight: "700",
  },
  // Contenedor botones modal
  modalbutton: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  // Botón cancelar
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelText: {
    color: "#555",
    fontWeight: "600",
  },
});
