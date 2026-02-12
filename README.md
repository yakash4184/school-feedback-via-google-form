# School Feedback via Google Form

A modern, responsive teacher feedback web app for Savitri Balika Inter College.  
It supports multi‑teacher feedback, guided ratings, and anonymous submissions.

## Features
- Multi‑teacher feedback flow with progress tracking
- Ratings for teaching quality, clarity, and support
- Anonymous submission to Google Forms (no server required)
- Modern UI with accessibility improvements
- Automated tests with Cypress
- CI pipeline with GitHub Actions

## Tech Stack
- HTML, CSS, JavaScript
- Cypress (E2E testing)
- ESLint + Prettier (code quality)
- Vercel (deployment)

## Live Demo
[school-feedback-via-google-form.vercel.app](https://school-feedback-via-google-form.vercel.app)

## Local Setup
```bash
npm install
npm run serve
```

Open `http://localhost:4173`.

## Run Tests
```bash
npm run test
```

## Lint / Format
```bash
npm run lint
npm run format
```

## Project Structure
```
.
├── index.html
├── style.css
├── script.js
├── teacher-feedback/
│   ├── feedback.html
│   ├── feedback.css
│   └── feedback.js
└── assets/teachers/
```

## Notes
- Update Google Form entry IDs in `teacher-feedback/feedback.js` if the form changes.
- Teacher list and photos are managed in `teacher-feedback/feedback.js`.

## Author
**Akash Yadav**  
[LinkedIn](https://www.linkedin.com/in/akash288)
