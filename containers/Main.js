import Amplify, { Storage } from 'aws-amplify';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import base64 from 'react-native-base64';
import { Asset } from 'expo-asset';

export const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.caf',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};


class Main extends React.Component {

  constructor() {
    super();
    this.state = { myRecordingInstance: null};
    console.log('asdf');
    startRecording = startRecording.bind(this);
    stopRecording = stopRecording.bind(this);
  }
  // const [currentRecordingInstance, setRecordingInstance] = useState();



  render() {
    return (
      <View style={styles.container}>
        <Text onPress={startRecording}>Touch to start recording</Text>
        <Text>=================</Text>
        <Text>=================</Text>
        <Text>=================</Text>
        <Text>=================</Text>
        <Text>=================</Text>
        <Text onPress={stopRecording}>Touch to end recording</Text>
      </View>
    );
  }
}

async function startRecording() {
  Audio.requestPermissionsAsync();
  alert('You tapped the start record button');
  let myRecordingObject = new Audio.Recording();

  try {
    Audio.setAudioModeAsync({allowsRecordingIOS: true, playsInSilentModeIOS: true})
    await myRecordingObject.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await myRecordingObject.startAsync();
    this.setState({myRecordingInstance: myRecordingObject})
    alert('You did it!')
  } catch (error) {
    alert('Error: ', error)
    console.log('Error: ', error)
  // An error occurred!
  }
}

async function stopRecording() {
  // alert('You tapped the stop record button');
  let myRecording = this.state['myRecordingInstance']
  await myRecording.stopAndUnloadAsync();

  // let mySound = await myRecording.createNewLoadedSoundAsync();
  // mySound['sound'].playAsync();
  //
  // let soundToSend = mySound['sound'];
  //
  // const Buffer = require("buffer").Buffer;
  // var base64data = new Buffer([soundToSend], "binary");

  // console.log("Sound URI: ", soundToSend.getURI())
  // console.log("Sound to send: ", soundToSend)
  // console.log("base64data: ", base64data)

  let recordingURI = myRecording.getURI()
  const response = await fetch(recordingURI);
  const blob = await response.blob();




  console.log("Recording URI: ", recordingURI)

  Storage.put('my_audio_file.caf', blob)
    .then (result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
