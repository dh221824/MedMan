import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface SetNotificationProps {
  visible: boolean;
  onClose: () => void;
  onSave: (notificationTime: string) => void;
  initialTime: string;
}

const SetNotification: React.FC<SetNotificationProps> = ({ visible, onClose, onSave, initialTime }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [tempSelectedTime, setTempSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTime(initialTime);
    setTempSelectedTime(initialTime);
  }, [initialTime]);

  const handleTimeSelect = (time: string) => {
    setTempSelectedTime(time);
  };

  const handleSave = () => {
    if (tempSelectedTime) {
      setSelectedTime(tempSelectedTime);
      onSave(tempSelectedTime);
    }
  };

  const handleCancel = () => {
    setTempSelectedTime(initialTime);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Benachrichtigungszeit wählen</Text>
        <View style={styles.optionsContainer}>
          {['Zum Ereigniszeitpunkt', '15 Minuten vorher', '30 Minuten vorher'].map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.optionButton,
                tempSelectedTime === time && styles.selectedButton,
              ]}
              onPress={() => handleTimeSelect(time)}
            >
              <Text style={[
                styles.optionText,
                tempSelectedTime === time && styles.selectedButtonText,
              ]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {tempSelectedTime !== selectedTime && (
          <Button title="Ändern" onPress={handleSave} />
        )}
        <Button title="Abbrechen" onPress={handleCancel} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
  },
  optionText: {
    textAlign: 'center',
    color: 'black',
  },
  selectedButtonText: {
    color: 'white',
  },
});

export default SetNotification;
