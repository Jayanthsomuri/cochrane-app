
# Cochrane Reviews Visualization App By Jayanth Somuri

## Project Overview
This is a Single Page Application (SPA) built with React 18 to visualize Cochrane Reviews. The application features a responsive design with infinite scrolling and an advanced search functionality with auto-suggestions.

## Key Features
- Responsive layout compatible with different screen sizes
- Infinite scrolling (initially displays 10 reviews, loads more on scroll)
- Advanced search with auto-suggestions
- Hyperlinked review titles
- Color-coded UI elements

## Prerequisites
- Node.js (v16 or later)
- npm (v8 or later)

## Installation Steps

1. Clone the Repository
```bash
cd cochrane-reviews-app
```

2. Install Dependencies
```bash
npm install
```

3. Install Additional Dependencies
```bash
npm install react-virtualized-auto-sizer react-window
```

4. Start the Development Server
```bash
npm start
```

5. Open in Browser
Open [http://localhost:3000](http://localhost:3000) to view the app

## Project Structure
```
cochrane-reviews-app/
├── public/
├── src/
│   ├── components/
│   │   ├── ReviewList.js
│   │   ├── SearchBar.js
│   ├── data/
│   │   └── cochrane_reviews.json
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Key Dependencies
- React 18
- react-window
- react-virtualized-auto-sizer

## Customization
- Modify `src/data/cochrane_reviews.json` to update review data
- Adjust styling in component files as needed

## Troubleshooting
- Ensure all dependencies are correctly installed
- Check console for any error messages
- Verify the data file is correctly formatted

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips
- The app uses virtualization for efficient rendering of large lists
- Infinite scrolling reduces initial load time

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Contact
mail:- jayanthsomuri9@gmail.com
```

## Support
For any issues or questions, please open an issue in the GitHub repository.
=======
# cochrane-app
>>>>>>> 48e12baff2097fda2e8e2554e896d110c3a07d9c
