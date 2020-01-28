import React from 'react';
import Amplify, { Storage } from 'aws-amplify';
import { Audio } from 'expo-av';
import awsconfig from '../aws-exports';
import { StyleSheet, Text, View } from 'react-native';

Amplify.configure(awsconfig);

const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
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
  Audio.setAudioModeAsync({allowsRecordingIOS: true, playsInSilentModeIOS: true})

  let myRecordingObject = new Audio.Recording();

  try {
    await myRecordingObject.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await myRecordingObject.startAsync();
    this.setState({myRecordingInstance: myRecordingObject})
    alert("You're recording! :D")
  } catch (error) {
    alert("There was an error. Sorry, I promise I tried. :'(")
    console.log('Error: ', error)
  }
}

async function stopRecording() {
  let myRecording = this.state['myRecordingInstance']
  await myRecording.stopAndUnloadAsync();

  let recordingURI = myRecording.getURI()
  const response = await fetch(recordingURI);
  const blob = await response.blob();

  Storage.put('my_audio_file.caf', blob)
    .then (result => {console.log(result)
      alert('Recording succesfully uploaded!')
    })
    .catch(err => {console.log(err)
      alert('Recording upload failed. :(')
    });
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
