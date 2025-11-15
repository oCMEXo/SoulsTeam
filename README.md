💸 MoneyCouch — Smart Assistant for Better Shopping Decisions

MoneyCouch is an AI-powered assistant that helps you find better prices, compare alternatives, and save money.
The project is built in a modern dark theme and includes a React frontend, .NET backend, and integration with Featherless AI.

Original design (Figma):
https://www.figma.com/design/GqKzJ7RQsaTL59GoO1zyYJ/Создание-сайта-в-темной-теме

🚀 Project Setup
1) Install frontend dependencies

npm i

2) Start the frontend (Vite)

npm run dev

Frontend will be available at:

http://localhost:5173

3) Install SVG icons (Lucide)

npm install lucide-react

🖥 Start the backend (.NET API)

Inside the backend directory run:

dotnet run

Backend runs on:

http://localhost:5032

Main API endpoints:

GET /ai/ask?prompt=
→ Sends query to the AI

GET /ai/history
→ Returns prompt/response history from MongoDB

🧠 Featherless AI Configuration

In appsettings.json:

"Featherless": {
"ApiKey": "YOUR_API_KEY",
"Model": "deepseek-chat"
}

🗄 MongoDB Configuration

"MongoDb": {
"ConnectionString": "mongodb://localhost:27017",
"DatabaseName": "MoneyCouchDB"
}

MongoDB is used to store request history.
You can disable this logic if needed.

🎨 Frontend Structure

src/
├─ components/
│ ├─ Demo.tsx — main UI, AI logic, cart
│ └─ ui/ — cards, buttons, badges
├─ App.tsx
├─ index.tsx
└─ styles/

✨ Features of MoneyCouch

✔ Category-based search (food, groceries, clothing, coffee)
✔ Smart filters (budget, healthy, fast, premium, traditional)
✔ Real-time price analysis using AI
✔ Best alternative selection (isRecommended)
✔ Automatic savings calculation
✔ Full shopping cart with totals
✔ Full AI JSON response preview
✔ Dark premium theme

📦 Build for Production

npm run build

📸 Future Improvements (Roadmap)

• User accounts / login
• Save favorite deals
• Push notifications about discounts
• Mobile version (React Native)
