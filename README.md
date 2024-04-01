# Software Issue Management System
## Problem Solved
Software companies often face challenges in managing and tracking internal issues, bugs, and feature requests efficiently. The proposed ticketing system aims to streamline issue tracking, enhance collaboration among team members, and provide a centralized platform for managing software-related tasks.
## Database
[Capstone Database Repo](https://github.com/Swathik22/fronend-capstone-api)
## Technologies Used
- React
- JavaScript
- Html5
- CSS
## Installation and Setup Instructions
Clone down this repository. You will need node and npm installed globally on your machine.
#### Installation:
>npm install
#### Run Database:
>json-server database.json -p 8088
#### Run App:
>npm run dev  
>Redirect to login page  
>http://localhost:8088/Login
## Essential Structure
Software Issue Management System consists of several key features:
#### View All Tickets
- As an employee, you can view all tickets upon logging in. Each ticket will display its title, status, priority, and description.
#### Search for Tickets
- Employees can filter tickets by title, status, or priority using a dropdown menu. Upon selection, only tickets relevant to the chosen criteria will display.
#### New Ticket
- Employees can create new tickets by filling out a form with details such as title, description, status, priority, and assignee. Saving the ticket adds it to the database and redirects to the home page.
#### My Tickets
- Employees can view tickets assigned to or raised by them. Option is available to filter tickets by assigned or can view all.
#### Edit Ticket
- Employees can edit existing tickets to make changes to the ticket details, and the updates will be reflected in the database.
#### Delete Ticket
- Employees can delete tickets if they are resolved and created by the current employee. Deleted tickets are removed from the database.
#### Profile
- Employees can view and update their profile details, such as name, email, phone number, and address.

## WireFrame
  [WireFrame](https://www.google.com/url?q=https://miro.com/app/board/uXjVNjSf-KY%3D/?share_link_id%3D203532242539&sa=D&source=editors&ust=1711057315772765&usg=AOvVaw15JGdUyOJomIM6KYn_qit4)

## ERDiagram
  [ERDiagram](https://dbdiagram.io/d/TicketingSystem-65ee0d13b1f3d4062c917c17)
## Reflection
  In this capstone, I was able to implement the CRUD operations, navigating between react components, able to use Routes and react-router and able to apply CSS my application.  

  One of the main challenges I ran into is Filtering multiple entities' data and combining them together, then sending the result as a single object prop to the component.  

  Additionally, I will implement unit tests in my application to verify the individual components and functions for correctness and robustness.  
  And I will utilize Bootstrap for styling and layout consistency across the application.

  
  
  
