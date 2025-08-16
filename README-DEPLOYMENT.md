# Deployment Guide

## GitHub Actions + Vercel Deployment

This project is configured to automatically deploy to Vercel using GitHub Actions.

### Setup Instructions

#### 1. Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard
4. Note down your Project ID and Organization ID

#### 2. Generate Vercel Token
1. Go to [Vercel Tokens](https://vercel.com/account/tokens)
2. Create a new token with appropriate permissions
3. Copy the token for GitHub secrets

#### 3. Configure GitHub Secrets
Add these secrets to your GitHub repository settings:

- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

#### 4. Environment Variables
Make sure to configure these environment variables in Vercel:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_MEASUREMENT_ID=your_google_analytics_measurement_id

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

KLAVIYO_API_KEY=your_klaviyo_api_key
```

### How It Works

#### Automatic Deployments
- **Production**: Pushes to `main` branch trigger production deployments
- **Preview**: Pull requests trigger preview deployments
- **Environment**: Production uses production environment variables, PRs use preview

#### Manual Deployment
You can also deploy manually using Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) does the following:

1. **Checkout**: Gets the latest code
2. **Setup Node.js**: Installs Node.js 18
3. **Install Dependencies**: Runs `npm ci`
4. **Install Vercel CLI**: Gets the latest Vercel CLI
5. **Pull Environment**: Downloads Vercel project configuration
6. **Build**: Builds the Next.js application
7. **Deploy**: Deploys to Vercel (production for main branch, preview for PRs)

### Troubleshooting

#### Common Issues
1. **Missing secrets**: Ensure all GitHub secrets are configured
2. **Environment variables**: Check Vercel dashboard for missing env vars
3. **Build failures**: Check GitHub Actions logs for specific errors
4. **Node version**: Make sure you're using Node 18.x as specified in package.json

#### Getting Project IDs
Run these commands in your local project after linking to Vercel:

```bash
# Link project to Vercel (first time only)
vercel link

# Get project info
vercel project ls
```

### Alternative: Direct Vercel Integration

If you prefer, you can also use Vercel's built-in GitHub integration:
1. Connect your GitHub repo directly in Vercel dashboard
2. Configure environment variables
3. Automatic deployments will work without GitHub Actions

The GitHub Actions approach gives you more control over the deployment process and allows for custom build steps if needed.
