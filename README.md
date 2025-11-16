🌙 MoneyCouch — Full-Stack AI-Powered Assistant

MoneyCouch is a full-stack project that blends a stylish dark-themed frontend with a powerful AI-driven backend.
The system uses modern technologies to provide smart recommendations, structured financial insights, and a polished user experience.

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

🧹 Strong JSON cleaning and validation

📡 Stable API endpoints

🗃️ MongoDB support for storing history

📝 Full logging (Console + Debug)

🔐 CORS configured for frontend communication

📁 Project Structure

SoulsTeam

backend/TestApi/
Controllers
Services
Models
Program.cs

src/ (React frontend)
components
pages
App.tsx
main.tsx

public

package.json

vite.config.ts

🧰 Technologies

Frontend:

⚛️ React

⌨️ TypeScript

⚡ Vite

🎨 lucide-react icons

🎛️ Modern component structure

Backend:

🧩 .NET 8

🚀 C# Web API

🗄️ MongoDB

🤖 Featherless AI

📘 Swagger documentation

🚀 Getting Started

Clone the repository:
git clone https://github.com/oCMEXo/SoulsTeam

cd SoulsTeam

Frontend setup:

Install dependencies: npm install

Install icon library: npm install lucide-react

Start development server: npm run dev
Frontend runs at: http://localhost:5173

Backend setup (.NET):

Go to backend folder: cd backend/TestApi

Restore dependencies: dotnet restore

Run backend: dotnet run
Backend runs at: http://localhost:5032

🌐 API Endpoints

/ai/ask?prompt=...
Returns structured AI-generated JSON.

/ai/history
Returns saved chat history from MongoDB.

📦 Example AI Response includes:

🧠 summary — quick explanation

🛍️ original — main selected option

🔄 alternatives — better or cheaper options with:
💵 savings
📉 savingsPercent
⭐ rating
🎁 extraBenefit
🚚 deliveryTime

🔐 Environment Variables

Create appsettings.json in backend/TestApi:

{
"Featherless": { "ApiKey": "YOUR_API_KEY", "Model": "MODEL_NAME" },
"MongoDb": { "ConnectionString": "mongodb://localhost:27017", "DatabaseName": "SoulsTeamDb" }
}

📌 Project Status

The project is fully functional locally.
Frontend and backend communicate correctly.
AI integration and JSON mapping are stable and reliable.

🤝 Contributing

Ideas, improvements, and pull requests are welcome!
Help improve UI, AI logic, or backend stability.

⭐ Support the Project

If you like SoulsTeam — give it a star on GitHub! ⭐
