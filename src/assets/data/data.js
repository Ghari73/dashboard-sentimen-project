const data = [
    { id: "RV123456", comment: "Aplikasi ini sangat membantu dan mudah digunakan", rating: 5, date: "2025-02-25", relevance: 12, sentiment: "positive", appVersion: "1.4.2" },
    { id: "RV234567", comment: "Fitur bagus tapi kadang agak lambat", rating: 4, date: "2025-02-24", relevance: 8, sentiment: "positive", appVersion: "1.4.2" },
    { id: "RV345678", comment: "Perlu peningkatan di analisis sentimen", rating: 3, date: "2025-02-23", relevance: 5, sentiment: "negative", appVersion: "1.4.1" },
    { id: "RV456789", comment: "Respon cepat dan akurat sesuai ekspektasi", rating: 5, date: "2025-02-22", relevance: 20, sentiment: "positive", appVersion: "1.4.3" },
    { id: "RV567890", comment: "Sering error saat submit ulasan tolong segera diperbaiki", rating: 2, date: "2025-02-21", relevance: 3, sentiment: "negative", appVersion: "1.4.1" },
    { id: "RV678901", comment: "UI UX nyaman tapi masih ada bug kecil", rating: 4, date: "2025-02-20", relevance: 10, sentiment: "positive", appVersion: "1.4.3" },
    { id: "RV789012", comment: "Aplikasi sering crash di versi terbaru sangat mengganggu", rating: 1, date: "2025-02-19", relevance: 2, sentiment: "negative", appVersion: "1.4.0" },
    { id: "RV890123", comment: "Cepat akurat dan sangat membantu", rating: 5, date: "2025-02-18", relevance: 15, sentiment: "positive", appVersion: "1.4.3" },
    { id: "RV901234", comment: "Butuh fitur filter agar lebih mudah digunakan", rating: 3, date: "2025-02-17", relevance: 6, sentiment: "negative", appVersion: "1.4.2" },
    { id: "RV012345", comment: "Kinerja bagus tapi bisa lebih optimal", rating: 4, date: "2025-02-16", relevance: "-", sentiment: "positive", appVersion: "1.4.3" },
    ...Array.from({ length: 40 }, (_, i) => ({
      id: `RV${100000 + i}`,
      comment: `Review tambahan ke-${i + 1}`,
      rating: Math.floor(Math.random() * 5) + 1,
      date: `2025-02-${15 - (i % 15)}`,
      relevance: Math.random() > 0.2 ? Math.floor(Math.random() * 20) + 1 : "-",
      sentiment: ["positive", "negative"][Math.floor(Math.random() * 2)],
      appVersion: `1.4.${Math.floor(Math.random() * 4)}`
    }))
  ];
  
  export default data;
  