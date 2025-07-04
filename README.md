# SocialSync

A powerful social media management platform that allows you to schedule and automate posts across multiple platforms, including Instagram and Twitter.

## Features

- Schedule posts for multiple social media platforms
- Automatic posting at scheduled times
- Analytics dashboard for post performance
- User-based settings and credentials management
- Secure API key storage
- Real-time post status updates

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- Instagram Graph API
- Twitter API v2

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-sync.git
cd social-sync
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/socialsync"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Instagram
INSTAGRAM_CLIENT_ID="your-instagram-client-id"
INSTAGRAM_CLIENT_SECRET="your-instagram-client-secret"

# Twitter
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Cron Job
CRON_SECRET="your-cron-secret"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

## Deployment

The application is designed to be deployed on Vercel. Follow these steps:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure the environment variables in Vercel
4. Set up a cron job in Vercel to hit the `/api/cron/scheduled-posts` endpoint every minute

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/settings/social` - Social media settings management
- `/api/social/schedule` - Post scheduling endpoints
- `/api/analytics` - Analytics data endpoints
- `/api/cron/scheduled-posts` - Cron job endpoint for processing scheduled posts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Project Structure

```
video-reposter/
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── services/       # Business logic and API services
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── temp/              # Temporary video storage
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. #   s o c i a l s y n c 
 
 #   S o c i a l S y n c  
 #   S o c i a l S y n c  
 