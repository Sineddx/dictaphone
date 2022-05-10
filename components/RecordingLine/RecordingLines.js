import { Text, View, Alert, StyleSheet} from "react-native";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js'
import {pl, en, es} from '../../languages'
import {Button} from 'react-native-paper'
import {deleteAlert} from './helpers/helpers'
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from 'react'
import { Audio } from "expo-av";



i18n.fallbacks = true;
i18n.translations = {pl, en, es}
i18n.locale = Localization.locale;



function RecordingLines(props) {
  const [sound, setSound] = useState();

  async function playRecord(uri) {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const { sound } = await Audio.Sound.createAsync({
        uri: uri,
      });
      setSound(sound);
      await sound.replayAsync();
    } catch (e) {}
  }

  async function deleteRecord(uri) {
    try {
      const recordingsJSON = await AsyncStorage.getItem("recordings1");
      let recordingsArr = JSON.parse(recordingsJSON);
      const filtered = recordingsArr.filter(function (e) {
        return e.uri !== uri;
      });
      AsyncStorage.setItem("recordings1", JSON.stringify(filtered));
      props.setRecordings(filtered);
      FileSystem.deleteAsync(uri);
    } catch (err) {
      console.log(err);
    }
  }


  
  return   props.recordings.map((recordingLine, index) => {
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.fill}>{recordingLine.date}</Text>
        <Button
          mode="outlined"
          icon={require('../../assets/play.png')}
          onPress={() => playRecord(recordingLine.uri)}
        >
          {i18n.t('playButton')}
        </Button>
        <Button
        mode="outlined"
        icon={require("../../assets/recycle-bin.png")}
        onPress={() => deleteAlert(recordingLine.uri, deleteRecord)}>
        </Button>
      </View>
    );
    
  })
}

export default RecordingLines;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
})