'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';

interface MessageItem {
  id: number;
  nama: string;
  role: string;
  pesan: string;
  waktu: string;
  tanggal: string;
}

export default function GuruChat() {
  const { user } = useAuthStore();
  const [messages, setMessages] = React.useState<MessageItem[]>([]);
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        nama: 'Bu Siti (Kamu)',
        role: 'guru',
        pesan: newMessage,
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        tanggal: 'Hari ini',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">💬 Chat Kelas</h2>
            <p className="text-sm text-gray-600">Kelas: {user?.kelas} - {user?.tahun_ajaran}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">32 Murid</p>
            <p className="text-xs text-green-600">🟢 Online: 28</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-16">
            <div className="text-4xl mb-3">💬</div>
            <p className="font-semibold text-gray-600">Belum Ada Pesan di Chat Kelas</p>
            <p className="text-xs text-gray-400 mt-1">Mulai percakapan dengan mengetikkan pesan di bawah.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'guru' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${msg.role === 'guru' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'} rounded-lg p-3 shadow-sm`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <p className={`text-xs font-semibold ${msg.role === 'guru' ? 'text-blue-100' : 'text-gray-600'}`}>
                    {msg.nama}
                  </p>
                  <p className={`text-xs ${msg.role === 'guru' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {msg.waktu}
                  </p>
                </div>
                <p className={`text-sm ${msg.role === 'guru' ? 'text-white' : 'text-gray-800'}`}>
                  {msg.pesan}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan untuk kelas..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Kirim
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">💡 Tekan Enter untuk mengirim pesan, Shift+Enter untuk baris baru</p>
      </div>
    </div>
  );
}
