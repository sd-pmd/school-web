'use client';

import { ChangeEvent, useEffect, useState } from 'react';

type ChallengeStatus = 'pending' | 'submitted' | 'graded';
type ContentType = 'text' | 'gambar' | 'video' | 'pdf';
type ChallengeCategory = 'akademik' | 'hatam';

interface ChallengeItem {
  id: string;
  judul: string;
  guru: string;
  deskripsi: string;
  deadline: string;
  contentType: ContentType;
  category: ChallengeCategory;
  attachmentName?: string;
  attachmentData?: string;
}

interface MuridSubmission {
  challengeId: string;
  status: ChallengeStatus;
  attachmentName?: string;
  attachmentData?: string;
  contentType?: ContentType;
  submittedAt?: string;
  nilai?: number;
  feedback?: string;
}

const GURU_STORAGE_KEY = 'school_web_guru_tantangan';
const STUDENT_STORAGE_KEY = 'school_web_murid_submissions';

const defaultChallenges: ChallengeItem[] = [];

const defaultHatamChallenges: ChallengeItem[] = [];

const allDefaultChallenges = [...defaultChallenges, ...defaultHatamChallenges];

export default function MuridDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [challenges, setChallenges] = useState<ChallengeItem[]>(allDefaultChallenges);
  const [submissions, setSubmissions] = useState<Record<string, MuridSubmission>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const guruSaved = localStorage.getItem(GURU_STORAGE_KEY);
    if (guruSaved) {
      try {
        const parsed = JSON.parse(guruSaved) as Array<{
          id: string;
          judul: string;
          guru?: string;
          deskripsi: string;
          deadline: string;
          contentType: ContentType;
          category?: ChallengeCategory;
          attachment?: { name?: string };
        }>;

        const mapped = parsed.map((item) => ({
          id: item.id,
          judul: item.judul,
          guru: item.guru ?? 'Guru',
          deskripsi: item.deskripsi,
          deadline: item.deadline,
          contentType: item.contentType,
          category: item.category ?? 'akademik',
          attachmentName: item.attachment?.name,
        }));

        if (mapped.length > 0) {
          setChallenges(mapped.map((item) => ({
            ...item,
            category: item.category ?? 'akademik',
          })));
        }
      } catch {
        // Ignore malformed storage.
      }
    }

    const studentSaved = localStorage.getItem(STUDENT_STORAGE_KEY);
    if (studentSaved) {
      try {
        setSubmissions(JSON.parse(studentSaved));
      } catch {
        // Ignore malformed storage.
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const challengeItems = challenges.map((challenge) => {
    const submission = submissions[challenge.id];
    return {
      ...challenge,
      status: submission?.status ?? 'pending',
      attachmentName: submission?.attachmentName ?? challenge.attachmentName,
      attachmentData: submission?.attachmentData ?? challenge.attachmentData,
      submittedAt: submission?.submittedAt,
      nilai: submission?.nilai,
      feedback: submission?.feedback,
    };
  });

  const academicItems = challengeItems.filter((item) => item.category === 'akademik');
  const hatamItems = challengeItems.filter((item) => item.category === 'hatam');

  const pendingCount = challengeItems.filter((item) => item.status === 'pending').length;
  const submittedCount = challengeItems.filter((item) => item.status === 'submitted').length;
  const gradedCount = challengeItems.filter((item) => item.status === 'graded').length;

  const handleFileChange = (challengeId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFiles((prev) => ({ ...prev, [challengeId]: file }));
  };

  const handleSubmit = async (challengeId: string) => {
    const file = selectedFiles[challengeId];
    const challenge = challengeItems.find((item) => item.id === challengeId);

    if (!file || !challenge) {
      setFeedbackMessage('Pilih file foto, PDF, atau video terlebih dahulu.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const submission: MuridSubmission = {
        challengeId,
        status: 'submitted',
        attachmentName: file.name,
        attachmentData: reader.result as string,
        contentType: file.type.startsWith('image')
          ? 'gambar'
          : file.type.includes('pdf')
            ? 'pdf'
            : file.type.startsWith('video')
              ? 'video'
              : 'text',
        submittedAt: new Date().toLocaleDateString('id-ID'),
      };

      setSubmissions((prev) => ({ ...prev, [challengeId]: submission }));
      setFeedbackMessage(`Tugas berhasil dikirim untuk “${challenge.judul}”.`);
    };

    reader.readAsDataURL(file);
  };

  const getStatusBadge = (status: ChallengeStatus) => {
    if (status === 'submitted') {
      return 'bg-blue-100 text-blue-700';
    }
    if (status === 'graded') {
      return 'bg-green-100 text-green-700';
    }
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-orange-600">Pesantren Masyarakat Digital - Murid</h1>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">👨‍🎓</div>
              <p className="font-semibold text-gray-800">Nama Murid</p>
              <p className="text-sm text-gray-600">Kelas: 1</p>
            </div>
          </div>

          <nav className="p-6 space-y-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'overview' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'chat' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              💬 Chat Kelas
            </button>

            <div className="pt-3 border-t">
              <p className="text-xs font-bold text-gray-500 px-3 py-2 uppercase">Tantangan</p>
              <button
                onClick={() => setActiveTab('tantangan-akademik')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'tantangan-akademik'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📚 Akademik
              </button>
              <button
                onClick={() => setActiveTab('tantangan-hatam')}
                className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                  activeTab === 'tantangan-hatam'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                📖 Hatam (Hafalan)
              </button>
            </div>

            <button
              onClick={() => setActiveTab('project')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'project' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🤝 Project
            </button>
            <button
              onClick={() => setActiveTab('jadwal')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'jadwal' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📅 Jadwal Pelajaran
            </button>
            <button
              onClick={() => setActiveTab('nilai')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'nilai' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              📊 Nilai & Rapor
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'info' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              🏫 Info Sekolah
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left p-3 rounded-lg font-semibold transition ${
                activeTab === 'settings' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              ⚙️ Pengaturan
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            {activeTab === 'overview' && (
              <>
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-2xl mb-8 shadow-lg">
                  <h2 className="text-3xl font-bold mb-2">Halo, Murid! 👋</h2>
                  <p className="text-green-100">Tugas dari guru bisa dikirim langsung lewat halaman ini.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                    <h3 className="text-gray-600 font-semibold mb-2">Belum Dikumpulkan</h3>
                    <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
                    <p className="text-sm text-gray-500">Tugas menunggu dikirim</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-600 font-semibold mb-2">Sudah Dikumpulkan</h3>
                    <p className="text-3xl font-bold text-blue-600">{submittedCount}</p>
                    <p className="text-sm text-gray-500">Tugas sedang menunggu penilaian</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-600 font-semibold mb-2">Sudah Dinilai</h3>
                    <p className="text-3xl font-bold text-green-600">{gradedCount}</p>
                    <p className="text-sm text-gray-500">Nilai sudah keluar</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                    <h3 className="text-gray-600 font-semibold mb-2">Tugas Terbaru</h3>
                    <p className="text-3xl font-bold text-purple-600">{challengeItems.length}</p>
                    <p className="text-sm text-gray-500">Silakan cek halaman tantangan</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Tantangan yang bisa langsung dikerjakan</h3>
                  {academicItems.length === 0 ? (
                    <div className="py-6 text-center text-gray-400 text-sm">
                      Belum ada tantangan akademik yang aktif saat ini.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {academicItems.slice(0, 2).map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">{item.judul}</p>
                            <p className="text-sm text-gray-600">{item.guru} • Deadline {item.deadline}</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('tantangan-akademik')}
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                          >
                            Buka
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md mt-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Tantangan Hatam</h3>
                  <p className="text-gray-600 mb-4">Lihat semua tugas hafalan dan catatan hatam.</p>
                  {hatamItems.length === 0 ? (
                    <div className="py-6 text-center text-gray-400 text-sm">
                      Belum ada tantangan hafalan yang aktif saat ini.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {hatamItems.slice(0, 2).map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">{item.judul}</p>
                            <p className="text-sm text-gray-600">{item.guru} • Deadline {item.deadline}</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('tantangan-hatam')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                          >
                            Buka
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'tantangan-akademik' && (
              <>
                <h2 className="text-2xl font-bold text-orange-600 mb-2">📚 Tantangan Akademik</h2>
                <p className="text-gray-600 mb-6">Guru mengirim tugas dalam format foto, PDF, atau video. Kamu bisa mengirim jawaban langsung di sini.</p>
                {feedbackMessage && (
                  <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
                    {feedbackMessage}
                  </div>
                )}

                <div className="space-y-4">
                  {academicItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
                      <div className="text-4xl mb-3">📚</div>
                      <p className="text-lg font-semibold">Belum Ada Tantangan Akademik</p>
                      <p className="text-sm text-gray-400 mt-1">Tugas akademik dari guru kelas akan muncul di sini.</p>
                    </div>
                  ) : (
                    academicItems.map((item) => {
                    const currentStatus = (submissions[item.id]?.status ?? item.status ?? 'pending') as ChallengeStatus;
                    return (
                      <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{item.judul}</h3>
                            <p className="text-sm text-gray-600">Guru: {item.guru}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.deskripsi}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusBadge(currentStatus)}`}>
                            {currentStatus === 'submitted' ? 'Sudah Dikumpulkan' : currentStatus === 'graded' ? 'Sudah Dinilai' : 'Belum Dikumpulkan'}
                          </span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-600">Deadline</p>
                          <p className="font-semibold text-gray-800">{item.deadline}</p>
                          {item.attachmentName && (
                            <p className="text-sm text-gray-600 mt-2">📎 File dari guru: {item.attachmentName}</p>
                          )}
                        </div>

                        {currentStatus === 'submitted' && submissions[item.id] && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                            <p className="font-semibold text-blue-700">Jawaban sudah dikirim</p>
                            <p className="text-sm text-gray-700">Waktu kirim: {submissions[item.id].submittedAt}</p>
                            <p className="text-sm text-gray-700">File: {submissions[item.id].attachmentName}</p>
                          </div>
                        )}

                        {currentStatus === 'pending' && (
                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-gray-700">
                              Upload jawaban (foto, PDF, atau video)
                            </label>
                            <input
                              type="file"
                              accept="image/*,application/pdf,video/*"
                              onChange={(event) => handleFileChange(item.id, event)}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                            />
                            <button
                              onClick={() => handleSubmit(item.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                              Kumpulkan Tugas
                            </button>
                          </div>
                        )}
                      </div>
                      );
                    })
                  )}
                </div>
              </>
            )}

            {activeTab === 'tantangan-hatam' && (
              <>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button
                    onClick={() => setActiveTab('tantangan-hatam')}
                    className="w-full sm:w-auto bg-yellow-500 text-white px-5 py-3 rounded-xl font-semibold shadow-sm hover:bg-yellow-600 transition"
                  >
                    📖 Semua Tantangan Hatam
                  </button>
                  <button
                    onClick={() => setActiveTab('tantangan-akademik')}
                    className="w-full sm:w-auto bg-gray-100 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    📚 Kembali ke Akademik
                  </button>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold text-yellow-600 mb-4">📖 Tantangan Hatam</h2>
                  <p className="text-gray-600 mb-6">Lihat tugas hafalan, kirim rekaman, dan pantau progress hatam kamu.</p>
                  <div className="space-y-4">
                    {hatamItems.length === 0 ? (
                      <div className="p-12 text-center text-gray-500 bg-yellow-50/50 rounded-2xl border border-dashed border-yellow-200">
                        <div className="text-4xl mb-3">📖</div>
                        <p className="text-lg font-semibold text-gray-700">Belum Ada Tantangan Hatam</p>
                        <p className="text-sm text-gray-400 mt-1">Tugas hafalan Al-Qur'an dari guru hatam akan muncul di sini.</p>
                      </div>
                    ) : (
                      hatamItems.map((item) => {
                      const currentStatus = (submissions[item.id]?.status ?? item.status ?? 'pending') as ChallengeStatus;
                      return (
                        <div key={item.id} className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg">{item.judul}</h3>
                              <p className="text-sm text-gray-600">Guru: {item.guru}</p>
                              <p className="text-sm text-gray-600 mt-1">{item.deskripsi}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusBadge(currentStatus)}`}>
                              {currentStatus === 'submitted' ? 'Sudah Dikumpulkan' : currentStatus === 'graded' ? 'Sudah Dinilai' : 'Belum Dikumpulkan'}
                            </span>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-yellow-200">
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className="font-semibold text-gray-800">{item.deadline}</p>
                          </div>
                          {currentStatus === 'pending' && (
                            <div className="mt-4 space-y-3">
                              <label className="block text-sm font-semibold text-gray-700">
                                Upload rekaman hafalan atau file pendukung
                              </label>
                              <input
                                type="file"
                                accept="audio/*,video/*,image/*,application/pdf"
                                onChange={(event) => handleFileChange(item.id, event)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                              />
                              <button
                                onClick={() => handleSubmit(item.id)}
                                className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition"
                              >
                                Kumpulkan Hafalan
                              </button>
                            </div>
                          )}
                          {currentStatus === 'submitted' && submissions[item.id] && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mt-4">
                              <p className="font-semibold text-yellow-700">Hafalan sudah dikirim</p>
                              <p className="text-sm text-gray-700">Waktu kirim: {submissions[item.id].submittedAt}</p>
                              <p className="text-sm text-gray-700">File: {submissions[item.id].attachmentName}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                </div>
              </>
            )}

            {(activeTab === 'chat' || activeTab === 'project' || activeTab === 'jadwal' || activeTab === 'nilai' || activeTab === 'info' || activeTab === 'settings') && (
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {activeTab === 'chat' && '💬 Chat Kelas'}
                  {activeTab === 'project' && '🤝 Project'}
                  {activeTab === 'jadwal' && '📅 Jadwal Pelajaran'}
                  {activeTab === 'nilai' && '📊 Nilai & Rapor'}
                  {activeTab === 'info' && '🏫 Info Sekolah'}
                  {activeTab === 'settings' && '⚙️ Pengaturan'}
                </h2>
                <p className="text-gray-600">Fitur ini akan segera ditampilkan.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
