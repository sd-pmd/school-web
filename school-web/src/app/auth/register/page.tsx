'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'murid',
    kelas: '',
    nis: '',
    email: '',
    foto: null as File | null,
    kode_unik: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const kelasList = ['1', '2', '3', '4', '5', '6'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        foto: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi
    if (!formData.nama_lengkap || !formData.username || !formData.password) {
      setError('Nama, username, dan password tidak boleh kosong');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (formData.role !== 'admin' && !formData.kode_unik) {
      setError('Kode unik harus diisi');
      return;
    }

    // Simulasi pengiriman form (seharusnya ke backend)
    setIsLoading(true);
    try {
      // Di sini seharusnya ada API call untuk menyimpan pending registration
      console.log('Form data:', formData);
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess('Pendaftaran berhasil! Menunggu persetujuan admin...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      setError('Pendaftaran gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/pmd.png" alt="Logo" className="h-16 w-16 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-orange-900 mb-2">Pesantren Masyarakat Digital</h1>
          <p className="text-gray-600">Form Pendaftaran Akun</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-orange-500">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label htmlFor="nama_lengkap" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="nama_lengkap"
                name="nama_lengkap"
                value={formData.nama_lengkap}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Tipe Akun *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="murid">Murid</option>
                <option value="guru">Guru</option>
                <option value="orangtua">Orang Tua</option>
              </select>
            </div>

            {/* Kelas - untuk Guru dan Murid */}
            {formData.role !== 'orangtua' && (
              <div>
                <label htmlFor="kelas" className="block text-sm font-semibold text-gray-700 mb-2">
                  Kelas {formData.role === 'murid' ? '*' : '(Opsional)'}
                </label>
                <select
                  id="kelas"
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  required={formData.role === 'murid'}
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasList.map(k => (
                    <option key={k} value={k}>Kelas {k}</option>
                  ))}
                </select>
              </div>
            )}

            {/* NIS */}
            <div>
              <label htmlFor="nis" className="block text-sm font-semibold text-gray-700 mb-2">
                NIS/NIP (Opsional)
              </label>
              <input
                type="text"
                id="nis"
                name="nis"
                value={formData.nis}
                onChange={handleChange}
                placeholder="Masukkan NIS atau NIP"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email (Opsional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            {/* Foto */}
            <div>
              <label htmlFor="foto" className="block text-sm font-semibold text-gray-700 mb-2">
                Foto (Opsional)
              </label>
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
              {formData.foto && (
                <p className="text-sm text-gray-600 mt-2">📁 {formData.foto.name}</p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 pt-6">
              <p className="text-xs font-bold text-gray-500 uppercase mb-4">Informasi Login</p>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                minLength={6}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Konfirmasi Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                minLength={6}
                required
              />
            </div>

            {/* Kode Unik */}
            <div>
              <label htmlFor="kode_unik" className="block text-sm font-semibold text-gray-700 mb-2">
                Kode Unik * <span className="text-gray-500 text-xs">(dari admin)</span>
              </label>
              <input
                type="password"
                id="kode_unik"
                name="kode_unik"
                value={formData.kode_unik}
                onChange={handleChange}
                placeholder="Masukkan kode unik yang diberikan admin"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Kode ini diperlukan untuk verifikasi pendaftaran</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sedang memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-orange-600 font-semibold hover:text-orange-700">
              Masuk di sini
            </Link>
          </p>

          {/* Back Home Link */}
          <p className="text-center text-gray-600 mt-2">
            <Link href="/" className="text-orange-600 font-semibold hover:text-orange-700">
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded text-center">
          <p className="text-sm text-orange-900">
            💡 Setelah mendaftar, tunggu persetujuan admin untuk dapat mengakses platform.
          </p>
        </div>
      </div>
    </div>
  );
}
