# Create necessary directories
New-Item -ItemType Directory -Force -Path "src/app"
New-Item -ItemType Directory -Force -Path "src/components"
New-Item -ItemType Directory -Force -Path "src/services"
New-Item -ItemType Directory -Force -Path "src/types"
New-Item -ItemType Directory -Force -Path "prisma"
New-Item -ItemType Directory -Force -Path "public"
New-Item -ItemType Directory -Force -Path "temp"

# Install dependencies
Write-Host "Installing dependencies..."
npm install re2 @prisma/client

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..."
    @"
# Database Configuration
# You can use SQLite for development (no setup required)
DATABASE_URL="file:./dev.db"

# Or use PostgreSQL (requires PostgreSQL installation)
# DATABASE_URL="postgresql://user:password@localhost:5432/video_reposter"

NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Twitter API
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Facebook API
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
"@ | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "Created .env file. Please update it with your actual credentials."
}

# Update Prisma schema to use SQLite for development
$prismaSchema = @"
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Post {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  hashtags    String[]
  videoUrl    String
  platform    String   // 'twitter' or 'instagram'
  status      String   // 'draft', 'published', 'failed'
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
"@
$prismaSchema | Out-File -FilePath "prisma/schema.prisma" -Encoding UTF8

# Initialize Prisma
Write-Host "Initializing Prisma..."
try {
    npx prisma generate
    npx prisma db push
    Write-Host "Database setup completed successfully!"
} catch {
    Write-Host "Error setting up database. Please make sure you have the correct database configuration in your .env file."
    Write-Host "For development, you can use SQLite which is already configured."
    Write-Host "If you want to use PostgreSQL, please:"
    Write-Host "1. Install PostgreSQL from https://www.postgresql.org/download/"
    Write-Host "2. Create a database named 'video_reposter'"
    Write-Host "3. Update the DATABASE_URL in .env file with your PostgreSQL credentials"
}

Write-Host "`nSetup complete! You can now run 'npm run dev' to start the development server." 