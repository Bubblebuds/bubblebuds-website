import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'settings'), (snapshot) => {
      const newSettings: Record<string, string> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        newSettings[data.key] = data.value;
      });
      setSettings(newSettings);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'settings'));

    return () => unsub();
  }, []);

  const getSetting = (key: string, defaultValue: string) => {
    return settings[key] !== undefined ? settings[key] : defaultValue;
  };

  return { settings, getSetting, loading };
}
