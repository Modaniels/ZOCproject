# ZOC Project Documentation

Welcome to the ZOC Project documentation. This is a modern e-commerce application built with Laravel and React.

## Quick Links

- [Installation Guide](./installation.md)
- [API Documentation](./api.md)
- [Database Schema](./database.md)
- [Frontend Architecture](./frontend.md)
- [Deployment Guide](./deployment.md)
- [Development Workflow](./development.md)
- [Testing Guide](./testing.md)
- [Configuration](./configuration.md)
- [Troubleshooting](./troubleshooting.md)

## Project Overview

The ZOC Project is a full-stack e-commerce application featuring:

- **Backend**: Laravel 12 with Fortify for authentication
- **Frontend**: React with Inertia.js for seamless SPA experience
- **Database**: SQLite (configurable to MySQL/PostgreSQL)
- **Payment Integration**: M-Pesa for mobile payments
- **Styling**: Tailwind CSS with Radix UI components
- **Testing**: Pest for PHP testing
- **Build Tools**: Vite for asset compilation

## Key Features

- Product catalog with categories
- Shopping cart functionality
- User authentication with 2FA support
- Order management system
- Admin dashboard
- M-Pesa payment integration
- Responsive design
- Real-time cart updates
- Product search and filtering

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   React/Inertia │◄──►│   Laravel       │◄──►│   SQLite        │
│   Tailwind CSS  │    │   Fortify       │    │   Migrations    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   External      │
                       │   M-Pesa API    │
                       └─────────────────┘
```

## Getting Started

1. [Install the application](./installation.md)
2. [Configure your environment](./configuration.md)
3. [Set up the database](./database.md)
4. [Start development](./development.md)

## Support

For issues and questions:
- Check the [troubleshooting guide](./troubleshooting.md)
- Review the [FAQ](./faq.md)
- Open an issue in the repository

## Contributing

Please read our [development workflow](./development.md) and [testing guide](./testing.md) before contributing.