# TextTrace Deployment Guide

This guide explains how to deploy TextTrace so it can be accessed on smartphones, tablets, laptops, and across the internet.

---

## 1. Quick Testing on Mobile (Local Wi-Fi)

To test TextTrace on your mobile phone right now without deploying to the cloud:
1. Make sure your PC and mobile phone are connected to the **same Wi-Fi network**.
2. Run `run.bat` on your PC.
3. Open Command Prompt on your PC and type `ipconfig`. Find your **IPv4 Address** (e.g., `192.168.1.15`).
4. On your mobile phone browser (Chrome, Safari), type:
   ```text
   http://192.168.1.15:5000/
   ```
5. TextTrace will open in mobile-optimized layout with full touch support and Dark/Light mode.

---

## 2. Free Cloud Deployment on Render (Recommended)

[Render](https://render.com) offers free web service hosting for Python web apps.

### Steps:
1. Push your TextTrace repository to **GitHub** (or GitLab).
2. Go to [render.com](https://render.com) and sign in.
3. Click **New +** > **Web Service**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Name**: `texttrace`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free`
6. Click **Deploy Web Service**.
7. In ~2 minutes, Render will provide a live HTTPS URL (e.g., `https://texttrace.onrender.com`) that works on any phone, tablet, or PC worldwide!

---

## 3. Deployment on Railway

1. Sign in to [railway.app](https://railway.app).
2. Click **New Project** > **Deploy from GitHub repo**.
3. Select the TextTrace repository.
4. Railway automatically detects the `Procfile` and `requirements.txt` and starts `gunicorn app:app`.
5. Under Settings > Networking, click **Generate Domain** to get a public URL.

---

## 4. Docker Deployment

If you prefer deploying with Docker (for AWS, Google Cloud Run, Azure, or DigitalOcean):

```bash
# Build the Docker image
docker build -t texttrace .

# Run the container locally
docker run -p 5000:5000 texttrace
```

Open `http://localhost:5000` in your browser.

---

## Mobile Features Included
- **Adaptive Layout**: Stacks document cards, comparison panes, and controls into single-column cards on smaller screens.
- **Thumb-Friendly Actions**: Full-width "Compare Documents" primary CTA button on mobile viewports.
- **Touch-Friendly Controls**: Minimum 44px tap targets for theme toggle and preset chips.
- **Responsive Charts**: Doughnut and bar charts adapt dynamically to mobile widths.
- **PWA Meta Tags**: iOS status bar support, mobile web app capability, and adaptive browser address bar colors.
