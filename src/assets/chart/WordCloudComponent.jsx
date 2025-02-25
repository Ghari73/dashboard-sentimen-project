// src/chart/WordCloudComponent.jsx
import React from 'react';
import { WordCloud } from 'react-wordcloud';

const WordCloudComponent = ({ data }) => {
  // Konfigurasi word cloud
  const options = {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'], // Warna acak
    fontFamily: 'Impact', // Font teks
    fontSize: (word) => Math.sqrt(word.value) * 2 + 10, // Ukuran font berdasarkan nilai
    rotateRatio: 0.5, // Peluang rotasi kata (0-1)
    spiral: 'archimedean', // Pola penyusunan
    padding: 1, // Padding antar kata
  };

  return (
    <div className="h-full w-full">
      <WordCloud
        words={data}
        options={options}
        canvasWidth="100%"
        canvasHeight="100%"
      />
    </div>
  );
};

export default WordCloudComponent;