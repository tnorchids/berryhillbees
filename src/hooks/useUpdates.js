import { useEffect, useState } from 'react';
import { updates } from '../data/updates.js';
import {
  getKnoxvilleDay,
  getVisibleUpdates,
  isNewUpdate
} from '../utils/updates.js';

export default function useUpdates() {
  const [today, setToday] = useState(getKnoxvilleDay);
  useEffect(() => {
    const refresh = () => setToday(getKnoxvilleDay());
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener('focus', refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
    };
  }, []);
  const visibleUpdates = getVisibleUpdates(updates, today);
  return {
    updates: visibleUpdates,
    isNew: (update) => isNewUpdate(update, today)
  };
}
