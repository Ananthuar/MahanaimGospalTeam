# **Mahanaim Gospel Team — Website**  

<p align="center">
  <img src="assets/images/logo.jpg" width="120" alt="Mahanaim Logo"/>
</p>

<p align="center">
  <b>A modern, animated, multilingual church website</b><br>
  Mahanaim Gospel Team & Mahanaim Worship Center, Chelakkara
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Firebase-Hosting-orange?style=for-the-badge&logo=firebase"/>
  <img src="https://img.shields.io/badge/Multilingual-EN%20%7C%20ML-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

---

## 🚀 Live Demo
> *(Add your deployed Firebase link here)*  
👉 https://mahanaimgospelteamwebsite.web.app/

---

# **Mahanaim Gospel Team — Website**  
A modern, animated, multilingual website for the **Mahanaim Gospel Team** and **Mahanaim Worship Center, Chelakkara**.  

This repository contains the **public website** (team, church, pastor, programmes, contact) and an **admin system** powered by **Firebase Firestore** for updating frequently changing content.  

---

# 🌐 **What the hosted site includes**

When deployed on Firebase Hosting (or any static host), the website provides:

---

## 🎬 **Cinematic Intro Page**

* [intro.html](cci:7://file:///home/ananthu/.gemini/antigravity/scratch/MahanaimGospalTeam/intro.html:0:0-0:0) — A glowing animated logo intro that fades into the main site.

---

## 👥 **Public Pages**

### **1. [index.html](cci:7://file:///home/ananthu/.gemini/antigravity/scratch/MahanaimGospalTeam/index.html:0:0-0:0) — Main Landing Page**

Includes:

* Hero section with an animated gradient glow background  
* About the team  
* Latest **Programmes** (loaded dynamically)  
* **Smart YouTube Integration:** Custom IFrame API wrapper that beautifully detects when a livestream is unavailable and swaps the player for an animated "Currently Offline" badge.  
* **Interactive Social Buttons:** Custom "Coming Soon!" animations rather than simple dead links.  
* Responsive, mobile-first glassmorphism layout  
* Contact form (EmailJS-powered)  

---

### **2. [church.html](cci:7://file:///home/ananthu/.gemini/antigravity/scratch/MahanaimGospalTeam/church.html:0:0-0:0) — Mahanaim Worship Center**

Contains:

* Church introduction & Service times  
* Pastor teaser  
* Embedded 360° Google Map  
* Beautiful page-specific styling  

---

### **3. [pastor.html](cci:7://file:///home/ananthu/.gemini/antigravity/scratch/MahanaimGospalTeam/pastor.html:0:0-0:0) — Pastor Profile**

Includes:

* Bio of **Pastor Jimshu Varghese (Married — 3 children)**  
* Mission & Calling  
* Contact details  
* Pastor image  

---

### **4. [programmes.html](cci:7://file:///home/ananthu/.gemini/antigravity/scratch/MahanaimGospalTeam/programmes.html:0:0-0:0) — Programmes (Dynamic)**

* Loaded from Firestore  
* Shows all activities, workshops, worship nights, and outreach work  
* Scroll animations & responsive grid layout  

---

# 🌍 **Multilingual UI (English & Malayalam)**

Powered by a bespoke, high-quality JavaScript runtime translation system:

```text
assets/js/i18n.js

Every translatable text element uses:

html
<span data-i18n="key_name">Text</span>

Users can click the toggle in the header (EN | ML) to switch languages instantly without reloading.  
Language preferences are saved securely in the browser's localStorage so the user's choice persists across sessions.
```

🔥 Animations & Graphics  

Each page has unique micro-interactions:

Index: Floating glow backgrounds, YouTube offline pulsing scanner.  
Global: Social media "click-pop" Toast badges (ഉടൻ വരുന്നു!).  
Buttons: Ripple effect, mobile-responsive layout shifting, and soft gradients.  

📡 Dynamic Content via Firebase Firestore  

Firestore collections:

```text
programmes/
   programmeID/
      title:
      date:
      description:
```

The homepage automatically loads the latest items, and the full lists appear on  
`programmes.html`.

---

🔐 Admin Panel  

Admin UI stored in:

```text
admin/
   index.html
   admin.js
   login.html
```

Features:

* Firebase Authentication (Google Sign-In)  
* Only authorized users with admin=true claim can edit content  
* Add / Edit / Delete Programmes  
* Admin actions securely follow Firestore rules.  

---

📂 Repository Structure  

```text
mahanaim_gospel_team/
│
├── intro.html
├── index.html
├── church.html
├── pastor.html
├── programmes.html
│
├── admin/
│   ├── index.html
│   ├── login.html
│   ├── admin.js
│   └── styles.css
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── buttons.js
│   │   ├── email-config.js
│   │   ├── firebase-config.js
│   │   └── i18n.js
│   └── images/
│       ├── logo.jpg
│       └── pastor.jpg
│
├── LICENSE
├── firebase.json
└── README.md
```

---

🚀 Deploying to Firebase Hosting  

Install Firebase CLI:

```sh
npm install -g firebase-tools
```

Login:

```sh
firebase login
```

Deploy:

```sh
firebase deploy --only hosting
```

Your live site will be available instantly.  

---

📬 Contact Form Setup (EmailJS)  

In `assets/js/email-config.js`:

```js
emailjs.init("YOUR_PUBLIC_KEY");

const EMAILJS_SERVICE = "your_service_id";
const EMAILJS_TEMPLATE = "your_template_id";
```

Messages go directly to:  
**mahanaimgospalteam@gmail.com**

---

📄 License  

This project is released under the MIT License.  
You may use, modify, and distribute it with attribution.  

---

🙏 Acknowledgements  

Designed for Mahanaim Gospel Team  
Powered by God’s grace  
Dedicated  

Custom Malayalam & English localizations  
Animation-rich modern design  

“Let your light shine before others.” — Matthew 5:16

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub — it helps others discover it!
