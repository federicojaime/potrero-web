import { useSpeech } from '../hooks/useAccessibility';
import { FaVolumeUp, FaStop } from 'react-icons/fa';

const ReadPageButton = () => {
  const { speakText, speaking, stopSpeaking } = useSpeech();

  const handleClick = () => {
    if (speaking) {
      stopSpeaking();
    } else {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        const text = mainContent.innerText;
        speakText(text);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 z-40"
      aria-label={speaking ? "Detener lectura" : "Leer página"}
    >
      {speaking ? <FaStop size={20} className="mx-auto" /> : <FaVolumeUp size={20} className="mx-auto" />}
    </button>
  );
};

export default ReadPageButton;