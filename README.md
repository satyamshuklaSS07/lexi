# 📖 Lexi – Dictionary & Word Lookup App

Lexi is a simple and interactive Dictionary & Word Lookup App that lets users search for English words and instantly get their meanings, phonetics, examples, synonyms, and pronunciation.

🔗 Live Demo: https://lexi-dbcc.vercel.app/

💻 GitHub: https://github.com/satyamshuklaSS07/lexi

---

## ✨ Features

- 🔎 Search for any English word
- ⚡ Real-time word lookup using an API
- 📚 Multiple meanings for a word
- 🏷️ Meanings grouped by part of speech
- 🔢 Multiple definitions for each meaning
- 🔊 Pronunciation audio when available
- 🗣️ Phonetic pronunciation
- 💬 Example sentences
- 🔗 Synonyms when available
- ❌ Error handling for words that are not found
- ⏳ Loading state while fetching data
- 📱 Fully responsive design
- 🌙 Modern dark UI
- ✨ Animated 3D and glassmorphism effects
- 🚀 Deployed on Vercel

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- Free Dictionary API
- Vercel

---

## 🌐 API Used

This project uses the Free Dictionary API to get information about searched words.

### API Endpoint

https://api.dictionaryapi.dev/api/v2/entries/en/

### Example

https://api.dictionaryapi.dev/api/v2/entries/en/hello

The API provides:

- Word
- Phonetics
- Audio pronunciation
- Parts of speech
- Definitions
- Examples
- Synonyms

---

## ⚙️ How It Works

1. The user enters a word in the search box.
2. JavaScript gets the entered word.
3. The Fetch API sends a request to the Free Dictionary API.
4. The API returns the word information.
5. JavaScript processes the response.
6. Lexi displays the meanings, definitions, examples, phonetics, synonyms, and pronunciation.
7. If the word is not found, an error message is displayed.

---

## 🔍 Search Functionality

Lexi supports:

- Search using the search button
- Live search while typing
- Debounced API requests

The live search waits for the user to stop typing before sending the API request. This helps reduce unnecessary API calls.

---

## 📚 Multiple Meanings

A word can have different meanings depending on its part of speech.

For example:

- Noun
- Verb
- Adjective
- Adverb

Lexi displays each part of speech separately and shows all available definitions under it.

---

## 🔊 Pronunciation

If the Dictionary API provides an audio pronunciation URL, Lexi displays a pronunciation button.

When the user clicks the button, JavaScript plays the pronunciation.

Example:

const audio = new Audio(audioUrl);
audio.play();

---

## ❌ Error Handling

If a word does not exist or the API request fails, Lexi displays a user-friendly error message.

Example:

"word" wasn't found.

Check the spelling and try another word.

This prevents the application from breaking when an invalid word is entered.

---

## 📁 Project Structure

lexi/
│
├── index.html
├── style.css
├── script.js
└── README.md

### index.html

Contains the main structure of the application.

### style.css

Contains:

- Layout
- Responsive design
- Animations
- Glassmorphism effects
- Buttons
- Cards
- Typography

### script.js

Contains:

- Search functionality
- Fetch API request
- API response handling
- Dynamic result rendering
- Audio pronunciation
- Error handling
- Live search

### README.md

Contains project documentation and information.

---

## 🚀 Run the Project Locally

### 1. Clone the repository

git clone https://github.com/satyamshuklaSS07/lexi.git

### 2. Open the project

cd lexi

### 3. Open the project

Open index.html directly in your browser.

You can also use the Live Server extension in VS Code.

---

## 💻 Fetch API

Lexi uses JavaScript's Fetch API to communicate with the Dictionary API.

Example:

fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word);

The response is converted into JSON:

const data = await response.json();

The application then extracts the required information and displays it on the webpage.

---

## 🧠 JavaScript Concepts Used

This project helped me practice:

- DOM Manipulation
- Event Listeners
- Async/Await
- Fetch API
- Promises
- JSON
- Error Handling
- Array Methods
- Template Literals
- Dynamic HTML Rendering
- Debouncing
- Audio API

---

## 🎨 UI & Design

Lexi uses a modern interface with:

- Glassmorphism cards
- 3D-style visual effects
- Smooth animations
- Responsive layout
- Interactive buttons
- Clean typography
- Dark theme

The design is optimized for desktop, laptop, tablet, and mobile screens.

---

## 📱 Responsive Design

The application works on:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

The layout automatically adjusts according to the screen size.

---

# 🎯 Interview Questions

## 1. How would you display multiple meanings for one word?

I would loop through the meanings array returned by the API. Each meaning contains a partOfSpeech and a list of definitions. I can display each part of speech separately and then loop through its definitions.

Example:

data.meanings.map(meaning => {
    console.log(meaning.partOfSpeech);
    console.log(meaning.definitions);
});

---

## 2. How would you handle a word that isn't found?

I would check the HTTP response using response.ok. If the response is not successful, I would throw an error and show a user-friendly message.

Example:

if (!response.ok) {
    throw new Error("Word not found");
}

Then I can handle the error using catch() or try...catch.

---

## 3. How would you play an audio pronunciation from a URL?

If the API provides an audio URL, I can create an Audio object in JavaScript and call the play() method.

Example:

const audio = new Audio(audioUrl);
audio.play();

This allows the user to listen to the pronunciation.

---

## 4. How does the Fetch API work in this project?

The Fetch API sends an HTTP request to the Dictionary API. The API returns JSON data containing information about the searched word.

Example:

const response = await fetch(apiUrl);
const data = await response.json();

The JavaScript code then uses this data to update the webpage dynamically.

---

## 📈 Future Improvements

Some features that can be added in the future:

- 🔐 User accounts
- ❤️ Save favorite words
- 📜 Search history
- 🌓 Light/Dark theme switcher
- 🌍 More language support
- 📊 Word learning statistics
- 📱 PWA support
- 🗂️ Personal vocabulary list

---

## ✅ Learning Outcomes

While building Lexi, I learned how to:

- Work with REST APIs
- Use the Fetch API
- Handle asynchronous JavaScript
- Work with JSON data
- Dynamically update HTML
- Handle API errors
- Add audio functionality
- Create responsive layouts
- Build a real-world frontend project

---

## 🌐 Project Links

### Live Website

https://lexi-dbcc.vercel.app/

### GitHub Repository

https://github.com/satyamshuklaSS07/lexi

### Deployment

Vercel

---

## 👨‍💻 Developer

Satyam Shukla

BCA / MCA Student  
Frontend & Full Stack Development Enthusiast

GitHub:

https://github.com/satyamshuklaSS07

---

## ⭐ Project

If you like this project, feel free to explore the repository and try the live application.

Built with HTML, CSS, JavaScript, and Fetch API.
