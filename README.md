# TimerApplication


Objective
Build a React Native app that allows users to create, manage, and interact with multiple customizable timers. The app will include features like categories, progress visualization, and grouped actions while maintaining clean UI/UX and minimal third-party dependencies.

[Requirements
1. Core Features
  1. AddTimer
A screen to create new timers with the following fields:
Name: The name of the timer (e.g., "Workout Timer").
Duration: Timer duration in seconds.
Category: Assign a category to the timer (e.g., "Workout," "Study," "Break").
Savethetimertoalistandpersistthedatalocally(e.g.,using AsyncStorage). 2. TimerListwithGrouping
Display all timers grouped by their categories in expandable/collapsible sections. For each timer, show:
Name.
Remaining time.
Status: Running, Paused, or Completed.
Users can expand or collapse categories to view timers within them. 3. TimerManagement
Provide controls for each timer to: Start: Begin countdown.
Pause: Pause countdown.
Reset: Reset to original duration.
Mark timers as "Completed" when they reach zero.
4. ProgressVisualization
Show a simple progress bar or percentage for each timer to visualize remaining time relative to the total duration.
5. BulkActions
Add buttons at the category level to: Start all timers in a category.
Pause all timers in a category. Reset all timers in a category.
6. UserFeedback
When a timer completes:
Show an on-screen modal with a congratulatory message and the timer’s name.
Enhanced Functionality
1. TimerHistory
Maintain a log of completed timers with: Timer name.
Completion time.
Display the log on a separate "History" screen.
2. CustomizableAlerts
Allow users to set an optional halfway alert for each timer (e.g., at 50% of the total duration). Display a notification or message when the alert triggers.
Technical Details
State Management: Use or useReducer for managing timers and categories. Navigation: Use     with at least two screens:
1. Home Screen: Timer list and grouping functionality.
2. History Screen: Log of completed timers.
Persistence: Use for storing timers and logs. Styling: Use     for clean and responsive layouts. Timers:Implementtimemanagementlogicusing setInterval.


Bonus Features (Optional) 
useState
React Navigation
AsyncStorage
StyleSheet](url)
 1. ExportTimerData
Allow users to export timer history as a JSON file. 2. CustomThemes
Add support for light and dark modes with a theme switcher. 3. CategoryFiltering
Add a filter dropdown to show timers from specific categories only.
Deliverables
1. AReactNativeappwith:
Timer creation and management.
Grouping and bulk actions. Progress visualization. History tracking.
2. CodehostedinaGitHubrepositorywith: A README.md containing:
Setup instructions.
A list of assumptions made during development.
