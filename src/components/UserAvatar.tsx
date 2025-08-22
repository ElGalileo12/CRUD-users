import * as React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

type Props = {
  uri?: string; // imagen actual del avatar
  onChange?: (uri?: string) => void; // callback al cambiar la imagen
  editable?: boolean; // si se puede editar o no
  accentColor?: string; // color del botón de editar
};

export default function UserAvatar({
  uri,
  onChange,
  editable = true,
  accentColor = "#8fd32c",
}: Props) {
  // Abre la galería y devuelve la imagen seleccionada
  const pick = async () => {
    if (!editable) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!res.canceled && res.assets?.[0]?.uri) onChange?.(res.assets[0].uri);
  };

  return (
    <View style={styles.wrap}>
      {/* Imagen del avatar o placeholder */}
      <Image
        source={uri ? { uri } : require("../assets/icon_avatar.jpg")}
        style={styles.image}
      />
      {/* Botón flotante para editar */}
      {editable && (
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: accentColor }]}
          onPress={pick}
        >
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 14,
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bfc7cc",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f0f2f4",
  },
  fab: {
    position: "absolute",
    right: -6,
    top: -6,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
});
