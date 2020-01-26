import Amplify, { Storage } from 'aws-amplify';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    await myRecordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
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
  let mySound = await myRecording.createNewLoadedSoundAsync();
  mySound['sound'].playAsync();

  console.log(this.state)
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
