MyNivas
Project Overview
MyNivas is a comprehensive software solution designed to streamline property management operations and enhance the user experience for property managers, administrators, and tenants. The application provides a centralized platform for managing residential properties, enabling efficient communication, task automation, and data organization. Developed to address the complexities of property management, MyNivas offers a modern, intuitive interface and a robust set of tools tailored to the needs of property managers and residents.
The primary goal of MyNivas is to simplify property management processes, increase transparency, and improve user satisfaction. By addressing challenges such as tenant communication, payment tracking, and maintenance coordination, MyNivas leverages advanced technology to deliver a seamless and efficient experience. The project is currently in development and intended for local testing prior to deployment.
Table of Contents

Features
Characteristics
Technology Stack
Installation
Usage
Admin Access
Contributing
License
Contact

Features
MyNivas provides a wide range of functionalities to support property management operations:

Tenant Management: Create, update, and manage tenant profiles, including contact information, lease agreements, and communication logs.
Payment Tracking: Monitor and record rent payments, utility bills, and other financial transactions, with automated reminders for overdue payments.
Maintenance Requests: Allow tenants to submit maintenance requests through the platform, with status tracking and resolution updates for administrators.
Communication Hub: Facilitate seamless communication between property managers and tenants via integrated messaging and notification systems.
Document Management: Store and organize critical documents, such as lease agreements, invoices, and maintenance records, in a secure, centralized repository.
Reporting and Analytics: Generate detailed reports, including occupancy trends, financial summaries, and maintenance activity logs, to support data-driven decision-making.
User Authentication: Implement a secure login system with role-based access control for administrators, property managers, and tenants.
Mobile Accessibility: Ensure full functionality on desktop and mobile devices through a responsive design, providing flexibility for users.
Automated Notifications: Send automated alerts for payment due dates, lease renewals, and maintenance updates to keep all stakeholders informed.
Customizable Settings: Configure system preferences, such as notification schedules, payment terms, and report formats, to meet specific operational needs.

Characteristics
MyNivas is designed with the following key characteristics to ensure reliability, usability, and scalability:

User-Friendly Interface: Intuitive navigation and a clean design enhance the experience for administrators and tenants.
Scalability: Supports management of multiple properties, from small residential units to large complexes, without performance degradation.
Security: Employs robust encryption and secure authentication protocols to protect sensitive user data and financial transactions.
Reliability: Built with stable technologies to ensure consistent performance and minimal downtime.
Cross-Platform Compatibility: Accessible on various devices and operating systems, including Windows, macOS, iOS, and Android.
Customizability: Allows administrators to tailor features and workflows to specific property management requirements.
Efficiency: Automates repetitive tasks, such as payment reminders and report generation, to save time and reduce errors.

Technology Stack
MyNivas is built using the following technologies to ensure performance, scalability, and maintainability:

Backend: Node.js with Express.js for a robust server-side framework.
Database: MySQL for efficient storage and retrieval of property and user data.
Frontend: HTML, CSS, and JavaScript with a responsive framework (e.g., Bootstrap) for a user-friendly interface.
Version Control: Git for collaborative development and version management.

Installation
To set up MyNivas locally for testing and development, follow these steps:

Prerequisites:

Install the following:
Node.js (version 16.x or higher)
MySQL (version 8.x or higher)
Git (for version control)


Ensure a stable internet connection for dependency installation.


Clone the Repository:
git clone [git@github.com:gunasrigedda02/MyNivas.git](https://github.com/gunasrigedda02/MyNivas.git)
cd mynivas

Note: Replace gunasrigedda with your actual GitHub username or repository URL when the project is hosted.

Install Dependencies:
npm install


Database Setup:

Create a MySQL database named mynivas_db.
Update the database configuration in config/database.js with your MySQL credentials.
Run the database migrations:npm run migrate




Environment Configuration:

Create a .env file in the root directory with the following content:PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=mynivas_db


Ensure the .env file is added to .gitignore to prevent exposing sensitive credentials.


Start the Application:
npm start

The application will be accessible at http://localhost:3000.


Usage
Once installed, access MyNivas via a web browser at http://localhost:3000 for local testing. The application supports the following workflows:

Administrators:
Log in to manage tenant profiles, process payments, and respond to maintenance requests.
Access the admin dashboard to generate reports and configure system settings.


Property Managers:
Oversee property-specific tasks, such as maintenance coordination and tenant communication.


Tenants:
Access the tenant portal to submit maintenance requests, view payment history, and communicate with property managers.


Admin Access
To access the administrative dashboard for testing, use the credentials provided by the project maintainer. For security reasons, admin credentials are not included in this document. Please contact the maintainer to obtain access or configure credentials during setup.
Contributing
Contributions to MyNivas are welcome. To contribute:

Fork the repository on GitHub (once hosted).
Create a new branch for your feature or bug fix:git checkout -b feature/your-feature-name


Commit your changes with clear, descriptive messages:git commit -m "Add feature: your-feature-description"


Push your branch to your forked repository:git push origin feature/your-feature-name


Create a pull request on the original repository, detailing the changes and their purpose.

Adhere to the project’s coding standards and include relevant tests. Refer to CONTRIBUTING.md (create this file if it does not exist) for detailed guidelines.
License
This project is licensed under the MIT License. See the LICENSE.md file (create this file if it does not exist) for details.
Contact
For questions, feedback, or support, contact the project maintainer:

Name: Gunasri Gedda
Email: gunasrigedda29@gmail.com
GitHub: gunasrigedda02

Thank you for exploring MyNivas. We are committed to developing a robust platform to meet the needs of property managers and tenants.
