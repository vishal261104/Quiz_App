# 🎯 Quiz App

A dynamic and interactive quiz application built with React that fetches questions from the Open Trivia Database API. Test your knowledge across multiple categories with an engaging user interface featuring dark mode, progress tracking, and celebration effects!

## ✨ Features

### 🎨 User Interface
- **Dark Mode Toggle** - Switch between light and dark themes with a floating toggle button
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Gradient Backgrounds** - Beautiful purple gradient theme with animated background patterns
- **Smooth Animations** - Polished transitions and hover effects throughout the app

### 🎮 Quiz Functionality
- **Category Selection** - Choose from 20+ trivia categories or select "All Categories" for random questions
- **30 Questions Per Quiz** - Each quiz contains 30 multiple-choice questions
- **Real-time Feedback** - Instant visual feedback showing correct (green) and wrong (red) answers
- **Progress Bar** - Track your progress through the quiz with a dynamic progress indicator
- **Fixed Navigation** - Next and Submit buttons remain accessible at the bottom-right corner

### 📊 Score Tracking
- **Current Score** - See your score for the current quiz
- **Last Score** - Track your previous quiz performance
- **Best Score** - Keep track of your highest score ever
- **Local Storage** - Scores persist across browser sessions
- **Celebration Effect** - 🎉 Confetti animation when you score above 25/30!

### 🎯 Smart Features
- **HTML Entity Decoding** - Questions and answers display correctly without encoding artifacts
- **Answer Shuffling** - Options are randomized for each question
- **Disabled State** - Can't change answers after selection
- **One-time Selection** - Each question can only be answered once

## 🛠️ Tech Stack

- **React** - JavaScript library for building user interfaces
- **React Hooks** - useState, useEffect for state management
- **Open Trivia Database API** - Question data source
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **Local Storage API** - Client-side data persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Usage

1. **Select a Category** - Choose from the dropdown menu or select "All Categories"
2. **Start the Quiz** - Click the "Start Quiz" button
3. **Answer Questions** - Click on your answer choice for each question
4. **Navigate** - Use the "Next" button to proceed or "Submit Quiz" to finish early
5. **View Results** - See your score, last score, and best score
6. **Restart** - Click "Restart Quiz" to try again with a new set of questions

## 📁 Project Structure

```
quiz-app/
├── public/
│   ├── index.html          # HTML template
│   ├── styles.css          # Main stylesheet with dark mode
│   ├── bg.jpg              # Background image
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── App.jsx         # Main app wrapper
│   │   ├── Quiz.jsx        # Quiz logic and state management
│   │   ├── QuestionCard.jsx # Individual question display
│   │   └── Result.jsx      # Results page with confetti
│   ├── App.js
│   ├── index.js            # React entry point
│   └── index.css           # Additional styles
├── package.json
└── README.md
```

## 🎨 Key Components

### Quiz.jsx
- Main component managing quiz state
- Fetches categories and questions from API
- Handles dark mode toggle
- Manages score tracking and local storage
- Controls quiz flow (start, next, submit)

### QuestionCard.jsx
- Displays individual questions and options
- Handles answer selection and validation
- Shows visual feedback for correct/incorrect answers
- Manages disabled state after answer selection

### Result.jsx
- Displays final score and statistics
- Shows confetti animation for high scores (>25)
- Provides option to restart the quiz

## 🎯 API Integration

This app uses the [Open Trivia Database API](https://opentdb.com/):
- **Categories Endpoint**: `https://opentdb.com/api_category.php`
- **Questions Endpoint**: `https://opentdb.com/api.php?amount=30&type=multiple&category={id}`

## 🌟 Features Breakdown

### Dark Mode
- Toggle button fixed at top-right corner
- Smooth theme transitions
- Persists through component re-renders
- Applies to entire application including:
  - Background gradients
  - Text colors
  - Button styles
  - Container backgrounds
  - Progress bar colors

### Score System
- **Current Score**: Calculated during quiz
- **Last Score**: Saved when quiz ends
- **Best Score**: Updated if current score exceeds it
- All scores stored in browser's Local Storage

### Confetti Animation
- Triggers automatically when score > 25
- 50 animated confetti pieces
- Random colors and positions
- Smooth falling animation with rotation

## 🔧 Customization

### Modify Number of Questions
In `Quiz.jsx`, change the API call:
```javascript
fetch(`https://opentdb.com/api.php?amount=30&type=multiple${categoryParam}`)
// Change amount=30 to your desired number
```

### Adjust Confetti Threshold
In `Result.jsx`, modify the condition:
```javascript
const highScore = props.score > 25; // Change 25 to your threshold
```

### Change Theme Colors
Edit `styles.css` gradients:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Modify colors as needed */
```

## 🐛 Known Issues

- Questions load fresh on every quiz start (no caching)
- No timer functionality
- Cannot review answers after submission

## 🚀 Future Enhancements

- [ ] Add timer for each question
- [ ] Implement difficulty levels
- [ ] Add question review before submission
- [ ] Create leaderboard functionality
- [ ] Add sound effects
- [ ] Implement quiz history
- [ ] Add share score feature
- [ ] Progressive Web App (PWA) support

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing free trivia questions
- React community for excellent documentation
- All contributors and users of this project

## 📧 Contact

For questions or feedback, please open an issue on the GitHub repository.

---

**Built with ❤️ using React**
