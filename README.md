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

## API Routes

### **Banglish-to-Bangla Conversion**
- **Route**: `POST /api/generate`
- **Request Body**:
  ```json
  {
    "inputText": "onek din dhore ononto tar babar sathe bibhinno science fair-e jay."
  }
  ```
- **Response**:
  ```json
  {
    "translatedText": "অনেক দিন ধরে অনন্ত তার বাবার সাথে বিভিন্ন সায়েন্স ফেয়ারে যায়।"
  }
  ```


- **Generate Caption and Title**:
  **Request Body**:
  ```json
  {
    "inputText": "অনেক দিন ধরে অনন্ত তার বাবার সাথে বিভিন্ন সায়েন্স ফেয়ারে যায়, যেখানে নানা ধরনের আবিষ্কার দেখতে পায়। একবার একটি রকেট দেখে অনন্ত আরও বেশি উত্তেজিত হয়ে বলে, \u201cওয়াও, এটা তো অনেক বড় রকেট! আমি কি এমন রকেট ওড়াতে পারবো?\u201d তার বাবা হেসে বলেন, \u201cহ্যাঁ রে অনন্ত, তুমি যদি মন দিয়ে পড়াশোনা করো, তবে একদিন যখন বড় হবে, তুমি পাইলট বা প্রকৌশলী—যেটা ইচ্ছে তাই হতে পারবে।\u201d"
  }
  ```
  **Response**:
  ```json
  {
    "title": "অনন্তের রকেট সপনা",
    "caption": "একটি সায়েন্স ফেয়ারে রকেট দেখে অনন্ত উত্তেজিত হয়ে ওঠে এবং তার বাবা তাকে পাইলট বা প্রকৌশলী হওয়ার সম্ভাবনা সম্পর্কে বলেন।"
  }

### **Generate PDF**
- **Route**: `POST /generate-pdf`
- **Request Body**:
  ```json
  {
    "title": "আজকের গল্প",
    "caption": "আজকের গল্পটি অনন্তের স্বপ্ন নিয়ে।",
    "content": "আজকের গল্পটি অনন্তের স্বপ্ন নিয়ে।"
  }
  ```
- **Response**: Returns a downloadable PDF.

### **RAG Query**
- **Route**: `POST /rag-query`
- **Request Body**:
  ```json
  {
    "question": "অনন্তের স্বপ্ন কী ছিল?"
  }
  ```
- **Response**:
  ```json
  {
    "answer": "অনন্ত পাইলট হতে চেয়েছিল।"
  }
  ```

  ## `GET /api/admin/analytics`

### Success Response:
- **Status Code:** `200 OK`
- **Response Body (example):**
  ```json
  {
    "totalUsers": 1200,
    "totalContents": 350,
    "totalPendingContributions": 45,
    "totalApprovedContributions": 200
  }
  ```

### Error Response:
- **Status Code:** `500 Internal Server Error`
- **Response Body (example):**
  ```json
  {
    "error": "Internal server error"
  }
  ```

---

## `GET /chat/sessionid/{sessionId}`

### Success Response:
- **Status Code:** `200 OK`
- **Response Body (example):**
  ```json
  [
    {
      "userId": "user_123",
      "sessionId": "abc123",
      "createdAt": "2025-01-04T14:00:00Z",
      "role": "user",
      "content": "Hello, how can I help you?"
    },
    {
      "userId": "assistant_456",
      "sessionId": "abc123",
      "createdAt": "2025-01-04T14:01:00Z",
      "role": "assistant",
      "content": "Hi, I need help with my order."
    }
  ]
  ```

### Error Responses:
- **Status Code:** `401 Unauthorized`
  - **Response Body (example):**
    ```json
    {
      "error": "SessionId was not provided"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body (example):**
    ```json
    {
      "error": "Something went wrong. Please try again later."
    }
    ```

---

## `GET /generate`

### Description:
This endpoint retrieves all unique session IDs associated with a specific user. It is useful for fetching the list of sessions a user has participated in.

### Request:
- **Method:** `GET`
- **Authentication:** Requires authentication via Clerk. The `userId` is fetched using the `Clerk.getAuth()` function, ensuring the request is made by an authenticated user.
- **Headers:**
  ```
  Authorization: Bearer <user_jwt_token>
  ```

### Success Response:
- **Status Code:** `200 OK`
- **Response Body (example):**
  ```json
  {
    "sessions": [
      "session123",
      "session456",
      "session789"
    ]
  }
  ```

### Error Response:
- **Status Code:** `500 Internal Server Error`
- **Response Body (example):**
  ```json
  {
    "error": "Something went wrong. Please try again later."
  }
  ```

---

## `POST /generate`

### Description:
This endpoint allows a user to send a message in an existing session. The request includes the session ID, message content, and the role (either user or assistant).

### Request:
- **Method:** `POST`
- **Authentication:** Requires authentication via Clerk. The `userId` is fetched using the `Clerk.getAuth()` function.
- **Headers:**
  ```
  Authorization: Bearer <user_jwt_token>
  ```
- **Request Body:**
  ```json
  {
    "sessionId": "session123",
    "role": "user",
    "content": "How can I help you today?"
  }
  ```

### Success Response:
- **Status Code:** `200 OK`
- **Response Body (example):**
  ```json
  {
    "userId": "user_123",
    "sessionId": "session123",
    "createdAt": "2025-01-04T14:05:00Z",
    "role": "user",
    "content": "How can I help you today?"
  }
  ```

### Error Responses:
- **Status Code:** `401 Unauthorized`
  - **Response Body (example):**
    ```json
    {
      "error": "SessionId or message was not provided"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body (example):**
    ```json
    {
      "error": "Something went wrong. Please try again later."
    }
    


---

## \ud83d\udda5\ufe0f Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bongolipi.git
   cd bongolipi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Navigate to `http://localhost:3000` in your browser to access the application.
