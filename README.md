🌙 MoneyCouch — Full-Stack AI-Powered Assistant

MoneyCouch is a full-stack project that blends a stylish dark-themed frontend with a powerful AI-driven backend.
The system uses modern technologies to provide smart recommendations, structured financial insights, and a polished experience.

✨ Features
🖥️ Frontend (React + TypeScript + Vite)

🎨 Dark, modern UI

🗂️ Category-based item search (food, clothes, groceries, coffee)

🤖 AI-powered suggestions and price comparisons

🛒 Dynamic shopping cart with automatic savings calculation

🎯 Smart filters (healthy, fast, traditional, budget, premium)

🔍 Full JSON response viewer for debugging

🎬 Smooth transitions and animations

⚙️ Backend (C# .NET Web API)

🤖 Featherless AI API integration

🧹 Strong JSON cleaning + validation

📡 Stable API endpoints

🗃️ MongoDB support for storing history

📝 Full logging (Console + Debug)

🔐 CORS configured for frontend communication

📁 Project Structure

SoulsTeam
┣ 📦 backend/
┃ ┗ TestApi/
┃ ┣ Controllers/
┃ ┣ Services/
┃ ┣ Models/
┃ ┗ Program.cs
┣ 🎨 src/ (React frontend)
┃ ┣ components/
┃ ┣ pages/
┃ ┣ App.tsx
┃ ┗ main.tsx
┣ 📂 public/
┣ 📜 package.json
┗ ⚡ vite.config.ts

🧰 Technologies
Frontend

⚛️ React

⌨️ TypeScript

⚡ Vite

🎨 lucide-react icons

🎛️ Modern component structure

Backend

🧩 .NET 9

🚀 C# Web API

🗄️ MongoDB

🤖 Featherless AI

📘 Swagger documentation

🚀 Getting Started
🔧 1. Clone the repository

git clone https://github.com/oCMEXo/SoulsTeam

cd SoulsTeam

🖥️ Frontend Setup

📥 Install dependencies:
npm install

🖼️ Install icon library:
npm install lucide-react

▶️ Start development server:
npm run dev

Frontend starts at: http://localhost:5173

🛠️ Backend Setup (.NET)

Go to the backend folder:
cd backend/TestApi

Restore dependencies:
dotnet restore

Run backend server:
dotnet run

Backend runs at: http://localhost:5032

🌐 API Endpoints
🤖 /ai/ask?prompt=...

Sends a request to the AI and returns structured JSON.

📜 /ai/history

Returns chat history stored in MongoDB.

📦 Example AI Response

The AI returns:

🧠 summary — quick explanation

🛍️ original — main option user selected

🔄 alternatives — cheaper/better options with:

💵 savings

📉 savingsPercent

⭐ rating

🎁 extraBenefit

🚚 deliveryTime

Backend ensures the JSON matches the expected structure.

🔐 Environment Variables

Create appsettings.json in backend/TestApi:

{
"Featherless": {
"ApiKey": "YOUR_API_KEY",
"Model": "MODEL_NAME"
},
"MongoDb": {
"ConnectionString": "mongodb://localhost:27017",
"DatabaseName": "SoulsTeamDb"
}
}

📌 Project Status

The project is fully working locally.
Both backend and frontend communicate correctly.
AI integration and JSON mapping work reliably.

🤝 Contributing

Ideas, improvements, and pull requests are welcome!
Help improve UI, AI logic, or backend stability.

⭐ Support the Project

If you like SoulsTeam — give it a star on GitHub! ⭐
