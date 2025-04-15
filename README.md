# Task Sprint Backend

A robust backend service for Task Sprint - a task management application built with Node.js, Express, and Prisma with MongoDB using TypeScript.

## 🚀 Features

- User authentication and authorization (JWT-based)
- Task management with categories
- User-specific task assignments
- Category customization with icons and colors
- Email service for sending emails

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Input Validation**: Yup
- **Type Safety**: TypeScript

## 📦 Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Custom middleware
├── routes/         # API routes
├── schemas/        # Prisma schema and models
├── services/       # Business logic
├── utils/          # Helper functions
├── templates/      # Email templates
├── assets/         # Email assets
├── index.ts        # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mhamza-dev/task-sprint-backend.git
cd task-sprint-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start the development server:

```bash
npm run dev
```

## 🔑 Environment Variables

```env
DATABASE_URL="mongodb://..."
JWT_SECRET="your-secret-key"
EMAIL_USER="your-email-user"
EMAIL_PASSWORD="your-email-password"
EMAIL_SERVICE="your-email-service" # gmail, yahoo, etc
PORT=3000
```

## 📝 API Documentation

API endpoints are documented using Swagger/OpenAPI. Access the documentation at:

```
http://localhost:3000/api-docs
```

## 🧪 Testing

Run tests using:

```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Muhammad Hamza - [GitHub Profile](https://github.com/mhamza-dev)

## 🙏 Acknowledgments

- List any resources, libraries, or individuals you'd like to acknowledge
