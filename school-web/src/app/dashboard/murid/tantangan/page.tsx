'use client';

import { ChangeEvent, useEffect, useState } from 'react';

type ChallengeStatus = 'pending' | 'submitted' | 'graded';
type ContentType = 'text' | 'gambar' | 'video' | 'pdf';

interface ChallengeItem {
  id: string;
  judul: string;
  guru: string;
  deskripsi: string;
  deadline: string;
  contentType: ContentType;
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

export default function MuridTantangan() {
  const [challenges, setChallenges] = useState<ChallengeItem[]>(defaultChallenges);
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
          attachment?: { name?: string };
        }>;

        const mapped = parsed.map((item) => ({
          id: item.id,
          judul: item.judul,
          guru: item.guru ?? 'Guru',
          deskripsi: item.deskripsi,
          deadline: item.deadline,
          contentType: item.contentType,
          attachmentName: item.attachment?.name,
        }));

        if (mapped.length > 0) {
          setChallenges(mapped);
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

  const getStatusColor = (status: ChallengeStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'graded':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: ChallengeStatus) => {
    switch (status) {
      case 'pending':
        return '⏰ Belum Dikumpulkan';
      case 'submitted':
        return '✓ Sudah Dikumpulkan';
      case 'graded':
        return '✓ Sudah Dinilai';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/pmd.png" alt="Logo" className="h-10 w-10 object-contain" />
            <h1 className="text-2xl font-bold text-green-600">Pesantren Masyarakat Digital - Tantangan Murid</h1>
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
              <p className="font-semibold text-gray-800">Budi Santoso</p>
              <p className="text-sm text-gray-600">Kelas: 1</p>
            </div>
          </div>

          <nav className="p-6 space-y-3">
            <a href="/dashboard/murid" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📊 Dashboard
            </a>
            <a href="/dashboard/murid/tantangan" className="block p-3 bg-green-100 text-green-700 rounded-lg font-semibold">
              📝 Tantangan
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              🤝 Project
            </a>
            <a href="#" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              💬 Chat Kelas
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-5xl">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl mb-8 shadow-lg">
              <h2 className="text-3xl font-bold">Tantangan (Tugas) Ku</h2>
              <p className="text-green-100 mt-2">Lihat dan kirim jawaban tugas dari guru</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm">Belum Dikumpulkan</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Sudah Dikumpulkan</p>
                <p className="text-2xl font-bold text-blue-600">{submittedCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Sudah Dinilai</p>
                <p className="text-2xl font-bold text-green-600">{gradedCount}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm">Total Tugas</p>
                <p className="text-2xl font-bold text-purple-600">{challengeItems.length}</p>
              </div>
            </div>

            {feedbackMessage && (
              <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-700">
                {feedbackMessage}
              </div>
            )}

            <div className="space-y-6">
              {challengeItems.map((tantangan) => {
                const currentStatus = (submissions[tantangan.id]?.status ?? tantangan.status ?? 'pending') as ChallengeStatus;
                return (
                  <div key={tantangan.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">{tantangan.judul}</h3>
                        <p className="text-sm text-gray-600 mt-1">👨‍🏫 {tantangan.guru}</p>
                        <p className="text-gray-700 mt-3">{tantangan.deskripsi}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full font-semibold text-sm whitespace-nowrap ml-4 ${getStatusColor(currentStatus)}`}>
                        {getStatusLabel(currentStatus)}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center gap-4">
                      <div className="text-2xl">📅</div>
                      <div>
                        <p className="text-sm text-gray-600">Deadline</p>
                        <p className="font-bold text-gray-800">{tantangan.deadline}</p>
                      </div>
                    </div>

                    {tantangan.attachmentName && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">📎 File dari Guru:</p>
                        <p className="font-semibold text-blue-600">{tantangan.attachmentName}</p>
                      </div>
                    )}

                    {currentStatus === 'submitted' && submissions[tantangan.id] && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                        <p className="text-sm text-gray-600">Dikumpulkan pada: <strong>{submissions[tantangan.id].submittedAt}</strong></p>
                        <p className="text-sm text-gray-600">File: {submissions[tantangan.id].attachmentName}</p>
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
                          onChange={(event) => handleFileChange(tantangan.id, event)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                        <button
                          onClick={() => handleSubmit(tantangan.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                          Kumpulkan Tugas
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <p className="text-green-900">
                💡 <strong>Tips:</strong> Upload jawaban sebelum deadline. Jika ada pertanyaan, tanyakan langsung ke guru lewat chat kelas.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
