import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MedicationForm, { Medication } from './MedicationForm';
import SetNotification from './SetNotification';

const MedicationList: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState(false);
  const [isIntakeInfoVisible, setIsIntakeInfoVisible] = useState(false);
  const [selectedIntakeInfo, setSelectedIntakeInfo] = useState<string | null>(null);
  const [notificationTime, setNotificationTime] = useState<string>('Zum Ereigniszeitpunkt');

  const handleSave = (medication: Medication) => {
    setMedications(currentMedications => [...currentMedications, medication]);
    setIsModalVisible(false);
  };

  const handleNotificationSave = (notificationTime: string) => {
    setNotificationTime(notificationTime);
    setIsNotificationModalVisible(false);
  };

  const toggleCheck = (id: string) => {
    const currentTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMedications(currentMedications =>
      currentMedications.map(med =>
        med.id === id
          ? { ...med, checked: !med.checked, timestamp: !med.checked ? currentTimestamp : undefined }
          : med
      )
    );
  };

  const openNotificationModal = () => {
    setIsNotificationModalVisible(true);
  };

  const openIntakeInfoModal = (intakeInfo: string) => {
    setSelectedIntakeInfo(intakeInfo);
    setIsIntakeInfoVisible(true);
  };

  const closeIntakeInfoModal = () => {
    setIsIntakeInfoVisible(false);
    setSelectedIntakeInfo(null);
  };

  return (
    <View style={styles.container}>
      <Button title="Medikation hinzufügen" onPress={() => setIsModalVisible(true)} />
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.medicationInfo}>
              <View style={styles.nameDosageContainer}>
                <Text style={{ textDecorationLine: item.checked ? 'line-through' : 'none' }}>
                  {item.name}
                </Text>
                <Text style={styles.dosageText}>{item.dosage}</Text>
                <TouchableOpacity onPress={() => openIntakeInfoModal(item.intakeInfo)}>
                  <Text style={styles.infoSymbol}>ℹ️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.medicationDetails}>
                {`${item.frequency} ${item.amount} ${item.timeOfDay}`}
              </Text>
            </View>
            <View style={styles.checkContainer}>
              {item.timestamp && <Text style={styles.timestamp}>{item.timestamp}</Text>}
              <TouchableOpacity onPress={() => toggleCheck(item.id)}>
                <View style={[styles.circle, item.checked && styles.checkedCircle]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={openNotificationModal}>
                <Text style={styles.flag}>🚩</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <MedicationForm
          onSave={handleSave}
          onClose={() => setIsModalVisible(false)}
        />
      </Modal>
      <SetNotification
        visible={isNotificationModalVisible}
        onClose={() => setIsNotificationModalVisible(false)}
        onSave={handleNotificationSave}
        initialTime={notificationTime}
      />
      <Modal visible={isIntakeInfoVisible} animationType="slide" transparent>
        <View style={styles.intakeInfoModal}>
          <Text style={styles.intakeInfoText}>{selectedIntakeInfo}</Text>
          <Button title="Close" onPress={closeIntakeInfoModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  medicationInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameDosageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dosageText: {
    marginLeft: 10,
    color: 'gray',
  },
  medicationDetails: {
    marginTop: 5,
    color: 'gray',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10, // Adjust to move checkmark to the left
  },
  checkedCircle: {
    backgroundColor: 'blue',
  },
  timestamp: {
    marginRight: 10,
    color: 'green',
  },
  flag: {
    marginLeft: 10,
    fontSize: 20,
    color: 'red',
  },
  infoSymbol: {
    marginLeft: 10,
    fontSize: 20,
    color: 'blue',
  },
  intakeInfoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  intakeInfoText: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default MedicationList;
