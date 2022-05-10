import {Alert} from 'react-native'
export function deleteAlert (uri, callback) {
    Alert.alert(
      "Usuwanie",
      "Czy na pewno chcesz usunąć nagranie?",
      [
        {
          text: "Anuluj",
          style: "cancel"
        },
        {
          text: "Usuń", onPress: () => callback(uri)
        }
      ]
    )
  }