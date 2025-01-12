# Playwright BDD

## Overview

This repository serves as a showcase of my expertise in **automation testing**, with a specific focus on **Behavior-Driven Development (BDD)** and **Playwright**. It highlights my ability to design and implement automation solutions using modern tools and techniques. By exploring this repository, you will gain insights into my approach to automation testing and how I solve challenges in this domain.

I also have cross-functional experience in **backend**, **frontend**, **technical writing**, and other roles (**not a lie**, lol). I use this diverse knowledge to enhance automation, such as utilizing reusable components in BE and FE and creating clear and comprehensive documentation to support testing and development processes.

I am **framework agnostic** and **pragmatic**. I adapt to any framework as long as it has documentation and a manageable learning curve, ensuring I can deliver effective solutions regardless of the tools or technologies involved.

## Why This Repository?

Due to confidentiality agreements and the proprietary nature of my work with various companies, I am unable to share direct examples of the automation testing projects I have completed during my professional career. However, this repository demonstrates my skillset and experience in automation testing by:

- Implementing **BDD** practices using tools like **Gherkin**.
- Using **Playwright** for end-to-end testing.
- Showcasing the application of best practices in **test automation architecture**.
- Highlighting examples of **clean code**, **scalable frameworks**, and **maintainable tests**.

## Note

For the web application to be tested, I use the [ **SauceDemo**](https://www.saucedemo.com/) website with its credentials to cover normal cases, glitches, and other scenarios. I also perform manual tests to verify my assumptions about the application and ensure its behavior aligns with expectations.

Since this repository is for showcasing purposes, I am considering scenarios such as glitches, locked accounts, and other edge cases as part of the happy path.


## Features

- **Behavior-Driven Development**: Write tests in a natural language style using Gherkin syntax, making them readable for both technical and non-technical stakeholders.
- **Playwright Integration**: Perform cross-browser and cross-platform testing with the powerful Playwright library.
- **Custom Framework**: A modular and extensible testing framework built with best practices to ensure maintainability and scalability.
- **Realistic Examples**: Test cases and scenarios inspired by real-world challenges, ensuring practical value.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/daffahilmyf/playwright-bdd.git
   cd playwright-bdd
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running Tests

1. To execute all tests, use:

   ```bash
   npm test
   ```

2. To run a specific feature file:

   ```bash
   npx cucumber-js path/to/feature/file.feature
   ```

3. For cross-browser testing:

   ```bash
   npm run test:cross-browser
   ```

## Repository Structure

```plaintext
playwright-bdd/
├── .features-gen/         # Generated feature files or related artifacts (Build)
├── deliverable-artifacts/ # Artifacts for delivery
├── node_modules/          # Node.js dependencies (auto-generated)
├── tests/                 # Test files and Playwright test cases
│   ├── @inventory/        # Test files related to inventory
│   ├── @...../            # Test files related to specific test
│   └── hooks/             # Hook scripts for testing lifecycle
├── utils/                 # Utility functions and helpers
├── .gitignore             # Specifies intentionally untracked files
├── package-lock.json      # Dependency lock file for Node.js
├── package.json           # Project dependencies and scripts
├── playwright.config.ts   # Configuration for Playwright
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration file

```

## Contributing

Feel free to fork this repository and contribute by submitting pull requests. Suggestions, enhancements, and bug fixes are always welcome.

## Contact

If you have any questions about this project or my experience, feel free to reach out:

- **Email**: daffahilmanfrizal@gmail.com
- **LinkedIn**: [Daffa Hilmy Fadhlurrohman](https://linkedin.com/in/daffahilmyf)
- **GitHub**: [Daffa Hilmy Fadhlurrohman](https://github.com/daffahilmyf)

---

Thank you for visiting this repository! I hope it provides a clear picture of my skills and expertise in automation testing with Playwright and BDD.
