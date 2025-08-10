import { useEffect, useState } from 'react';
import { useAccessibility, useSpeech } from '../hooks/useAccessibility';
import { FaTimes, FaUniversalAccess } from 'react-icons/fa';
import { useHotkeys } from 'react-hotkeys-hook';

const AccessibilityWidget = () => {
    const { settings, setSettings, panelOpen, setPanelOpen } = useAccessibility();
    const { speakText, supported, stopSpeaking, speaking } = useSpeech();
    const [readMode, setReadMode] = useState('selection');

    // Guardar el modo de lectura en settings
    useEffect(() => {
        setSettings(prev => ({ ...prev, readMode }));
    }, [readMode, setSettings]);

    // Lectura por selección de texto
    useEffect(() => {
        if (!settings.speechEnabled || readMode !== 'selection') return;

        const handleSelection = () => {
            const selection = window.getSelection();
            const text = selection.toString().trim();
            
            if (text) {
                speakText(text);
            }
        };

        let selectionTimeout;
        const handleMouseUp = () => {
            clearTimeout(selectionTimeout);
            selectionTimeout = setTimeout(handleSelection, 300);
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
            clearTimeout(selectionTimeout);
        };
    }, [settings.speechEnabled, readMode, speakText]);

    // Lectura al hacer foco (Tab)
    useEffect(() => {
        if (!settings.speechEnabled || readMode !== 'focus') return;

        const handleFocus = (e) => {
            const element = e.target;
            
            // Solo leer elementos interactivos
            if (element.matches('button, a, input, textarea, select, [tabindex], h1, h2, h3, h4, h5, h6, p')) {
                const textToRead = 
                    element.getAttribute('aria-label') || 
                    element.getAttribute('title') || 
                    element.innerText || 
                    element.value || 
                    element.placeholder || 
                    '';
                
                if (textToRead) {
                    speakText(textToRead);
                }
            }
        };

        const handleBlur = () => {
            stopSpeaking();
        };

        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);

        return () => {
            document.removeEventListener('focus', handleFocus, true);
            document.removeEventListener('blur', handleBlur, true);
        };
    }, [settings.speechEnabled, readMode, speakText, stopSpeaking]);

    // Lectura al pasar el mouse
    useEffect(() => {
        if (!settings.speechEnabled || readMode !== 'hover') return;

        let hoverTimeout;
        
        const handleMouseEnter = (e) => {
            const element = e.target;
            
            // Solo elementos con texto
            if (element.matches('button, a, h1, h2, h3, h4, h5, h6, p, span, li')) {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    const textToRead = 
                        element.getAttribute('aria-label') || 
                        element.getAttribute('title') || 
                        element.innerText || 
                        '';
                    
                    if (textToRead) {
                        speakText(textToRead);
                    }
                }, 500); // Esperar 500ms antes de leer
            }
        };

        const handleMouseLeave = () => {
            clearTimeout(hoverTimeout);
            stopSpeaking();
        };

        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
            clearTimeout(hoverTimeout);
        };
    }, [settings.speechEnabled, readMode, speakText, stopSpeaking]);

    // Atajos de teclado
    useHotkeys('alt+r', () => {
        if (settings.speechEnabled) {
            const mainContent = document.querySelector('main');
            if (mainContent) {
                const text = mainContent.innerText;
                speakText(text);
            }
        }
    });

    useHotkeys('alt+s', () => {
        stopSpeaking();
    });

    // Prueba al abrir el panel
    useEffect(() => {
        if (panelOpen && settings.speechEnabled) {
            speakText('Panel de accesibilidad abierto');
        }
    }, [panelOpen]);

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setPanelOpen(true)}
                className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-50"
                aria-label="Abrir accesibilidad (Alt+A)"
            >
                <FaUniversalAccess size={20} className="mx-auto" />
            </button>

            {/* Panel */}
            {panelOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 max-w-sm mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-[#00add5]">Accesibilidad</h2>
                            <button 
                                onClick={() => setPanelOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        {/* Tamaño de texto */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tamaño texto: {settings.fontSize}%
                            </label>
                            <input
                                type="range"
                                min="80"
                                max="150"
                                value={settings.fontSize}
                                onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
                                className="w-full"
                            />
                        </div>

                        {/* Alto contraste */}
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.highContrast}
                                    onChange={(e) => setSettings({...settings, highContrast: e.target.checked})}
                                    className="mr-2"
                                />
                                Alto contraste
                            </label>
                        </div>

                        {/* Lectura en voz alta */}
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.speechEnabled}
                                    onChange={(e) => setSettings({...settings, speechEnabled: e.target.checked})}
                                    className="mr-2"
                                />
                                🔊 Lectura en voz alta
                            </label>
                        </div>

                        {/* Modo de lectura */}
                        {settings.speechEnabled && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Modo de lectura:
                                </label>
                                <select
                                    value={readMode}
                                    onChange={(e) => setReadMode(e.target.value)}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="manual">Manual (con botones)</option>
                                    <option value="focus">Al hacer foco (Tab)</option>
                                    <option value="hover">Al pasar el mouse</option>
                                    <option value="selection">Al seleccionar texto</option>
                                </select>
                            </div>
                        )}

                        <div className="text-xs text-gray-500">
                            <div>Atajos:</div>
                            <div>Alt+A: Abrir panel</div>
                            <div>Alt+R: Leer página</div>
                            <div>Alt+S: Detener lectura</div>
                            <div>Esc: Cerrar panel</div>
                        </div>

                        {/* Mensaje de debug */}
                        {!supported && (
                            <div className="mt-2 text-xs text-red-600">
                                ⚠️ Tu navegador no soporta síntesis de voz
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AccessibilityWidget;