// src/utils/randomUtils.js

/**
 * Función para mezclar un array usando el algoritmo Fisher-Yates (Knuth Shuffle)
 * Esta función devuelve una nueva copia del array mezclado
 * 
 * @param {Array} array - El array a mezclar
 * @returns {Array} - Una copia mezclada del array original
 */
export const shuffleArray = (array) => {
    // Creamos una copia del array original para no modificarlo
    const shuffledArray = [...array];
    
    // Algoritmo Fisher-Yates para mezclar elementos
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Generar un índice aleatorio entre 0 e i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
      // Intercambiar elementos
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
  };
  
  /**
   * Función para obtener una versión aleatorizada de un array al cargar
   * Usa localStorage para mantener el orden durante la sesión del usuario
   * 
   * @param {Array} array - El array a mezclar
   * @param {string} storageKey - Clave para almacenar el orden en localStorage
   * @returns {Array} - El array mezclado o recuperado de localStorage
   */
  export const getRandomizedArray = (array, storageKey) => {
    // Si el array está vacío, devolver un array vacío
    if (!array || array.length === 0) return [];
    
    // Intentar obtener el orden almacenado en localStorage
    const storedOrder = localStorage.getItem(storageKey);
    
    if (storedOrder) {
      try {
        // Recuperar los índices guardados
        const indices = JSON.parse(storedOrder);
        
        // Verificar si el tamaño del array ha cambiado
        if (indices.length === array.length) {
          // Reconstruir el array usando los índices guardados
          return indices.map(index => array[index]);
        }
      } catch (error) {
        console.error("Error al analizar el orden guardado:", error);
      }
    }
    
    // Si no hay un orden guardado o hay un error, mezclar el array
    const shuffledArray = shuffleArray(array);
    
    // Guardar los nuevos índices en localStorage
    const newIndices = shuffledArray.map(item => array.indexOf(item));
    localStorage.setItem(storageKey, JSON.stringify(newIndices));
    
    return shuffledArray;
  };
  
  /**
   * Función para obtener un elemento aleatorio de un array
   * 
   * @param {Array} array - El array del que seleccionar
   * @returns {*} - Un elemento aleatorio del array
   */
  export const getRandomItem = (array) => {
    if (!array || array.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  
  /**
   * Función para obtener múltiples elementos aleatorios sin repetir
   * 
   * @param {Array} array - El array del que seleccionar
   * @param {number} count - Cantidad de elementos a seleccionar
   * @returns {Array} - Un array con los elementos seleccionados
   */
  export const getRandomItems = (array, count) => {
    if (!array || array.length === 0) return [];
    if (count >= array.length) return shuffleArray(array);
    
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
  };
  
  /**
   * Función para verificar si es momento de volver a mezclar los datos
   * 
   * @param {string} storageKey - Clave para almacenar el tiempo en localStorage
   * @param {number} intervalMinutes - Minutos entre mezclas (por defecto: 60 minutos)
   * @returns {boolean} - True si es momento de mezclar, false si no
   */
  export const shouldReshuffle = (storageKey, intervalMinutes = 60) => {
    const lastShuffleTime = localStorage.getItem(`${storageKey}_timestamp`);
    const now = new Date().getTime();
    
    if (!lastShuffleTime) {
      localStorage.setItem(`${storageKey}_timestamp`, now);
      return true;
    }
    
    // Verificar si ha pasado el tiempo suficiente
    const elapsedMinutes = (now - parseInt(lastShuffleTime)) / (1000 * 60);
    
    if (elapsedMinutes >= intervalMinutes) {
      localStorage.setItem(`${storageKey}_timestamp`, now);
      return true;
    }
    
    return false;
  };
  
  /**
   * Función para obtener un orden aleatorio diferente cada día
   * Útil para mantener consistencia durante un día pero cambiar diariamente
   * 
   * @param {Array} array - El array a mezclar
   * @param {string} storageKey - Clave para almacenar el orden en localStorage
   * @returns {Array} - El array mezclado según el día
   */
  export const getDailyRandomizedArray = (array, storageKey) => {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    const dailyKey = `${storageKey}_${today}`;
    
    // Verificar si ya tenemos un orden para hoy
    const storedOrder = localStorage.getItem(dailyKey);
    
    if (storedOrder) {
      try {
        const indices = JSON.parse(storedOrder);
        if (indices.length === array.length) {
          return indices.map(index => array[index]);
        }
      } catch (error) {
        console.error("Error al analizar el orden diario guardado:", error);
      }
    }
    
    // Si no hay un orden para hoy, generar uno nuevo
    const shuffledArray = shuffleArray(array);
    
    // Guardar los nuevos índices en localStorage con la clave del día
    const newIndices = shuffledArray.map(item => array.indexOf(item));
    localStorage.setItem(dailyKey, JSON.stringify(newIndices));
    
    // Limpiar órdenes antiguos (opcional)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(storageKey) && key !== dailyKey) {
        localStorage.removeItem(key);
      }
    }
    
    return shuffledArray;
  };