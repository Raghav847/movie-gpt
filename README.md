# Movie GPT - AI-Powered Movie Recommendation App
Demo: https://movie-gpt-six.vercel.app/

## Overview

Movie GPT is a React-based web application that combines the power of AI with movie recommendations. It uses the Create React App framework as a foundation and integrates various technologies to provide a seamless user experience.

## Key Features

- User Authentication (Sign Up, Sign In, Sign Out)
- AI-powered movie recommendations using GPT
- Movie information fetched from TMDB API
- Multi-language support
- Responsive design for various screen sizes

## Technology Stack

- **Frontend Framework**: React (Create React App)
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Authentication**: Firebase
- **API Integration**: TMDB API, OpenAI API
- **Routing**: React Router

## Project Structure and Implementation

1. **Routing**: The app uses React Router for navigation between different pages.

2. **Authentication**:
   - Implemented using Firebase
   - Features include Sign Up, Sign In, and Sign Out functionalities
   - User profile updates and access control to protected routes

3. **Redux Store**:
   - Utilizes Redux for state management
   - Includes a userSlice for managing user-related data

4. **API Integration**:
   - TMDB API for fetching movie data
   - OpenAI API for GPT-powered movie recommendations

5. **Custom Hooks**:
   - Created for reusable logic and API calls

6. **Main Container**:
   - Displays featured movie information
   - Embeds YouTube video for movie trailers

7. **GPT Search**:
   - Custom search bar for AI-powered recommendations
   - Displays search results based on GPT suggestions

8. **Multi-language Support**:
   - Implemented to cater to a diverse user base

9. **Error Handling**:
   - Robust error handling throughout the application

10. **Performance Optimization**:
    - Implemented memoization techniques for improved performance

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for API keys (TMDB, OpenAI, Firebase)
4. Run the development server: `npm start`

## Future Enhancements

- Implement user preferences for more personalized recommendations
- Add social features like sharing movie recommendations
- Enhance the UI/UX with animations and transitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
