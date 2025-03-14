# AI for You - Landing Page

A modern landing page for "AI for You" - a service that helps automate daily workflows using AI.

## Features

- Responsive design that works on all devices
- Beautiful UI with gradient backgrounds and modern styling
- Interactive multi-step form for user engagement
- Contact form with email functionality
- Easy to customize and extend

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- Yarn or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-for-you.git
cd ai-for-you
```

2. Install dependencies
```bash
yarn install
# or
npm install
```

3. Set up email functionality
   - Configure your SMTP settings in `.env.local` file:
   ```
   # SMTP Configuration
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   SMTP_FROM=your_sender_email
   ```

4. Run the development server
```bash
# Use port 3001 to avoid conflicts
yarn dev:3001
# or
npm run dev:3001
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

### Troubleshooting Port Issues

If you encounter port conflicts (EADDRINUSE errors), you can use the included script to kill processes on ports 3000 and 3001:

```bash
./kill-ports.sh
```

Then restart the server with:

```bash
yarn dev:3001
```

## Customization

- Update the content in each component to match your needs
- Modify the styling using Tailwind CSS classes
- Add or remove sections as needed

## Deployment

This project is ready to be deployed to Vercel, Netlify, or any other hosting service that supports Next.js.

```bash
yarn build
# or
npm run build
```

## Docker Support

This project includes Docker support for both development and production environments.

### Prerequisites

- Docker
- Docker Compose

### Running with Docker

The project includes a Makefile to simplify Docker commands:

```bash
# Show available commands
make help

# Start development environment
make dev

# Start production environment
make prod

# View logs
make logs        # Development logs
make logs-prod   # Production logs

# Clean up Docker resources
make clean
```

### Manual Docker Commands

If you prefer not to use the Makefile, you can use Docker Compose directly:

```bash
# Development
docker-compose build app-dev
docker-compose up app-dev

# Production
docker-compose build app-prod
docker-compose up -d app-prod
```

### Docker Volumes

The production Docker setup uses a named volume for logs:

- `app_logs`: Stores application logs from the container

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Nodemailer for email functionality

## Email Configuration

This project uses Nodemailer to send emails through an SMTP server. To configure email sending:

1. Create or update your `.env.local` file with the following SMTP settings:

```
# SMTP Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_sender_email
```

2. The application includes two forms that send emails:
   - Contact form at the bottom of the page
   - Interactive multi-step form for workflow automation requests

Both forms use the `/api/send-email` API route to process submissions.

### Testing Email Functionality

To test if your email configuration is working correctly:

1. Make sure your `.env.local` file has the correct SMTP credentials
2. Run the test script:

```bash
yarn test:email
```

This will attempt to send a test email using your SMTP configuration and provide detailed error messages if there are any issues.

### Troubleshooting Email Issues

If you encounter email sending issues:

1. Check your SMTP credentials in `.env.local`
2. Verify that your SMTP server allows authentication from your IP address
3. If using Gmail, you may need to enable "Less secure app access" or use an App Password
4. Check the server logs for detailed error messages
5. Check the application logs for detailed error information (see Logging section below)

## Logging System

The application includes a logging system that records errors and important events to files. This is especially useful for tracking email sending failures and other issues.

### Log Files

Log files are stored in the `logs` directory with the naming format `log-YYYY-MM-DD.txt`. Each log entry includes:

- Timestamp
- Log level (ERROR or INFO)
- Message
- Error details (for errors)
- Context information

### Viewing Logs

You can view logs using the provided script:

```bash
# View all logs
npm run logs

# View only error logs
npm run logs:errors

# View logs for a specific date
npm run logs -- --date 2023-04-15

# Search for specific terms in logs
npm run logs -- --search "email"
```

For more options, run:

```bash
npm run logs -- --help
```

## Background Image

The project uses a background image of a woman working with AI interfaces. This image should be placed in the `public/images` directory as `ai-woman-background.jpg`. The image is displayed with a blur effect to create a subtle background that doesn't distract from the main content.

### Downloading the Background Image

To ensure the background image is properly displayed, you can download it using the provided script:

```bash
# Download the AI woman background image
npm run download-image
# or
make download-image
```

When using Docker, the image will be automatically downloaded when you run:

```bash
make dev
# or
make prod
```

If you're experiencing issues with the background image not showing up, make sure:
1. The image file exists at `public/images/ai-woman-background.jpg`
2. The image file is an actual image file, not a placeholder
3. The Docker container has access to the image file

## License

This project is licensed under the MIT License - see the LICENSE file for details. 