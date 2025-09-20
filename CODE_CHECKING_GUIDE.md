# 🔍 Code Checking & Build Commands Guide

## 📋 **Available Commands**

### **Build Commands:**

```bash
# Full build process (install + check)
npm run build

# Just check syntax without installing
npm run check

# Validate all code before deployment
npm run validate

# Pre-deployment check
npm run predeploy
```

### **Development Commands:**

```bash
# Start development server
npm run dev

# Start production server
npm start

# Check for linting (placeholder)
npm run lint
```

## 🚀 **For Render Deployment:**

### **Build Command:**

```bash
npm run build
```

This will:

1. Install all dependencies (`npm install`)
2. Check JavaScript syntax (`node --check`)
3. Verify all files are valid

### **Start Command:**

```bash
node index.js
```

## 🔧 **Manual Code Checking:**

### **1. Syntax Check:**

```bash
# Check individual files
node --check server.js
node --check index.js

# Check all JS files
node --check server.js && node --check index.js
```

### **2. Test Dependencies:**

```bash
# Install dependencies
npm install

# Check if all modules can be imported
node -e "console.log('Testing imports...'); import('./server.js')"
```

### **3. Test Environment Variables:**

```bash
# Run with debug output
npm run dev
# Check console for "Environment check:" output
```

### **4. Test Database Connection:**

```bash
# Start the app and check MongoDB connection
npm start
# Look for "MongoDB connected" message
```

## ✅ **Pre-Deployment Checklist:**

1. **Syntax Check:**

   ```bash
   npm run check
   ```

2. **Dependencies Check:**

   ```bash
   npm install
   ```

3. **Local Test:**

   ```bash
   npm run dev
   # Test file upload functionality
   ```

4. **Production Test:**
   ```bash
   npm start
   # Verify app starts without errors
   ```

## 🐛 **Common Issues & Solutions:**

### **Syntax Errors:**

```bash
# Check specific file
node --check server.js
# Fix any syntax errors shown
```

### **Import/Export Errors:**

```bash
# Test ES modules
node -e "import('./server.js').then(() => console.log('OK'))"
```

### **Environment Variables:**

```bash
# Check if .env file exists
ls -la | grep env
# Create .env file if missing
```

### **Dependencies:**

```bash
# Check if all dependencies are installed
npm list
# Install missing dependencies
npm install
```

## 🚀 **Render-Specific Commands:**

### **Build Command (in render.yaml):**

```yaml
buildCommand: npm run build
```

### **Start Command (in render.yaml):**

```yaml
startCommand: node index.js
```

## 📊 **Build Process Flow:**

1. **Render starts build**
2. **Runs `npm run build`**
3. **Installs dependencies (`npm install`)**
4. **Checks syntax (`npm run check`)**
5. **If successful, starts app (`node index.js`)**
6. **App connects to MongoDB**
7. **App is ready to serve requests**

---

**Use `npm run build` as your build command for Render! 🎉**
