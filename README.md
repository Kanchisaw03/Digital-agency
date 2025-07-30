# Vigyapana - Digital Marketing Agency Website

A complete, production-ready digital marketing agency website with modern design, advanced animations, and comprehensive backend system.

## 🌟 Overview

**Vigyapana** is a full-service digital IT agency specializing in web development, SEO, digital marketing, and more. This project includes:

- **Frontend**: Modern React application with Tailwind CSS and Framer Motion
- **Backend**: Comprehensive Node.js API with MongoDB
- **Admin Dashboard**: Full content management system
- **Features**: Contact forms, case studies, testimonials, file uploads, analytics

## 🚀 Features

### Frontend Features

- ✨ **Modern Design**: Dark theme with gradient accents
- 📱 **Fully Responsive**: Mobile-first design approach
- 🎭 **Smooth Animations**: Framer Motion animations and transitions
- 🎨 **3D Elements**: Spline 3D background integration
- 🧭 **Smart Navigation**: Sticky navbar with active link highlighting
- 📝 **Dynamic Content**: Services, case studies, testimonials
- 📧 **Contact Forms**: Multiple contact forms with validation
- 🎯 **SEO Optimized**: Meta tags, structured data, semantic HTML

### Backend Features

- 🔐 **Authentication**: JWT-based auth with role management
- 📊 **Dashboard**: Admin panel with analytics and statistics
- 💬 **Contact Management**: Form submissions with email notifications
- 🛠️ **Service Management**: CRUD operations for services
- 📈 **Case Studies**: Portfolio management with SEO
- ⭐ **Testimonials**: Client review system with verification
- 📁 **File Uploads**: Image management system
- 🔒 **Security**: Rate limiting, CORS, input validation
- 📧 **Email Integration**: Automated notifications

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **3D Graphics**: Spline React
- **Icons**: React Icons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios
- **Charts**: Recharts

### Backend

- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: Express Validator
- **File Upload**: Multer
- **Email**: Nodemailer/SendGrid
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **Git**

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd my-project

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Environment Setup

```bash
# Copy backend environment template
cd backend
cp config.env.example .env

# Edit .env with your configuration
```

**Required Environment Variables:**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/vigyapana

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin
ADMIN_EMAIL=admin@vigyapana.com
ADMIN_PASSWORD=admin123
```

### 3. Database Setup

```bash
# Seed database with sample data
npm run seed
```

### 4. Start Development Servers

```bash
# Start backend (in backend folder)
npm run dev

# Start frontend (in project root)
cd ..
npm run dev
```

**Access Points:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 📁 Project Structure

```
my-project/
├── 📁 backend/              # Backend API
│   ├── 📁 middleware/       # Auth, error handling
│   ├── 📁 models/          # Database models
│   ├── 📁 routes/          # API endpoints
│   ├── 📁 scripts/         # Database seeder
│   ├── 📁 uploads/         # File uploads
│   ├── 📄 server.js        # Main server
│   └── 📄 package.json     # Backend dependencies
├── 📁 src/                 # Frontend source
│   ├── 📁 components/      # React components
│   ├── 📁 pages/          # Page components
│   ├── 📄 App.jsx         # Main app component
│   └── 📄 main.jsx        # Entry point
├── 📁 public/             # Static assets
├── 📄 package.json        # Frontend dependencies
├── 📄 tailwind.config.js  # Tailwind configuration
└── 📄 vite.config.js      # Vite configuration
```

## 🎨 Design System

### Brand Colors

- **Background**: Dark (#121417)
- **Primary**: Blue to Green Gradient
- **Accent**: Violet highlights
- **Text**: White/Gray scale

### Typography

- **Font**: Inter (clean, modern)
- **Hierarchy**: Clear heading structure
- **Responsive**: Adaptive text sizes

### Components

- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: Neumorphic design with subtle shadows
- **Forms**: Clean inputs with validation states
- **Navigation**: Sticky header with smooth transitions

## 📱 Pages & Features

### 🏠 Homepage

- Hero section with 3D Spline background
- Services preview with animated cards
- Impact metrics with counters
- Client carousel
- Testimonials section
- Contact form

### 🛠️ Services Page

- Comprehensive service listings
- Category filtering
- Detailed service information
- Pricing and features
- Call-to-action buttons

### 📊 Case Studies

- Portfolio showcase
- Filter by service/industry
- Detailed project breakdowns
- Results and metrics
- Client testimonials

### 👥 About Page

- Company information
- Team showcase
- Mission and values
- Global reach statistics
- Growth timeline

### 📞 Contact Page

- Comprehensive contact form
- Service interest selection
- Budget and timeline options
- Location information
- Response time expectations

### 📝 Blog (Coming Soon)

- Industry insights
- SEO best practices
- Company updates
- Technical articles

## 🔧 Admin Dashboard

### 📈 Analytics Dashboard

- Contact submission metrics
- Service performance stats
- Case study view tracking
- Monthly growth trends
- Lead conversion rates

### 📞 Contact Management

- View all submissions
- Filter and search contacts
- Update status and priority
- Assign to team members
- Email integration

### 🛠️ Content Management

- **Services**: Add, edit, delete services
- **Case Studies**: Portfolio management
- **Testimonials**: Client review system
- **File Uploads**: Image management

### 👥 User Management

- Admin and editor roles
- User permissions
- Activity tracking
- Profile management

## 🔐 Security Features

- **Authentication**: JWT tokens with refresh
- **Authorization**: Role-based access control
- **Input Validation**: Server-side validation
- **Rate Limiting**: API request throttling
- **CORS**: Cross-origin protection
- **Helmet**: Security headers
- **Password Hashing**: bcrypt encryption

## 📧 Email Integration

### Contact Forms

- Instant notifications to admin
- Confirmation emails to users
- Professional email templates
- Delivery tracking

### Supported Providers

- Gmail SMTP
- SendGrid
- Custom SMTP servers

## 🚀 Performance Optimizations

### Frontend

- Code splitting with Vite
- Image optimization
- Lazy loading
- Efficient re-renders
- Compressed assets

### Backend

- Database indexing
- Query optimization
- File compression
- Response caching
- Connection pooling

## 🧪 Testing

```bash
# Frontend tests (when implemented)
npm test

# Backend tests (when implemented)
cd backend
npm test

# E2E tests (when implemented)
npm run test:e2e
```

## 📦 Deployment

### Frontend Deployment

- **Vercel**: Automatic deployment from Git
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option

### Backend Deployment

- **Render**: Easy Node.js deployment
- **Railway**: Simple backend hosting
- **DigitalOcean**: VPS deployment
- **AWS EC2**: Full control deployment

### Database

- **MongoDB Atlas**: Cloud database (recommended)
- **Local MongoDB**: Development setup

### Full-Stack Deployment Example (Render)

1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Update CORS and API URLs
4. Configure environment variables

## 🔄 Development Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run seed         # Seed database
```

### Full-Stack

```bash
npm run dev:full     # Start both servers (when configured)
```

## 🎯 SEO & Marketing

### Technical SEO

- Semantic HTML structure
- Meta tags optimization
- Open Graph tags
- Schema markup
- Sitemap generation
- Fast loading times

### Content Strategy

- Service-focused content
- Case study storytelling
- Client testimonials
- Blog integration ready
- Local SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation
- Test your changes
- Use meaningful commit messages

## 📞 Support & Contact

### Technical Support

- **Email**: dev@vigyapana.com
- **GitHub Issues**: Create an issue
- **Documentation**: Check README files

### Business Inquiries

- **Website**: [vigyapana.com](https://vigyapana.com)
- **Email**: hello@vigyapana.com
- **Phone**: +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: convergensee.com
- **3D Graphics**: Spline community
- **Icons**: React Icons library
- **Animations**: Framer Motion
- **UI Framework**: Tailwind CSS

## 🔮 Roadmap

### Phase 1 (Current)

- [x] Complete frontend design
- [x] Backend API development
- [x] Admin dashboard
- [x] Contact management
- [x] Basic SEO optimization

### Phase 2 (Upcoming)

- [ ] Blog system
- [ ] Advanced analytics
- [ ] Email campaigns
- [ ] Client portal
- [ ] Mobile app

### Phase 3 (Future)

- [ ] AI-powered features
- [ ] Advanced automation
- [ ] Multi-language support
- [ ] White-label solutions

---

## ✅ Quick Setup Checklist

- [ ] Node.js installed
- [ ] MongoDB setup
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Database seeded
- [ ] Both servers running
- [ ] Admin login working

**Ready to elevate your digital presence? Let's get started! 🚀**

---

**Built with ❤️ by the Vigyapana Team**

_Elevate Your Digital Presence_
