import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import image from "./assets/llama.png";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Share your favorite suculent!</Text>
      <Image
        // source={image} //Si la tenemos en la carpeta assets
        source={{
          uri:
            selectedImage !== null
              ? selectedImage.localUri
              : "https://picsum.photos/200/200",
        }}
        style={styles.image}
      />
      {/* Este es un boton pre-preparado sino tenemos TouchableOpacity*/}
      {/* <Button
       color='#FFB5B5'
       title='Apretar'
       onPress={() => Alert.alert('Holi')}/> */}
      <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
        <Text style={styles.buttonText}>Apretar</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

//Ahora ya no tenemos module.css por eso usamos este StyleSheet
//que nos importamos desde react native, nos permite agrupar multiples estilos dentro del codigo
//ES como un archivo css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECDBBA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#2D4263",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#1E5128",
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#D8E9A8",
    fontSize: 15,
  },
});
