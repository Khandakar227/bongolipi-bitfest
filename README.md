# Bongolipi (বঙ্গলিপি)

**Bongolipi** is a powerful web application designed to simplify the conversion of Banglish (Bengali text written in the English alphabet) into Bangla. Alongside seamless Banglish-to-Bangla translation, the application offers features like content management, user analysis through a dashboard, chatbot integration, search functionality, PDF export, real-time collaboration, and continuous learning to enhance translation accuracy over time.

---

## ✨ Features

### 🔄 **Banglish to Bangla Conversion**
- Real-time or on-demand Banglish-to-Bangla conversion.
- Allows users to correct translation errors.
- Utilizes a custom model to ensure accurate and contextually relevant translations.

### 🤖 **Chatbot**
- Understands Banglish or Bangla queries and provides responses in Bangla.
- Offers answers based on user-uploaded PDFs or saved data.
- We have implemented a multi-query approach in RAG (Retrieval-Augmented Generation) to ensure more accurate and contextually relevant results.
- Used LangSmith to test our opensource models results

### 📂 **Content Management**
- Manage and organize your uploaded content, including PDFs and text data.
- Easily edit, update, or delete your stored content for efficient handling.

### 📊 **User Analysis Dashboard**
- Provides insights into user behavior and usage patterns.
- Tracks Banglish-to-Bangla translation performance.
- Visualizes user activity with detailed metrics and charts.

### 🔍 **Search Functionality**
- Search uploaded PDFs or profiles using Banglish or Bangla text.
- Browse and discover publicly available content with advanced filters.

### 📂 **PDF Export**
- Write or edit Banglish or Bangla text and export it as a PDF document.
- AI-generated titles and descriptions for PDFs to save time.

### 🌐 **Real-Time Collaboration**
- Enables multiple users to work on a document simultaneously.
- Built using **Yjs** and **Lexical** for smooth real-time editing.

### 📈 **Continuous Learning**
- Incorporates user feedback to improve Banglish-to-Bangla translation accuracy.
- Enhances the model’s capabilities over time by analyzing user-provided data.

---

## 🚀 How It Works

1. **Banglish to Bangla Conversion**: Users input Banglish text, and the app converts it into Bangla using a custom-trained model.
2. **Chatbot**: Answers user queries in Bangla, powered by intelligent processing of Banglish and Bangla inputs.
3. **Content Management**: Organize and edit your text or PDF data efficiently.
4. **User Analysis Dashboard**: Gain insights into user activity and translation performance.
5. **Search Functionality**: Locate specific content easily using Banglish or Bangla keywords.
6. **PDF Export**: Write and edit text and save it as a PDF document.
7. **Real-Time Collaboration**: Collaborate with other users on the same document in real time.
8. **Continuous Learning**: Reviews and incorporates data to enhance the translation model’s performance over time.
9. 

---

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, Lexical
- **Backend**: Node.js, Yjs
- **Database**: MongoDB (or any NoSQL database)
- **Real-Time Collaboration**: Yjs, PubNub WebSocket
- **Analytics & Dashboard**: Chart.js, D3.js (or similar tools)
- **PDF Generation**: Custom PDF export functionality
- **Machine Learning**: Custom-trained Banglish-to-Bangla translation model

---

## 🖥️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bongolipi.git
   cd client
