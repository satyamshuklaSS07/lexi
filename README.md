# 📖 Lexi – Dictionary & Word Lookup App

A modern and interactive dictionary web app that lets users search English words and instantly explore their meanings, pronunciation, examples, and synonyms.

🔗 **Live Demo:** https://lexi-dbcc.vercel.app/

💻 **GitHub Repository:** https://github.com/satyamshuklaSS07/lexi

---

## ✨ Features

- 🔎 Search any English word
- 📚 Multiple meanings and definitions
- 🏷️ Meanings grouped by part of speech
- 🔤 Phonetic pronunciation
- 🔊 Pronunciation audio when available
- 💬 Example sentences
- 🔄 Synonyms when available
- ⚡ Fast API-based search
- ⌨️ Debounced live search
- ❌ User-friendly error handling
- 📱 Fully responsive design
- 🎨 Modern animated 3D/glass-style UI

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- Free Dictionary API
- Vercel

---

## 🔌 API Used

This project uses the **Free Dictionary API** to fetch real-time dictionary information.

### API Endpoint

```text
https://api.dictionaryapi.dev/api/v2/entries/en/{word}
 ⚙️ How It Works
1. Enter an English word in the search box.
2. Lexi sends a request to the Free Dictionary API.
3. The API returns the word information in JSON format.
4. JavaScript processes the API response.
5. Definitions and meanings are displayed according to their part of speech.
6. Phonetics, examples and synonyms are shown when available.
7. If pronunciation audio is available, users can play it.
8. If the word is not found, a user-friendly error message is displayed.
📂 Project Structure
lexi/
│
├── index.html
├── style.css
├── script.js
└── README.md

🚀 Run Locally
1. Clone the repository
git clone https://github.com/satyamshuklaSS07/lexi.git

2. Open the project folder
cd lexi

3. Run the project
Open index.html in your browser.
An internet connection is required for fetching live dictionary data from the API.

🎯 Main Functionalities
🔎 Word Search
Users can search for any English word using the search box.
📚 Multiple Definitions
The application displays all available definitions returned by the API.
🏷️ Part of Speech
Definitions are grouped according to categories such as:
- Noun
- Verb
- Adjective
- Adverb
- Pronoun
- Preposition
🔊 Pronunciation
If the API provides an audio URL, users can click the audio button to hear the pronunciation.
💬 Examples
Example sentences are displayed when they are available in the API response.
🔄 Synonyms
Synonyms are displayed when provided by the API.
❌ Error Handling
If a word is not found or the API request fails, the application displays a clear error message.
📱 Responsive Design
Lexi is designed to work smoothly across different screen sizes:
- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet
🎨 UI & Design
The project includes:
- Dark modern interface
- Glassmorphism cards
- Animated background
- Gradient text
- 3D-style effects
- Smooth transitions
- Hover animations
- Responsive layout
🧠 What I Learned
While building this project, I practiced:
- HTML5
- CSS3
- JavaScript
- REST API integration
- Fetch API
- JSON data handling
- Async/Await
- DOM manipulation
- Error handling
- Audio playback
- Responsive web design
- Git & GitHub
- Vercel deployment
💡 Interview Questions
1. How would you display multiple meanings for one word?
I would loop through the meanings array returned by the API and display each part of speech with all the available definitions.
2. How would you handle a word that isn't found?
I would check the API response status. If the request fails or the word does not exist, I would display a user-friendly error message asking the user to check the spelling or try another word.
3. How would you play an audio pronunciation from a URL?
I would take the audio URL returned by the API and use JavaScript's Audio object or an HTML <audio> element to play the pronunciation when the user clicks the audio button.
4. How does the Fetch API work in this project?
The Fetch API sends an HTTP request to the Free Dictionary API. The response is converted into JSON using response.json(). JavaScript then processes the returned data and dynamically displays the required information on the webpage.
🌐 Project Links
🔗 Live Demo
https://lexi-dbcc.vercel.app/
💻 GitHub Repository
https://github.com/satyamshuklaSS07/lexi
📌 Project Information
Project Name: Lexi – Dictionary & Word Lookup App
Developer: Satyam Shukla
Type: Web Development Project
Frontend: HTML5, CSS3, JavaScript
API: Free Dictionary API
Deployment: Vercel
👨‍💻 Developer
Satyam Shukla
Built as a web development project to practice frontend development, API integration, JavaScript and responsive UI design.
⭐ If you like this project, feel free to explore the repository and try the live demo.
