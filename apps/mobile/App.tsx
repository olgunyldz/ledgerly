import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import './src/i18n/config';
import { HomeScreen } from './src/screens/HomeScreen';
import { colors } from './src/theme/tokens';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper
  }
});
