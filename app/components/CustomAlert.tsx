import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({visible, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Oops!</Text>
          <Text style={styles.message}>Pick your avatar and nickname.</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.cream,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.red,
  },
  message: {
    fontSize: typography.lg,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.red,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: typography.lg,
    textAlign: 'center',
  },
});
