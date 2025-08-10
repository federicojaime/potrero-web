import { useSpeech } from '../hooks/useAccessibility';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const SpeechButton = ({ text, className = "" }) => {
  const { speakText, speaking, stopSpeaking } = useSpeech();

  const handleClick = (e) => {
    e.stopPropagation();
    if (speaking) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  if (!text) return null;

  return (
    <button
      onClick={handleClick}
      className={`p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all ${className}`}
      aria-label={speaking ? "Detener lectura" : "Leer en voz alta"}
    >
      {speaking ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
    </button>
  );
};

export default SpeechButton;