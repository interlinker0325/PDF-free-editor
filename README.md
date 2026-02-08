# 🧭Adlyceum : Online PDF Editor [Project ID: P-364]
Ai based online **free pdf editor** to cut the chase for users and edit efficiently according to their needs using **openAI** and mathpix, **langchain**, **jodit editor**.
When users upload the pdf, it is converted into a text file transfer to the openAI to detect the mistake section like outdated terms and grammatical issues.
This mistake hightlighted with the red border to the dashboard to edit effiiciently.

📚 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contact](#contact)

## 🧩 About {#about}
The motivation behind this project was to address the tediousness and limitations of editing PDF files online. Many existing tools lack advanced error detection, intelligent correction, or a smooth editing experience. This online PDF editor leverages AI to automatically find and highlight mistakes in your documents, enabling hassle-free edits and improvements. The key goals were to create a user-friendly, fast, and powerful platform that streamlines document refinement and ensures high-quality output with minimal effort from users.

## ✨ Features {#feature}
1. Upload and download PDF files easily.
2. Detect document mistakes automatically using AI (OpenAI).
3. Seamlessly edit your PDF online with the built-in Jodit editor.

## 🧠 Tech Stack {#tech-stack}
Languages: Python, JavaScript, TypeScript
Frameworks: Next, Flask
Database: DatoCMS database, MongoDB
Tools: Docker, GitHub Actions, Jodit Editor

## ⚙️ Installation {#installation}
- Clone the repository
```bash
  git clone https://github.com/interlinker0325/PDF-free-editor
```
- Navigate to the project directory
```bash
  cd PDF-free-editor
```
- Install dependencies
```bash
  npm install   
```

## 🚀 Usage {#usage}
# Start the development server
```bash
  npm start    
```
Then open your browser and go to:
👉 [http://localhost:3000](http://localhost:3000)

## 🧾 Configuration {#configuration}
Describe any required environment variables or configuration options, for example:

Create a .env file with:
```
NEXT_PUBLIC_DATOCMS_API_TOKEN=
DATOCMS_API_TOKEN=
NEXT_PUBLIC_DATOCMS_STORAGE_URL=""
NEXT_PUBLIC_COURSE_ID=
ENTRY_MODEL_ID=
SECTION_MODEL_ID=
PORT=3000

# SECURITY
SECRET_COOKIE_PASSWORD=

# WINDOWS SERVER
NEXT_PUBLIC_WINDOWS_SERVER_URL="https://adlyceum.com"
```


## 🖼 Screenshots {#screenshots}
- pdf, microsoft word, google docs, text file

  https://github.com/user-attachments/assets/65ea27d6-4454-4c7f-8206-e3db84afef98

## detect the mistake like this.
  - using openAI

## You can edit using Ai automatically
  https://github.com/user-attachments/assets/3c959f76-914c-47cf-9ecc-3d3a6a0a6154

## edit the mistake using the jodit editor
  - integrate jodit editor for freely.
  
  https://github.com/user-attachments/assets/99fbd187-4719-4acd-bcad-81e137df6a75

## 📜 API Documentation : {#api-documentation}
https://docs.mathpix.com/


## 📬 Contact {#contact}
Author: interlinker0325\
Email: fenrow325@gmail.com\
GitHub: @interlinker0325\
Website/Portfolio: https://adlyceum.com

## 🌟 Acknowledgements
Collaborator : https://github.com/andresfelipe9619, https://github.com/Raza118041, https://github.com/CriistiianDM
