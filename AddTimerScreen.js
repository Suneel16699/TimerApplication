import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TimerContext from './TimerContext';

const AddTimerScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');
  const [customCategory , setCustomCategory] = useState("");
  const { dispatch } = useContext(TimerContext);

  const addTimer = () => {
    const newTimer = { id: Date.now(), name, duration: parseInt(duration), category: (category === "Others" ? customCategory : category) , remaining: parseInt(duration), status: 'Not Started' };
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Duration (seconds)</Text>
      <TextInput style={styles.input} value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Break" value="Break" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>
      {(category === "Others") && <TextInput placeholder='Please enter the category' style={styles.input} value={customCategory} onChangeText={setCustomCategory} />}
      <Button title="Add Timer" onPress={addTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginVertical: 10,
  },
  picker: {
    width: '100%',
  },
});

export default AddTimerScreen;
