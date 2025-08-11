# EV Charger Location Tracker

Architecture Diagram


<img width="384" height="443" alt="ev_charger_architecture" src="https://github.com/user-attachments/assets/7d68fea6-b0fa-4e9d-ad6a-8bce96b4df6d" />


## 📌 Project Overview

The **EV Charger Location Tracker Tool** is a full-stack web application designed to accurately capture the physical location of EV chargers.  
This ensures that field teams and future fleet operations have precise geolocation data, improving operational efficiency.

## 🛠 My Role & Contributions

I was responsible for building the application **end-to-end**, working closely with senior developers for technical guidance.  
Key features I implemented include:

- **Secure user sessions**: Unique one-time links sent via email with prefilled charger details.
- **Interactive map selection**: Choose current GPS location or search for a specific location.
- **Accuracy enforcement**: Selected location must be within 100 meters of the actual charger.
- **Time-limited access**: Sessions expire after 1 hour to prevent unauthorized use.
- **Clean, responsive UI** built with React + Tailwind CSS.
- **RESTful APIs & session logic** developed using Flask.
- **Geolocation & search integration** via Google Maps API.

## ✅ Result

The proof of concept was approved by the product team and became the foundation for further internal EV infrastructure tools.  
This project strengthened my expertise in:

- Full-stack development (React, Tailwind, Flask)
- Geolocation-based applications
- Cross-functional team collaboration
- End-to-end product delivery

---

## 📂 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: (Omitted due to NDA)
- **APIs**: Google Maps API (or equivalent)
- **Version Control**: Git
- **OS**: Linux, Windows

---

## 🚀 Installation (Code Review Only)

> ⚠ **Note:** This project is under NDA and **cannot be run in its current form** due to omitted environment variables, private keys, and configuration files.

1. Clone this repository  
   ```bash
   git clone https://github.com/yourusername/ev-charger-geolocation-tool.git
   ```

2. Explore the `client/` (frontend) and `server/` (backend) codebases.

3. Review the architecture diagram and code implementation for reference.

---

## 📜 NDA Disclaimer

This repository contains the original source code for the EV Charger Geolocation Tool, created as part of a professional engagement.

Due to NDA restrictions:
- API keys, configuration files, and environment settings are **not included**.
- Certain dependencies and external services have been removed.
- The project is **non-functional** as-is and is intended **for portfolio/code review purposes only**.
