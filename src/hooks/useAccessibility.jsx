// src/hooks/useAccessibility.jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useHotkeys } from 'react-hotkeys-hook';

// Exportar el contexto
export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 100,
    highContrast: false,
    speechEnabled: false,  // CAMBIAR A FALSE
    readMode: 'selection' // Agregar esto
  });
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
  }, [settings]);

  useHotkeys('alt+a', () => setPanelOpen(true));
  useHotkeys('escape', () => setPanelOpen(false));

  const value = {
    settings,
    setSettings,
    panelOpen,
    setPanelOpen
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const useSpeech = () => {
  const { settings } = useAccessibility();
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

  const speakText = (text) => {
    // Verificar si está soportado y habilitado
    if (!supported) {
      console.warn('La síntesis de voz no está soportada en este navegador');
      return;
    }

    if (settings.speechEnabled && text) {
      // Cancelar cualquier habla anterior
      cancel();
      
      // Configurar voz en español
      const spanishVoice = voices.find(voice => 
        voice.lang.includes('es') || voice.lang.includes('ES')
      );
      
      speak({ 
        text, 
        rate: 0.8,
        pitch: 1,
        volume: 1,
        voice: spanishVoice || voices[0]
      });
    }
  };

  return { 
    speakText, 
    speaking, 
    stopSpeaking: cancel,
    supported
  };
};

export const useSpeechOnHover = () => {
  const { settings } = useAccessibility();
  const { speakText, stopSpeaking } = useSpeech();
  
  const handleMouseEnter = (text) => {
    if (settings.speechEnabled) {
      speakText(text);
    }
  };
  
  const handleMouseLeave = () => {
    stopSpeaking();
  };
  
  return { handleMouseEnter, handleMouseLeave };
};

export const useSpeechOnFocus = () => {
  const { settings } = useAccessibility();
  const { speakText, stopSpeaking } = useSpeech();
  
  const speakOnFocus = (element) => {
    if (!settings.speechEnabled) return;
    
    // Prioridad de lectura
    const textToRead = 
      element.getAttribute('aria-label') || 
      element.getAttribute('title') || 
      element.innerText || 
      element.value || 
      '';
    
    if (textToRead) {
      speakText(textToRead);
    }
  };
  
  return { speakOnFocus, stopSpeaking };
};