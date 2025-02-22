# Netflix Show Matching Game

A fun and interactive web game where players match Netflix shows with their descriptions. Built with Next.js, TypeScript, and modern web technologies.

## Features

- 🎮 Interactive drag-and-drop gameplay
- 🎯 Time-based scoring system
- 📊 Global leaderboard
- 🔐 User authentication
- 📱 Mobile-responsive design
- 🌓 Dark mode support

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Drag & Drop:** DND Kit
- **Authentication:** Token-based with local storage
- **UI Components:** Custom components with modern design

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/netflix-match-game.git
   cd netflix-match-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── game/         # Game-specific components
│   │   └── layout/       # Layout components
│   ├── game/             # Game page
│   ├── leaderboard/      # Leaderboard page
│   └── page.tsx          # Home page
├── lib/                   # Utility functions
└── store/                # Zustand state management
```

## Game Rules

1. Match Netflix shows with their correct descriptions
2. Score points for correct matches
3. Time affects your score - faster matches earn more points
4. Complete all matches to finish the game
5. Compare your score on the global leaderboard

## Development

- **Adding New Shows:** Update the `SAMPLE_SHOWS` array in `src/app/game/page.tsx`
- **Styling:** Modify Tailwind classes or update `tailwind.config.js`
- **State Management:** Check `src/store/` for Zustand stores

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or building your own version!

## Acknowledgments

- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- DND Kit for the drag-and-drop functionality
