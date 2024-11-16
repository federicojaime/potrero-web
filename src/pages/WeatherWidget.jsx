import React, { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <a
      className="weatherwidget-io"
      href="https://forecast7.com/es/33d27n66d24/potrero-de-los-funes/"
      data-label_1="POTRERO DE LOS FUNES"
      data-label_2="Clima"
      data-theme="pure"
    >
      Clima en Potrero de los Funes
    </a>
  );
};

export default WeatherWidget;
