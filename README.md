# SunFit Discover Diet

A beautiful multi-step diet planning application that collects user data and generates personalized nutrition plans using OpenAI.

## Features

- 🎯 **Multi-step Form**: Collect user data step by step
- 📊 **BMR Calculation**: Calculate Basal Metabolic Rate using Mifflin-St Jeor equation
- 🤖 **AI-Powered**: Generate personalized diet plans using OpenAI
- 📋 **Complete Plans**: Get meal plans, grocery lists, and nutrition tips
- 💾 **Save Plans**: Download your diet plan as a markdown file
- 📱 **Responsive**: Beautiful UI that works on all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI**: Chakra UI
- **Forms**: React Hook Form with Zod validation
- **AI**: OpenAI GPT-4
- **Styling**: Chakra UI components

## Data Collection Steps

1. **Personal Information**: Name
2. **Physical Data**: Age, Height (meters), Weight (kg)
3. **Activity Level**: Sedentary to Extremely Active
4. **Goal**: Lose Fat or Gain Muscle

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sunfit-discover-diet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenAI API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## API Endpoints

- `POST /api/generate-diet-plan`: Generates personalized diet plan using OpenAI

## How It Works

1. **Data Collection**: Users go through 4 steps to provide their information
2. **BMR Calculation**: The app calculates BMR using the Mifflin-St Jeor equation
3. **TDEE Calculation**: Total Daily Energy Expenditure based on activity level
4. **Goal Adjustment**: Calories adjusted based on fat loss or muscle gain goals
5. **AI Generation**: Comprehensive prompt sent to OpenAI for diet plan generation
6. **Results Display**: Beautiful presentation of BMR, calories, and full diet plan
7. **Save Feature**: Download the complete plan as a markdown file

## Project Structure

```
src/
├── components/
│   ├── home/           # Landing page components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── context/            # React context for form state
├── lib/                # Utilities and validations
├── pages/              # Next.js pages
│   ├── api/            # API endpoints
│   ├── results/        # Results pages
│   └── steps/          # Form step pages
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
