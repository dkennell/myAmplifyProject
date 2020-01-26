import Amplify, { Storage } from 'aws-amplify';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import awsconfig from './aws-exports';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Main from './containers/Main';
Amplify.configure(awsconfig);

export default function App() {
  return (
    <Main/>
  )
}
