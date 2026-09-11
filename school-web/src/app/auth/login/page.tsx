'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      clearError();
      await login(formData.username, formData.password);
      // Redirect ke dashboard sesuai role
      const { user } = useAuthStore.getState();
      if (user?.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (user?.role === 'hatam') {
        router.push('/dashboard/hatam');
      } else if (user?.role) {
        router.push(`/dashboard/${user.role}`);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/pmd.png" alt="Logo" className="h-16 w-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-orange-900 mb-2">Pesantren Masyarakat Digital</h1>
          <p className="text-gray-600">Platform Pembelajaran Digital</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Masuk
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username / Nomor Identitas
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username atau nomor identitas"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition text-gray-700"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Masukkan username yang telah diberikan oleh administrator
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition text-gray-700"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sedang memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">atau</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="text-blue-600 font-semibold hover:text-blue-700">
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-900">
            💡 <strong>Tips:</strong> Jika lupa password, hubungi admin sekolah Anda.
          </p>
        </div>

        {/* Admin Account Info */}
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-900 font-semibold mb-2">
            🔐 <strong>Administrator Access</strong>
          </p>
          <p className="text-xs text-blue-800">
            Sistem ini dikelola oleh administrator. Hubungi administrator untuk membuat akun baru atau reset password.
          </p>
        </div>
      </div>
    </div>
  );
}
