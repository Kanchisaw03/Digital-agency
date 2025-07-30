# Vigyapana Backend API

A comprehensive backend API for the Vigyapana digital agency website built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Contact Management** - Handle form submissions with email notifications
- **Service Management** - CRUD operations for company services
- **Case Studies** - Portfolio management with SEO optimization
- **Testimonials** - Client testimonial management with verification
- **File Uploads** - Image upload handling with multiple categories
- **Dashboard Analytics** - Comprehensive admin dashboard with statistics
- **Security** - Rate limiting, CORS, helmet, input validation
- **Email Integration** - Automated email notifications

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp config.env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/vigyapana
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@vigyapana.com
   ADMIN_PASSWORD=admin123
   CLIENT_URL=http://localhost:5173
   ```

3. **Start MongoDB:**

   ```bash
   # If using local MongoDB
   mongod

   # Or use MongoDB Atlas connection string in .env
   ```

4. **Seed the database (optional):**

   ```bash
   npm run seed
   ```

5. **Start the server:**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint    | Description      | Access  |
| ------ | ----------- | ---------------- | ------- |
| POST   | `/login`    | User login       | Public  |
| POST   | `/register` | Create new user  | Admin   |
| GET    | `/me`       | Get current user | Private |
| PUT    | `/profile`  | Update profile   | Private |
| PUT    | `/password` | Change password  | Private |
| GET    | `/users`    | Get all users    | Admin   |
| POST   | `/logout`   | Logout user      | Private |

### 📞 Contact Routes (`/api/contact`)

| Method | Endpoint          | Description         | Access |
| ------ | ----------------- | ------------------- | ------ |
| POST   | `/`               | Submit contact form | Public |
| GET    | `/`               | Get all contacts    | Admin  |
| GET    | `/:id`            | Get single contact  | Admin  |
| PUT    | `/:id`            | Update contact      | Admin  |
| DELETE | `/:id`            | Delete contact      | Admin  |
| GET    | `/stats/overview` | Contact statistics  | Admin  |

### 🛠️ Service Routes (`/api/services`)

| Method | Endpoint           | Description           | Access |
| ------ | ------------------ | --------------------- | ------ |
| GET    | `/`                | Get all services      | Public |
| GET    | `/:id`             | Get single service    | Public |
| POST   | `/`                | Create service        | Admin  |
| PUT    | `/:id`             | Update service        | Admin  |
| DELETE | `/:id`             | Delete service        | Admin  |
| PATCH  | `/:id/toggle`      | Toggle service status | Admin  |
| GET    | `/categories/list` | Get categories        | Public |

### 📊 Case Studies Routes (`/api/case-studies`)

| Method | Endpoint          | Description           | Access |
| ------ | ----------------- | --------------------- | ------ |
| GET    | `/`               | Get all case studies  | Public |
| GET    | `/:id`            | Get single case study | Public |
| POST   | `/`               | Create case study     | Admin  |
| PUT    | `/:id`            | Update case study     | Admin  |
| DELETE | `/:id`            | Delete case study     | Admin  |
| PATCH  | `/:id/toggle`     | Toggle publish status | Admin  |
| GET    | `/slug/:slug`     | Get by slug           | Public |
| GET    | `/stats/overview` | Case study statistics | Admin  |

### 💬 Testimonials Routes (`/api/testimonials`)

| Method | Endpoint          | Description            | Access |
| ------ | ----------------- | ---------------------- | ------ |
| GET    | `/`               | Get all testimonials   | Public |
| GET    | `/:id`            | Get single testimonial | Public |
| POST   | `/`               | Create testimonial     | Admin  |
| PUT    | `/:id`            | Update testimonial     | Admin  |
| DELETE | `/:id`            | Delete testimonial     | Admin  |
| PATCH  | `/:id/toggle`     | Toggle publish status  | Admin  |
| PATCH  | `/:id/verify`     | Update verification    | Admin  |
| GET    | `/stats/overview` | Testimonial statistics | Admin  |

### 📈 Dashboard Routes (`/api/dashboard`)

| Method | Endpoint              | Description            | Access |
| ------ | --------------------- | ---------------------- | ------ |
| GET    | `/stats`              | Get dashboard overview | Admin  |
| GET    | `/contacts/analytics` | Contact analytics      | Admin  |
| GET    | `/performance`        | Performance metrics    | Admin  |
| GET    | `/activity`           | Recent activity feed   | Admin  |

### 📁 Upload Routes (`/api/upload`)

| Method | Endpoint                | Description            | Access |
| ------ | ----------------------- | ---------------------- | ------ |
| POST   | `/image/:type`          | Upload single image    | Admin  |
| POST   | `/images/:type`         | Upload multiple images | Admin  |
| GET    | `/:type`                | Get files list         | Admin  |
| GET    | `/:type/:filename/info` | Get file info          | Admin  |
| DELETE | `/:type/:filename`      | Delete file            | Admin  |

**Upload Types:** `avatars`, `logos`, `case-studies`, `testimonials`

## 🗃️ Database Models

### User

- Authentication and user management
- Roles: `admin`, `editor`
- Password hashing with bcrypt

### Service

- Company service offerings
- Categorization and pricing
- Featured/active status

### Contact

- Contact form submissions
- Status tracking and assignment
- Email notifications

### CaseStudy

- Portfolio showcase
- SEO optimization with slugs
- View tracking

### Testimonial

- Client testimonials
- Rating system
- Verification status

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - express-validator
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt encryption
- **File Upload Security** - Type and size validation

## 🚦 Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Validation errors (if applicable)
}
```

## 📧 Email Configuration

The API supports multiple email providers:

### Gmail SMTP

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### SendGrid

```env
SENDGRID_API_KEY=your-sendgrid-api-key
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Configure email service
4. Set secure JWT secret
5. Configure proper CORS origins

### Deployment Platforms

- **Render** - Easy deployment with automatic builds
- **Railway** - Simple Node.js hosting
- **DigitalOcean** - VPS deployment
- **AWS EC2** - Full control deployment

## 🔄 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

## 📝 Logging

The API uses Morgan for HTTP request logging:

- Development: Detailed colored logs
- Production: Combined format logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests (if applicable)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email dev@vigyapana.com or create an issue in the repository.

---

**Built with ❤️ by the Vigyapana Team**
