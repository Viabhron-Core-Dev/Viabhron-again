import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export function useDualMode() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    const isNativeCheck = platform === 'android' || platform === 'ios';
    setIsNative(isNativeCheck);

    if (isNativeCheck) {
      // Configure Status Bar for native Android/iOS
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#5D5FEF' }); // Vaa Header Color

      // Handle Hardware Back Button for Android APK
      const backListener = App.addListener('backButton', () => {
        // Trigger a global back event that VaaClient is already listening to via 'popstate'
        // Since popstate might not trigger automatically on native back, we manually trigger history.back()
        window.history.back();
      });

      return () => {
        backListener.then(l => l.remove());
      };
    }
  }, []);

  const triggerVibration = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Light });
    }
  };

  return { isNative, triggerVibration };
}
