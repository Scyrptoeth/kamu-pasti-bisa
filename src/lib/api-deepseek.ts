export async function gradeEssay(question: string, idealAnswer: string, studentAnswer: string) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not defined");
  }

  const prompt = `
    Anda adalah guru Ekonomi berpengalaman. 
    Nilailah jawaban siswa berikut berdasarkan Pertanyaan dan Jawaban Ideal yang diberikan.
    
    Pertanyaan: ${question}
    Jawaban Ideal: ${idealAnswer}
    Jawaban Siswa: ${studentAnswer}
    
    Berikan skor bulat antara 0 hingga 10. 
    Berikan output dalam format JSON: { "score": number, "explanation": string }
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
