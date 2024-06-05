import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from './screens/NavigationBar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Management</Text>
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch', // Allow children to fill the width
    justifyContent: 'space-between', // Align children to both ends
  },
  title: {
    marginTop: 50, // Give some top margin
    textAlign: 'center', // Center-align the text
    fontSize: 22,
    fontWeight: 'bold',
  }
});
