# Mahanaim Gospel Team — Website

A small static website for the Mahanaim Gospel Team and Mahaniam Woship Center.
This repo contains the public site (pages for team, church, pastor & sermons) and
an admin UI that uses Firebase Firestore to manage frequently-changing content
(events, sermons, etc.) with authenticated, authorized editors.

---

## What the hosted site will look and behave like

When deployed to Firebase Hosting (or any static host) the site provides:

- **Public pages**
  - `index.html` — Team home page (about, social links, hero, events, gallery, contact).
  - `church.html` — Church-specific page (service times, ministries, pastor teaser).
  - `pastor.html` — Full pastor profile page with sermon embeds and transcripts.
  - `sermons.html` — Sermon index with YouTube embeds and optional audio.
- **Multilingual UI**
  - Language switcher (English / Malayalam) powered by `assets/i18n/{en,ml}.json`.
  - Elements marked with `data-i18n` are translated at runtime.
- **Dynamic events**
  - Public pages load events from **Firestore** (preferred) and fall back to `content/events.json`.
  - Events are displayed in a neat list (date, title, place, description).
- **Media**
  - YouTube embeds for sermons, optional local audio in `assets/audio/`.
  - Pastor image in `assets/images/pastor.jpg`.
- **Contact form**
  - Client-side validation & simulated send. (Replace with a real backend or Formspree to receive emails.)
- **Admin UI**
  - `admin/firestore_admin.html` (or `/admin/` if you copy it to `admin/index.html`) — sign-in with Google, create/edit/delete events stored in Firestore.
  - Writes to Firestore are protected by security rules: **only authenticated users with an `admin` custom claim may write**.

---

## Files & important paths

