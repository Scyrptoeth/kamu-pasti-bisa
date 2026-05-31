import { NextResponse } from "next/server";
import { saveFeedback, getAllFeedbacks } from "@/lib/server/feedback";
import { isRedisConfigured } from "@/lib/server/redis";

export async function POST(request: Request) {
  // Biarkan request masuk meskipun Redis belum siap (kita akan handle di dalam)
  try {
    const { message } = await request.json();
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Pesan wajib diisi" }, { status: 400 });
    }

    if (!isRedisConfigured()) {
      return NextResponse.json({ 
        error: "Database Belum Siap", 
        debug: "Feedback diterima namun gagal disimpan karena kredensial Redis belum disetel di Vercel." 
      }, { status: 503 });
    }

    const entry = await saveFeedback(message);
    return NextResponse.json({ ok: true, entry });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  
  // Ambil token admin dari environment variable
  const adminToken = (process.env.ADMIN_TOKEN || "").trim();

  // VALIDASI TOKEN: Kita lakukan SEBELUM cek Redis agar login bisa berhasil
  if (!adminToken || token !== adminToken) {
    return NextResponse.json({ 
      error: "Unauthorized",
      status: "INVALID_TOKEN"
    }, { status: 401 });
  }

  // Jika token valid, baru kita cek Redis untuk mengambil data
  if (!isRedisConfigured()) {
    return NextResponse.json({ 
      feedbacks: [], 
      warning: "Login Berhasil (Token Valid), namun database belum terhubung.",
      status: "DB_NOT_CONFIGURED"
    }, { status: 200 }); // Tetap kembalikan 200 karena otentikasi sukses
  }

  try {
    const feedbacks = await getAllFeedbacks();
    return NextResponse.json({ feedbacks, status: "SUCCESS" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data", status: "DB_ERROR" }, { status: 500 });
  }
}
