import { Alert, Platform } from 'react-native';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export function showAlert(title: string, message: string, buttons?: AlertButton[]) {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons);
    return;
  }

  // Web fallback
  if (!buttons || buttons.length === 0) {
    window.alert(`${title}\n${message}`);
    return;
  }

  const cancelBtn = buttons.find(b => b.style === 'cancel');
  const actionBtns = buttons.filter(b => b.style !== 'cancel');

  if (actionBtns.length === 1) {
    const ok = window.confirm(`${title}\n${message}`);
    if (ok) {
      actionBtns[0].onPress?.();
    } else {
      cancelBtn?.onPress?.();
    }
    return;
  }

  // Multiple action buttons: use sequential confirms
  for (const btn of actionBtns) {
    const ok = window.confirm(`${title}\n${message}\n\nChoose: ${btn.text}?`);
    if (ok) {
      btn.onPress?.();
      return;
    }
  }
  cancelBtn?.onPress?.();
}
