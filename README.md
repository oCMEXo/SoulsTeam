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

🔧 Requirements for Running MoneyCouch

To successfully run this project, you must have the following installed:

🧩 1. Required Software
✔ MUST HAVE:

Node.js v18+ or v20+

npm

.NET SDK 8.0 or 9.0 (my backend uses net8.0)

MongoDB Community Server or MongoDB Atlas

⭐ Optional but Recommended:

Visual Studio Code / JetBrains Rider

Git

🚀 Getting Started
🖥️ 1. Clone the repository
git clone https://github.com/oCMEXo/SoulsTeam
cd SoulsTeam

🎨 Frontend Setup

📥 Install dependencies:

npm install


🖼️ Install icon library:

npm install lucide-react


▶️ Start development server:

npm run dev


Frontend will run at:
➡ http://localhost:5173

🛠️ Backend Setup (.NET)

Move into backend folder:

cd backend/TestApi


Restore packages:

dotnet restore


Run backend:

dotnet run


Backend will run at:
➡ http://localhost:5032

or (Cloud Run):
➡ http://0.0.0.0:8080

🔐 Required appsettings.json

Create:

📄 backend/TestApi/appsettings.json

Paste this:

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

🌐 API Endpoints
🤖 1. AI Request
GET /ai/ask?prompt=your_text


Returns structured JSON with:

🧠 summary

🛍️ original

🔄 alternatives (with savings, rating, deliveryTime, etc.)

📜 2. History
GET /ai/history


Returns chat history stored in MongoDB.

📦 Example AI Response
{
  "summary": "...",
  "original": { ... },
  "alternatives": [
    {
      "name": "Burger King",
      "price": "9.90",
      "savings": "0.10",
      "rating": 4.5
    }
  ]
}


Backend guarantees valid JSON structure.

📌 Project Status

✔ Fully working locally
✔ Frontend & backend communicate properly
✔ AI integration stable
✔ JSON parsing reliable
✔ Mongo history optional (safe mode enabled)

🤝 Contributing

Pull requests, ideas, and improvements are welcome!
Help improve UI, AI logic, or backend performance.

⭐ Support the Project

If you like MoneyCouch, give the repository a ⭐ on GitHub!
