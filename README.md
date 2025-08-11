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
   git clone https://github.com/yourusername/charger-locator-app.git
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






# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

