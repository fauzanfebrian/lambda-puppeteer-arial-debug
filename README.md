# Lambda Puppeteer Arial Debug

A specialized PDF generation utility optimized for AWS Lambda (Node.js 20). This project ensures consistent font rendering (specifically Arial) in serverless environments by dynamically injecting fonts.

## Features

- **AWS Lambda Optimized**: Tailored for `AWS_Lambda_nodejs20.x` runtime using `@sparticuz/chromium`.
- **Consistent Typography**: Built-in support for Arial font.
- **Docker Workflow**: Includes a Docker-based environment that mirrors Lambda for local testing and dependency management.
- **Smoke Testing**: Built-in test script to verify font rendering across different weights.

## Prerequisites

- Docker
- Node.js 20 (for local development)
- Make (optional, but recommended)

## Getting Started

### 1. Build the Docker Image

```bash
make build
```

### 2. Install Dependencies

Install `node_modules` inside a Docker volume to ensure compatibility with the Lambda Linux environment.

```bash
make install
```

### 3. Run Local Smoke Test

Generates `out.pdf` in the project root to verify font rendering.

```bash
make test
```

### 4. Verify Fonts

To confirm that Arial is correctly embedded in the generated PDF, you can use the following command:

```bash
strings out.pdf | grep FontName
```

Alternatively, open `out.pdf` in a PDF viewer (like Adobe Acrobat or macOS Preview) and inspect the document properties to verify that **ArialMT** or **Arial-BoldMT** is listed under the fonts section.

### 5. Open Generated PDF (macOS)

```bash
make open
```

## Usage

### In AWS Lambda

Deploy the contents of this project (excluding `local-test.js` and `node_modules` if using Lambda layers or container images) to an AWS Lambda function.

The handler expects an event with an `html` property:

```json
{
  "html": "<h1>Hello Arial</h1><p>Test paragraph.</p>"
}
```

### Programmatic Usage

You can use the `generatePdf` function directly:

```javascript
const { generatePdf } = require("./index");

const html = "<h1>My PDF</h1>";
const pdfBuffer = await generatePdf(html);
```

## Development

### Makefile Commands

- `make build`: Build the Lambda-parity image.
- `make install`: Install dependencies inside the container volume.
- `make test`: Run smoke test and generate `out.pdf`.
- `make shell`: Drop into a shell inside the container.
- `make clean`: Remove generated PDF and node_modules volume.

## Project Structure

- `index.js`: Core logic and Lambda handler.
- `local-test.js`: Smoke test script.
- `fonts/`: Local font files.
- `Dockerfile`: Lambda-parity container definition.
- `Makefile`: Automation for build and test workflows.

## Font Management

Fonts are injected via CSS in `index.js`. The project currently supports:
- **Arial**: Regular, Bold
