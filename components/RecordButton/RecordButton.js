import {Button} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react';
import moment from 'moment'

export default function RecordButton(props){
    const [recording, setRecording] = useState();

    async function startRecording() {
        try {
          const permission = await Audio.requestPermissionsAsync();
          if (permission.status === "granted") {
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            const { recording } = await Audio.Recording.createAsync(
              Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
          } else {
            setMessage("Proszę dać moźliwość korzystania z mikrofonu");
          }
        } catch (err) {
          console.error("Coś poszło nie tak", err);
        }
      }
    
      async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        let date = moment().utcOffset('+02:00').format('YYYY-M-D HH:mm')
        const toStore = [
          {
            uri: uri,
            date: date
          },
        ];
        return storeData(toStore);
      }
    
      const storeData = async (value) => {
        try {
          const tempData = [...props.recordings];
          tempData.push(...value);
          const jsonValue = JSON.stringify(tempData);
          await AsyncStorage.setItem("recordings1", jsonValue);
          props.setRecordings(tempData)
        } catch (e) {
          console.log("problem");
        }
      };

    return(
        <Button
          style={styles.button}
          icon = {recording ? require('../../assets/stop.png') : require('../../assets/play.png')}
          mode="contained"
          onPress={recording ? stopRecording : startRecording}
        >
          {recording ? "STOP " : "START"}
        </Button>
    )
}

const styles = StyleSheet.create({
    button : {
              height: 65,
              width: 150,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 80,
              position: "absolute"
    }
})