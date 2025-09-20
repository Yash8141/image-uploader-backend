# 🚀 Render Deployment Guide for Image Uploader

## ✅ Pre-Deployment Checklist

### 1. Code Issues Fixed

- ✅ Added proper middleware (express.json, express.urlencoded, static files)
- ✅ Removed hardcoded credentials (security risk)
- ✅ Added error handling for uploads
- ✅ Fixed file reference in upload route
- ✅ Updated package.json for production
- ✅ Added error display in EJS template

### 2. Required Environment Variables

You need to set these environment variables in Render:

#### **Required Variables:**

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://yashsolanki1622_db_user:Fguuuml5Lwcj1wsh@cluster0.iolebsr.mongodb.net/
CLOUD_NAME=dkklnd2k1
API_KEY=645396612834928
API_SECRET=bP8daAr4MXqhfflNI1DtokJ6HYw
```

#### **Optional Variables:**

```
PORT=3000 (Render will set this automatically)
```

## 🛠️ Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

### Step 2: Deploy on Render

#### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy

#### Option B: Manual Configuration

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `image-uploader`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

### Step 3: Set Environment Variables

In Render dashboard, go to your service → Environment tab:

1. **NODE_ENV:** `production`
2. **MONGODB_URI:** `mongodb+srv://yashsolanki1622_db_user:Fguuuml5Lwcj1wsh@cluster0.iolebsr.mongodb.net/`
3. **CLOUD_NAME:** `dkklnd2k1`
4. **API_KEY:** `645396612834928`
5. **API_SECRET:** `bP8daAr4MXqhfflNI1DtokJ6HYw`

### Step 4: Deploy

1. Click "Deploy" or "Deploy latest commit"
2. Wait for build to complete (usually 2-5 minutes)
3. Your app will be available at: `https://your-app-name.onrender.com`

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails:**

   - Check if all dependencies are in `package.json`
   - Ensure `start` script uses `node` not `nodemon`

2. **App Crashes:**

   - Check environment variables are set correctly
   - Check MongoDB connection string
   - Check Cloudinary credentials

3. **File Upload Issues:**
   - Ensure `public/uploads` directory exists
   - Check file size limits
   - Verify Cloudinary configuration

### Debug Commands:

```bash
# Check logs in Render dashboard
# Or run locally to test:
npm run dev
```

## 📁 File Structure Required

```
image-uploader/
├── server.js
├── package.json
├── render.yaml
├── models/
│   └── imageUpload.js
├── views/
│   └── index.ejs
└── public/
    └── uploads/ (will be created automatically)
```

## 🔒 Security Notes

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all sensitive data
3. **Consider using Render's secret management** for production
4. **Regularly rotate API keys** and database credentials

## 🚀 Post-Deployment

1. **Test the application:**

   - Visit your Render URL
   - Try uploading an image
   - Check if it appears correctly

2. **Monitor logs:**

   - Check Render dashboard for any errors
   - Monitor MongoDB Atlas for database connections

3. **Set up custom domain (optional):**
   - Go to Settings → Custom Domains
   - Add your domain name

## 📊 Performance Tips

1. **Enable auto-deploy** for continuous deployment
2. **Set up health checks** if needed
3. **Monitor resource usage** in Render dashboard
4. **Consider upgrading** to paid plan for better performance

---

**Your app should now be successfully deployed on Render! 🎉**
