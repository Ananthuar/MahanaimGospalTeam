
# **Mahanaim Gospel Team — Website**

A modern, animated, multilingual website for the **Mahanaim Gospel Team** and **Mahanaim Worship Center, Chelakkara**.
This repository contains the **public website** (team, church, pastor, programmes, events, contact) and an **admin system** powered by **Firebase Firestore** for updating frequently changing content such as events and programmes.

---

# 🌐 **What the hosted site includes**

When deployed on Firebase Hosting (or any static host), the website provides:

---

## 🎬 **Cinematic Intro Page**

* `intro.html` — A glowing animated logo intro that fades into the main site.

---

## 👥 **Public Pages**

### **1. `index.html` — Main Landing Page**

Includes:

* Hero section with animated background
* About the team
* Latest **Events** (loaded dynamically from Firestore)
* Latest **Programmes** (also dynamic)
* Social media buttons (YouTube, WhatsApp, Email)
* Contact form (EmailJS-powered)
* Fully responsive layout
* Malayalam/English language switcher

---

### **2. `church.html` — Mahanaim Worship Center**

Contains:

* Church introduction
* Service times
* Pastor teaser
* Embedded 360° Google Map
* Beautiful page-specific animations

---

### **3. `pastor.html` — Pastor Profile**

Includes:

* Bio of **Pastor Jimshu Varghese (Married — 3 children)**
* Mission & Calling
* Contact details
* Pastor image
* Gospel-themed fire ember animations

---

### **4. `programmes.html` — Programmes (Dynamic)**

* Loaded from Firestore
* Shows all activities, workshops, worship nights, and outreach work
* Scroll animations & responsive grid layout

---

### **5. `events.html` — Events (Dynamic)**

* All events loaded from Firestore
* Includes creative empty states if no events exist
* Animated cards with date, time, place & details

---

# 🌍 **Multilingual UI (English & Malayalam)**

Powered by runtime translation:

```
assets/i18n/en.json
assets/i18n/ml.json
```

Every text element uses:

```
data-i18n="key_name"
```

Switch languages instantly without reloading.

---

# 🔥 **Animations & Graphics**

Each page has unique animations:

* **Index:** Floating bubble background
* **Pastor Page:** Fire embers + glowing waves
* **Church Page:** Glow waves + parallax
* **Programmes Page:** Wave banner animations
* **Intro Page:** Logo pulse animation

Buttons have:

* Ripple effect
* Tilt 3D hover
* Pulse animation

---

# 📡 **Dynamic Content via Firebase Firestore**

Firestore collections:

```
events/
   eventID/
      title:
      date:
      time:
      location:
      description:

programmes/
   programmeID/
      title:
      date:
      description:
```

The homepage automatically loads the latest items and the full lists appear on `events.html` and `programmes.html`.

---

# 🔐 **Admin Panel**

Admin UI stored in:

```
admin/
   index.html
   admin.js
   login.html
```

Features:

* Firebase Authentication (Google Sign-In)
* Only authorized users with `admin=true` claim can edit content
* Add / Edit / Delete **Events**
* Add / Edit / Delete **Programmes**

Admin actions follow Firestore security rules.

---

# 📂 **Repository Structure**

```
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
│   │   └── firebase-config.js
│   ├── i18n/
│   │   ├── en.json
│   │   └── ml.json
│   └── images/
│       ├── logo.jpg
│       └── pastor.jpg
|── content/          
│   └── events.json
|    
├── LICENSE
└── README.md
```

---

# 🚀 **Deploying to Firebase Hosting**

1. Install Firebase CLI:

   ```sh
   npm install -g firebase-tools
   ```

2. Login:

   ```sh
   firebase login
   ```

3. Initialize:

   ```sh
   firebase init
   ```

   Choose **Hosting**, use `./` as public directory.

4. Deploy:

   ```sh
   firebase deploy
   ```

Your live site will be available instantly.

---

# 📬 **Contact Form Setup (EmailJS)**

In `assets/js/email-config.js`:

```js
emailjs.init("YOUR_PUBLIC_KEY");

const EMAILJS_SERVICE = "your_service_id";
const EMAILJS_TEMPLATE = "your_template_id";
```

Messages go directly to:

**[mahanaimgospalteam@gmail.com](mailto:mahanaimgospalteam@gmail.com)**

---

# 📄 **License**

This project is released under the **MIT License**.
You may use, modify, and distribute it with attribution.

---

# 🙏 **Acknowledgements**

* Designed for **Mahanaim Gospel Team**
* Powered by God’s grace
* Malayalam + English Support
* Animation-rich modern design
* “Let your light shine before others.” — Matthew 5:16

---