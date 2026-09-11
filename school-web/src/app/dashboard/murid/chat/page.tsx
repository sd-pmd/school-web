'use client';

import React from 'react';

interface MessageItem {
  id: number;
  nama: string;
  role: string;
  pesan: string;
  waktu: string;
  tanggal: string;
}

export default function MuridChat() {
  const [messages, setMessages] = React.useState<MessageItem[]>([]);

  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const message = {
      id: messages.length + 1,
      nama: 'Budi Santoso (Kamu)',
      role: 'user',
      pesan: newMessage,
      waktu: now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'),
      tanggal: 'Hari ini',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">🏫 School Web - Chat Kelas 1</h1>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
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
            <a href="/dashboard/murid/chat" className="block p-3 bg-green-100 text-green-700 rounded-lg font-semibold">
              💬 Chat Kelas
            </a>
            <a href="/dashboard/murid/tantangan" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              📝 Tantangan
            </a>
            <a href="/dashboard/murid/project" className="block p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              🤝 Project
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 flex flex-col h-screen bg-gradient-to-b from-white to-gray-50">
          <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
            {/* Chat Header */}
            <div className="bg-white rounded-t-xl shadow-md p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Kelas 1</h2>
                  <p className="text-sm text-gray-600">32 anggota • Wali Kelas: Bu Siti</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 bg-white p-6 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-16">
                  <div className="text-4xl mb-3">💬</div>
                  <p className="font-semibold text-gray-600">Belum Ada Pesan di Kelas Ini</p>
                  <p className="text-xs text-gray-400 mt-1">Kirim pesan pertama untuk memulai obrolan dengan teman & guru.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role !== 'user' && (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-blue-500">
                        {msg.nama[0]}
                      </div>
                    )}

                    <div className={`max-w-xs ${msg.role === 'user' ? 'order-2' : ''}`}>
                      {msg.role !== 'user' && (
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          {msg.nama}
                          {msg.role === 'guru' && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              Guru
                            </span>
                          )}
                        </p>
                      )}

                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-green-500 text-white rounded-br-none'
                            : msg.role === 'guru'
                            ? 'bg-blue-100 text-gray-800 rounded-bl-none'
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.pesan}</p>
                      </div>

                      <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'} text-gray-500`}>
                        {msg.waktu}
                      </p>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">
                        B
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="bg-white rounded-b-xl shadow-md p-6 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tulis pesan di sini..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full focus:border-green-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
                >
                  📤 Kirim
                </button>
              </form>

              <div className="mt-4 flex gap-3 text-sm text-gray-600">
                <button className="hover:text-green-600 transition">📎 Lampiran</button>
                <button className="hover:text-green-600 transition">😊 Emoji</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
