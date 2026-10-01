FitBuddy
Introduction

FitBuddy is a personalized fitness management application developed to help users maintain a structured and consistent fitness routine. The system collects basic information such as the user's age, weight, fitness goal, and workout intensity, and uses these details to provide a suitable workout plan. The application combines workout management, meal tracking, user profiles, and authentication in a single platform.

Problem Statement

Many individuals begin fitness activities without having proper knowledge about suitable exercises, workout duration, intensity, and nutrition. Generic fitness plans may not be appropriate for every individual because people's physical conditions and fitness goals differ. Therefore, there is a need for a system that can provide a more personalized and organized approach to fitness management.

Proposed System

FitBuddy provides a centralized platform where users can create an account, enter their personal fitness information, generate a customized workout plan, save the plan, and track workouts and meals. The frontend provides an interactive user interface, while the backend manages authentication, user information, workout data, and meal data.

Objectives

The main objectives of FitBuddy are:

To provide personalized workout plans.
To simplify fitness planning for users.
To maintain user fitness information.
To store and manage workout records.
To provide meal and nutrition tracking.
To provide secure user authentication.
To create a foundation for future AI-powered fitness recommendations.
Working Principle

The working process of FitBuddy begins when a user enters their basic information. The system collects details such as age, weight, fitness goal, and workout intensity. These inputs are processed by the backend, which generates a structured seven-day workout plan. The generated plan can then be saved and activated for the user.

The user's workout and meal information is stored in the database. Whenever required, the frontend communicates with the backend through API requests to retrieve or update the information.

System Architecture

FitBuddy follows a frontend–backend architecture.

The frontend is responsible for displaying the user interface and collecting user inputs. The backend receives these inputs through APIs, processes the information, and communicates with the database.

The basic architecture is:

User → Frontend → Flask Backend → SQLite Database → Backend → Frontend

The system can also be extended in the future by adding an AI model between the backend and recommendation system.

Frontend

The frontend of FitBuddy is developed using HTML, CSS, Tailwind CSS, and JavaScript. It provides the user interface for entering fitness information, generating plans, viewing active plans, and interacting with the application.

The frontend communicates with the backend using HTTP requests and JSON data.

Backend

The backend is developed using Python Flask. It provides APIs for registration, login, profile management, workout management, meal management, and personalized plan generation.

The backend acts as the central processing layer between the frontend and database.

Database

FitBuddy uses SQLite as its database. The database stores user information, workout records, and meal information.

The major entities are:

User
Workout
Meal

The User entity is connected with the user's workout and meal records, allowing information to be maintained separately for each user.

Authentication

FitBuddy uses authentication to protect user information. JWT (JSON Web Token) is used for authenticated API requests, while Bcrypt is used for password hashing.

This allows the system to identify authenticated users before providing access to protected resources.

Workout Management

The workout module stores information such as workout title, category, duration, calories burned, date, and the associated user. This enables the application to maintain a history of the user's workout activities.

Meal Management

The meal module allows nutritional information to be stored along with the user's account. It can contain meal name, calories, protein, carbohydrates, fat, and date.

This helps combine exercise management and nutrition management within one application.

Personalized Plan Generation

One of the main features of FitBuddy is personalized plan generation. The system considers user-provided parameters such as:

Age + Weight + Fitness Goal + Workout Intensity

These inputs are used to generate a structured workout schedule.

The current prototype uses a predefined/rule-based plan generation approach. The architecture can be extended later with a live AI model for more advanced recommendations.

Advantages

FitBuddy provides several advantages:

Easy-to-use fitness management.
Personalized workout planning.
Centralized workout and meal information.
Secure authentication.
Persistent database storage.
Modular frontend and backend architecture.
Possibility of future AI integration.
Future Enhancement

In future versions, FitBuddy can be enhanced with:

Live AI fitness recommendations.
AI-based nutrition suggestions.
Progress charts and analytics.
Wearable device integration.
Workout reminders and notifications.
Trainer and administrator roles.
Cloud database support.
More advanced personalized recommendations.
Conclusion

FitBuddy is a personalized fitness management system that combines workout planning, workout tracking, meal tracking, user profiles, authentication, and database management in a single platform. The system provides a structured approach to fitness and creates a foundation that can be further enhanced with AI-based recommendations and real-time fitness analytics.
