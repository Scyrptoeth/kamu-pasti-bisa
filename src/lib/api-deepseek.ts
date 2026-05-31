export async function gradeEssay(question: string, idealAnswer: string, studentAnswer: string) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not defined");
  }

  const prompt = `
    Kamu adalah Sistem Evaluasi Akademik otomatis untuk mata pelajaran Ekonomi.
    Tugas kamu adalah memberikan penilaian teknis dan objektif terhadap jawaban esai siswa.
    
    Kriteria Penilaian:
    1. Kesesuaian dengan Jawaban Ideal.
    2. Ketajaman argumen ekonomi.
    3. Ketepatan terminologi yang digunakan.
    
    Pertanyaan: ${question}
    Jawaban Ideal: ${idealAnswer}
    Jawaban Siswa: ${studentAnswer}
    
    Output WAJIB JSON: { "score": number (skala 0-10), "explanation": string (Catatan Evaluasi teknis max 3 kalimat) }
  `;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Error grading essay:", error);
    return { score: 0, explanation: "Gagal menilai jawaban otomatis." };
  }
}
