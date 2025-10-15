# ProStore - E-commerce Platform

A modern e-commerce platform built with Next.js 15, TypeScript, Prisma, and Tailwind CSS. Features include product catalog, user authentication, responsive design, and dark/light theme support.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **Database**: PostgreSQL with Neon serverless
- **Styling**: Tailwind CSS with shadcn/ui components
- **Theme**: Dark/Light mode support
- **Responsive Design**: Mobile-first approach
- **Product Management**: Product catalog with images, categories, and ratings

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) database (or use Neon serverless)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prostore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/prostore"
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME="ProStore"
   NEXT_PUBLIC_APP_DESCRIPTION="Your trusted online shopping destination"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   
   # Product Configuration
   LATEST_PRODUCTS_LIMIT="8"
   
   # NextAuth Configuration (add these for authentication)
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers (optional - add your own keys)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database with sample data
   npx tsx db/seed.ts
   ```

## 🚀 Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

3. **Start developing**
   
   The application will automatically reload when you make changes to the code.

## 📁 Project Structure

```
prostore/
├── app/                    # Next.js app directory
│   ├── (root)/            # Root layout and pages
│   ├── api/               # API routes
│   └── assets/            # Static assets
├── components/            # React components
│   ├── shared/           # Shared components
│   └── ui/               # UI components (shadcn/ui)
├── db/                   # Database utilities
├── lib/                  # Utility functions and actions
├── prisma/               # Database schema and migrations
├── public/               # Static files
└── types/                # TypeScript type definitions
```

## 🗄️ Database

This project uses PostgreSQL with Prisma ORM. The database schema includes:

- **Products**: Product catalog with images, categories, pricing
- **Users**: User accounts with authentication
- **Accounts**: OAuth provider accounts
- **Sessions**: User sessions
- **VerificationTokens**: Email verification tokens

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database and seed
npx prisma db push --force-reset
npx tsx db/seed.ts
```

## 🎨 Styling

The project uses Tailwind CSS with shadcn/ui components. The theme system supports:

- Dark/Light mode toggle
- Responsive design
- Custom component styling

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma studio    # Open database GUI
npx tsx db/seed.ts   # Seed database with sample data
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | Yes |
| `NEXT_PUBLIC_APP_DESCRIPTION` | Application description | Yes |
| `NEXT_PUBLIC_SERVER_URL` | Server URL | Yes |
| `LATEST_PRODUCTS_LIMIT` | Number of latest products to show | No |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes (for auth) |
| `NEXTAUTH_URL` | NextAuth URL | Yes (for auth) |

## 🔐 Authentication

The application uses NextAuth.js for authentication. To enable authentication:

1. Set up OAuth providers (Google, GitHub, etc.)
2. Configure the environment variables
3. Update the auth configuration in `auth.ts`

## 📦 Dependencies

### Core Dependencies
- **Next.js 15**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components

### Key Features
- **@neondatabase/serverless**: Neon database adapter
- **next-themes**: Theme management
- **lucide-react**: Icons
- **zod**: Schema validation
- **bcrypt-ts-edge**: Password hashing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database connection errors**
   - Verify your `DATABASE_URL` is correct
   - Ensure your database is running
   - Check if Prisma client is generated

2. **Authentication not working**
   - Verify all NextAuth environment variables are set
   - Check OAuth provider configuration
   - Ensure `NEXTAUTH_URL` matches your deployment URL

3. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Clear `.next` folder and rebuild
   - Check TypeScript errors with `npm run lint`

### Getting Help

If you encounter any issues:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Prisma documentation](https://www.prisma.io/docs)
3. Open an issue in the repository

---

Happy coding! 🎉

