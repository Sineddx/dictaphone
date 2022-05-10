import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import RecordingLines from "../RecordingLine/RecordingLines";
import {Headline} from 'react-native-paper'
import { useEffect } from "react";
import Button from '../RecordButton/RecordButton';
import LoadingScreen  from'../LoadingScreen/LoadingScreen';


function AudioRecorder (props) {

  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      jsonValue = await AsyncStorage.getItem("recordings1");
      const temp = JSON.parse(jsonValue);
      return setRecordings([...temp]);
    } catch (err) {
      console.log("problemik", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
        setLoading(false)
  }
  fetchData()
        .catch(console.error)
  },[])

    return loading ? <LoadingScreen/> : (
      
        <View style={styles.container}>
      {recordings && recordings.length > 0 
      ? <RecordingLines
          recordings={recordings}
          setRecordings={setRecordings}/> 
      : <Headline>Brak nagrań</Headline> }
        <Button
          recordings={recordings}
          setRecordings={setRecordings}>
        </Button>
        <StatusBar style="auto" />
      </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      marginTop: 50,
    },
    linearGradient: {
      flex: 1
    }
  });
  
export default AudioRecorder;