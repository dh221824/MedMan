import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MedicationFormProps {
  medication?: Medication;
  onSave: (medication: Medication) => void;
  onClose: () => void;
}

export interface Medication {
  id: string;
  name: string;
  timeOfDay: string;
  dosage: string;
  frequency: string;
  amount: string;
  intakeInfo: string; // New field for "Einnahmehinweise"
  checked: boolean;
  timestamp?: string;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ medication, onSave, onClose }) => {
  const [medicationName, setMedicationName] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('morgens');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('1x');
  const [amount, setAmount] = useState('Viertel');
  const [intakeInfo, setIntakeInfo] = useState(''); // State for "Einnahmehinweise"

  useEffect(() => {
    if (medication) {
      setMedicationName(medication.name);
      setTimeOfDay(medication.timeOfDay);
      setDosage(medication.dosage);
      setFrequency(medication.frequency);
      setAmount(medication.amount);
      setIntakeInfo(medication.intakeInfo);
    }
  }, [medication]);

  const handleSave = () => {
    if (medicationName.trim() === '' || dosage.trim() === '') return;
    const newMedication: Medication = {
      id: medication ? medication.id : Math.random().toString(),
      name: medicationName,
      timeOfDay,
      dosage,
      frequency,
      amount,
      intakeInfo, // Save the intake information
      checked: medication ? medication.checked : false,
    };
    onSave(newMedication);
    setMedicationName('');
    setTimeOfDay('morgens');
    setDosage('');
    setFrequency('1x');
    setAmount('Viertel');
    setIntakeInfo('');
    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter medication"
        style={styles.input}
        value={medicationName}
        onChangeText={setMedicationName}
      />
      <TextInput
        placeholder="Enter dosage"
        style={styles.input}
        value={dosage}
        onChangeText={setDosage}
      />
      <TextInput
        placeholder="Einnahmehinweise"
        style={styles.input}
        value={intakeInfo}
        onChangeText={setIntakeInfo}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={timeOfDay}
          style={styles.picker}
          onValueChange={(itemValue) => setTimeOfDay(itemValue)}
        >
          <Picker.Item label="morgens" value="morgens" />
          <Picker.Item label="mittags" value="mittags" />
          <Picker.Item label="abends" value="abends" />
        </Picker>
        <Picker
          selectedValue={frequency}
          style={styles.picker}
          onValueChange={(itemValue) => setFrequency(itemValue)}
        >
          <Picker.Item label="1x" value="1x" />
          <Picker.Item label="2x" value="2x" />
          <Picker.Item label="3x" value="3x" />
          <Picker.Item label="4x" value="4x" />
        </Picker>
        <Picker
          selectedValue={amount}
          style={styles.picker}
          onValueChange={(itemValue) => setAmount(itemValue)}
        >
          <Picker.Item label="Viertel" value="Viertel" />
          <Picker.Item label="Halbe" value="Halbe" />
          <Picker.Item label="Ganze" value="Ganze" />
        </Picker>
      </View>
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={onClose} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 40,
  },
});

export default MedicationForm;
