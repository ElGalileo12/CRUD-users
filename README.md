# CRUD USERS

Aplicación móvil construida con **React Native + Expo**.

---

## 🚀 Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada LTS 18+ o 20+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (opcional, puedes usar `npx`)
- [Git](https://git-scm.com/)
- Un emulador Android/iOS o la app **Expo Go** en tu celular

---

## ⚙️ Instalación del proyecto

Clona el repositorio:

```bash
git clone <url-del-repo>
cd Finazauto
```

Instala las dependencias:

```bash
npm install
```

---

## 🔐 Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto con este contenido:

```env
API_URL=https://dummyapi.io/data/v1
API_KEY= "tu clave"
```

---

## 🧪 Verificar configuración del entorno

Puedes verificar que todo esté correctamente configurado con:

```bash
npx expo-doctor
```

---

## ▶️ Ejecutar el proyecto

Inicia el proyecto con:

```bash
npx expo start
```

Esto abrirá Metro Bundler. Desde ahí puedes:

- Escanear el código QR con la app **Expo Go** en tu celular
- Presionar `i` para abrir en un emulador iOS
- Presionar `a` para abrir en un emulador Android

---

## 📦 Generar APK (Build de producción)

Si necesitas generar un APK para Android con EAS Build:

```bash
eas build -p android --profile production
```

> Requiere tener configurado [EAS CLI](https://docs.expo.dev/eas/).
