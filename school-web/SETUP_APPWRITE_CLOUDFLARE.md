# Setup Guide: Appwrite + Cloudflare

## 📋 Prerequisites

Pastikan sudah install:
- Node.js 18+
- Docker (untuk Appwrite local)
- Git
- Cloudflare account

## 🚀 Setup Appwrite (Backend)

### Option 1: Local Development dengan Docker

```bash
# Install Appwrite menggunakan Docker
docker run -d \
  --name=appwrite \
  -p 8000:8000 \
  -p 8001:8001 \
  -v appwrite-vol:/storage/uploads \
  -v ./appwrite-vol:/storage/certificates \
  -e _APP_ENV=production \
  -e _APP_VERSION=latest \
  appwrite/appwrite:latest

# Akses Appwrite Console di http://localhost:8000
```

### Option 2: Appwrite Cloud

1. Daftar di [Appwrite Cloud](https://cloud.appwrite.io)
2. Create new project
3. Copy Project ID dan Endpoint URL
4. Update di `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_URL=https://your-cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

## 📝 Konfigurasi Database di Appwrite

### 1. Create Database

Di Appwrite Console:
- Buka "Database"
- Create new database: `school_db`
- Note database ID

### 2. Create Collections

#### Users Collection
```
Collection ID: users
Attributes:
- username (String, Required)
- password (String, Required) 
- nama_lengkap (String, Required)
- email (Email)
- no_identitas (String, Required)
- role (Enum: guru|murid|orangtua, Required)
- kelas (String)
- tahun_ajaran (String, Required)
- createdAt (DateTime, Auto)
```

#### Absensi Collection
```
Collection ID: absensi
Attributes:
- murid_id (String, Required)
- tanggal (DateTime, Required)
- status (Enum: hadir|alfa|izin|sakit, Required)
- keterangan (String)
- diinput_oleh (String, Required)
- dikonfirmasi_guru (Boolean)
```

#### Chat Collection
```
Collection ID: chat
Attributes:
- kelas_id (String, Required)
- pengirim_id (String, Required)
- pesan (String, Required)
- attachment (String)
- createdAt (DateTime, Auto)
```

#### Tantangan Collection
```
Collection ID: tantangan
Attributes:
- guru_id (String, Required)
- kelas_id (String, Required)
- judul (String, Required)
- deskripsi (String, Required)
- deadline (DateTime, Required)
- file (String)
- createdAt (DateTime, Auto)
```

#### Project Collection
```
Collection ID: project
Attributes:
- guru_id (String, Required)
- kelas_id (String, Required)
- nama_project (String, Required)
- deskripsi (String, Required)
- deadline (DateTime, Required)
- status (Enum: planning|in_progress|completed, Required)
```

## ⚙️ Update Environment Variables

Edit `.env.local`:

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_URL=http://localhost:8000/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=school_web
NEXT_PUBLIC_APPWRITE_DATABASE_ID=school_db
NEXT_PUBLIC_APPWRITE_COLLECTION_USERS=users
NEXT_PUBLIC_APPWRITE_COLLECTION_ABSENSI=absensi
NEXT_PUBLIC_APPWRITE_COLLECTION_CHAT=chat
NEXT_PUBLIC_APPWRITE_COLLECTION_TANTANGAN=tantangan
NEXT_PUBLIC_APPWRITE_COLLECTION_PROJECT=project
APPWRITE_API_KEY=your_api_key_here

# Cloudflare (untuk production)
NEXT_PUBLIC_CLOUDFLARE_PAGES_URL=https://school-web.pages.dev
```

## 🌐 Deploy ke Cloudflare Pages

### 1. Setup Cloudflare Account

```bash
# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Login ke Cloudflare
wrangler login
```

### 2. Configure wrangler.toml

Buat/update `wrangler.toml`:

```toml
name = "school-web"
type = "javascript"

[env.production]
vars = { ENVIRONMENT = "production" }

[build]
command = "npm run build"
cwd = "./school-web"
destination = ".next/static"

[[routes]]
pattern = "example.com/*"
zone_name = "example.com"
```

### 3. Deploy ke Cloudflare Pages

```bash
# Build aplikasi
npm run build

# Deploy ke Cloudflare Pages
wrangler pages deploy .next/static --project-name school-web
```

Atau gunakan Git integration:
1. Push code ke GitHub
2. Di Cloudflare dashboard, connect GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `.next/static` atau `out`

## 🔒 Setup CORS di Appwrite

Di Appwrite Console > Settings > Domains:
```
http://localhost:3000
https://school-web.pages.dev
```

## 🔑 API Keys

### Dapatkan Appwrite API Key:
1. Buka Appwrite Console
2. Go to Settings > API Keys
3. Create new key dengan permissions:
   - users.read, users.write
   - databases.read, databases.write
   - documents.read, documents.write, documents.delete

## 📦 Implementasi Appwrite di Code

### Update authStore.ts

```typescript
// Untuk production, uncomment Appwrite code dan hapus mock users
import { account, databases } from '@/lib/appwrite/client';

const session = await account.createEmailPasswordSession(email, password);
const userData = await databases.getDocument(DATABASE_ID, COLLECTIONS.users, userId);
```

## ✅ Testing

```bash
# Development mode (dengan mock auth)
npm run dev

# Login dengan credentials:
# - Username: 123456789, Password: password123 (Guru)
# - Username: 1234567890, Password: password123 (Murid)
# - Username: 9876543210, Password: password123 (Orang Tua)

# Production mode (dengan Appwrite)
# Pastikan Appwrite server running
# Update .env.local dengan Appwrite credentials
npm run build && npm run start
```

## 🐛 Troubleshooting

### CORS Error
- Check Appwrite CORS settings
- Pastikan domain sudah terdaftar di Appwrite

### Database Connection Error
- Pastikan Appwrite server running
- Check environment variables
- Verify API Key permissions

### Cloudflare Pages Deploy Error
- Check build output logs
- Verify `wrangler.toml` configuration
- Pastikan environment variables set di Cloudflare

## 📚 Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
