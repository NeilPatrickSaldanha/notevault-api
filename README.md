# NoteVault API

A lightweight RESTful API service for note management with complete CI/CD pipeline implementation.

## Features

- Create, Read, Update, Delete (CRUD) operations for notes
- Health monitoring endpoint
- Docker containerization
- Multi-environment deployment (staging/production)
- Automated testing with Jest
- GitHub Actions CI/CD pipeline

## Prerequisites

- Node.js 18+
- Docker Desktop
- Git

## Installation

Clone the repository:
```bash
git clone https://github.com/NeilPatrickSaldanha/notevault-api.git
cd notevault-api
```

Install dependencies:
```bash
npm install
```

## Running Locally

Start the application:
```bash
npm start
```

The API will be available at `http://localhost:3000`

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

## Running with Docker

Build and start both environments:
```bash
docker compose build
docker compose up -d
```

Access the environments:
- Staging: `http://localhost:5000`
- Production: `http://localhost:6000`

Check container status:
```bash
docker compose ps
```

Stop containers:
```bash
docker compose down
```

## Running Tests

Run all tests:
```bash
npm test
```

## API Endpoints

### Health Check
```
GET /health
```

### Create Note
```
POST /notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here"
}
```

### Get All Notes
```
GET /notes
```

### Get Single Note
```
GET /notes/:id
```

### Update Note
```
PUT /notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### Delete Note
```
DELETE /notes/:id
```

## CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment:

- **CI Workflow**: Runs tests on every push
- **Staging Workflow**: Deploys to staging environment on `staging` branch
- **Production Workflow**: Deploys to production on `main` branch

## Project Structure
```
notevault-api/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── staging.yml
│       └── production.yml
├── docs/
│   ├── CODE_REVIEW_TEMPLATE.md
│   └── ISSUE_TEMPLATE.md
├── tests/
│   └── app.test.js
├── app.js
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
└── README.md
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

MIT