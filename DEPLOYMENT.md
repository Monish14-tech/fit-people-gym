# Premium Gym - Deployment Guide

## 🚀 Vercel Deployment Instructions

### Prerequisites
- GitHub account with this repository
- Vercel account (sign up at [vercel.com](https://vercel.com))

### Deployment Steps

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"

2. **Import Repository**
   - Select "Import Git Repository"
   - Choose: `Monish14-tech/fit-people-gym`

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`  <-- **IMPORTANT: Click "Edit" and change to "client"**
   - **Build Command**: `npm run build` (Default)
   - **Output Directory**: `dist` (Default)
   - **Install Command**: `npm install` (Default)

4. **Environment Variables** (if needed)
   - Add any environment variables from your `.env` file
   - Example: `VITE_API_URL`, etc.

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Important Notes

- The `vercel.json` configuration is already set up in the root directory
- The build output is configured to use `client/dist`
- All routes are configured to redirect to `index.html` for React Router support
- The `dist` folder is gitignored and will be built on Vercel

### Troubleshooting

If you encounter errors:
1. **Ensure Root Directory is `client`**: Go to Settings > General > Root Directory and set it to `client`.
2. **Check Build Output**: Ensure `client/dist` is being created locally with `npm run build`.
3. **Clean Cache**: If redeploying, try "Redeploy with unchecking 'Use existing build setup'".

### Local Testing

To test the production build locally:
```bash
cd client
npm run build
npm run preview
```

## 📁 Project Structure

```
premium-gym/
├── client/              # React frontend (Vite)
│   ├── src/
│   ├── dist/           # Build output (gitignored)
│   ├── package.json
│   └── vite.config.js
├── server/             # Backend (if applicable)
├── vercel.json         # Vercel configuration
└── .gitignore
```

## 🔧 Configuration Files

- **vercel.json**: Root-level Vercel configuration
- **client/vercel.json**: Client-specific rewrites
- **client/vite.config.js**: Vite build configuration

---

**Developed by Monish Tech** 💪
