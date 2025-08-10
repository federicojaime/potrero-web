import { useEffect } from 'react';
import { useSpeech, useAccessibility } from './useAccessibility';

export const useTextSelection = () => {
  const { speakText } = useSpeech();
  const { settings } = useAccessibility();

  useEffect(() => {
    const handleSelection = () => {
      if (!settings.speechEnabled) return;
      
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text) {
        speakText(text);
      }
    };

    // Detectar cuando el usuario termina de seleccionar
    let selectionTimeout;
    const handleMouseUp = () => {
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(handleSelection, 500);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      clearTimeout(selectionTimeout);
    };
  }, [settings.speechEnabled, speakText]);
};