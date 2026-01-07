<p align="center">
  <img src="public/mando_logo.svg" alt="MandoGuru Logo" width="200"/>
</p>

<h1 align="center">MandoGuru</h1>

<p align="center">
  <strong>Smart Contract Vulnerability Detection Platform</strong>
</p>

<p align="center">
  <a href="https://github.com/MANDO-Project/mandoguru/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
  </a>
  <a href="https://github.com/MANDO-Project/mandoguru">
    <img src="https://img.shields.io/badge/next.js-15.1.5-black" alt="Next.js">
  </a>
  <a href="https://github.com/MANDO-Project/mandoguru">
    <img src="https://img.shields.io/badge/typescript-5.9.3-blue" alt="TypeScript">
  </a>
  <a href="https://github.com/MANDO-Project/mandoguru">
    <img src="https://img.shields.io/badge/tailwindcss-4.1.14-38B2AC" alt="Tailwind CSS">
  </a>
  <a href="https://github.com/MANDO-Project/mandoguru/actions">
    <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status">
  </a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 📖 Overview

**MandoGuru** is a comprehensive smart contract security analysis platform built with Next.js 15, React 19, and Tailwind CSS. It enables developers to upload Solidity smart contracts, analyze them for vulnerabilities using AI-powered detection, and visualize the results through interactive control flow graphs and detailed reports.

The platform detects **7 major vulnerability categories**:
- 🔐 Access Control
- ➗ Arithmetic Issues
- 🚫 Denial of Service (DoS)
- 🏃 Front Running
- 🔄 Reentrancy
- ⏰ Time Manipulation
- ⚠️ Unchecked Low-Level Calls

## ✨ Features

### 🔍 Smart Contract Analysis
- **File Upload**: Drag-and-drop or browse to upload `.sol` files
- **AI-Powered Detection**: Leverages machine learning models for accurate vulnerability detection
- **Real-time Scanning**: Get instant feedback on contract security status

### 📊 Interactive Visualization
- **Control Flow Graphs**: Visualize contract execution paths with interactive 2D/3D graphs
- **Code Highlighting**: Synchronized code viewer with vulnerability highlighting
- **Node Inspection**: Click on graph nodes to navigate directly to relevant code sections

### 📋 Comprehensive Reports
- **Detailed Bug Reports**: JSON-formatted reports with severity levels and recommendations
- **Export Options**: Download reports in multiple formats (JSON, PDF, HTML)
- **Historical Analysis**: Track and compare scan results over time

### 🔑 API Key Management
- **Secure Key Generation**: Cryptographically secure API keys for programmatic access
- **Scope-based Permissions**: Fine-grained access control (scan:read, scan:write, ai:inference, etc.)
- **Usage Tracking**: Monitor API key usage and last access timestamps

### 🔒 Enterprise-Ready Security
- **AWS Cognito Integration**: Secure authentication with OAuth 2.0/OIDC
- **JWT Token Verification**: Secure API endpoint protection
- **Key Hashing**: API keys are hashed (SHA-256) before storage

## 🎬 Live App

> **Live App**: [https://mandoguru.com](https://mandoguru.com)

<!-- ### Screenshots

| Dashboard | Vulnerability Scanner | Graph Visualization |
|:---------:|:--------------------:|:-------------------:|
| ![Dashboard](https://placeholder-screenshot-link.com/dashboard.png) | ![Scanner](https://placeholder-screenshot-link.com/scanner.png) | ![Graph](https://placeholder-screenshot-link.com/graph.png) | -->

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 15.1.5](https://nextjs.org/) |
| **Language** | [TypeScript 5.9.3](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4.1.14](https://tailwindcss.com/) |
| **UI Components** | [@heroui/react](https://heroui.com/) |
| **Authentication** | [react-oidc-context](https://github.com/authts/react-oidc-context) + AWS Cognito |
| **Visualization** | [react-force-graph](https://github.com/vasturiano/react-force-graph) |
| **Code Display** | [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) |
| **Charts** | [ApexCharts](https://apexcharts.com/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Code Quality** | ESLint, Prettier |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:MANDO-Project/mandoguru.git
   cd mandoguru
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # AWS Cognito Configuration
   NEXT_PUBLIC_COGNITO_AUTHORITY=https://cognito-idp.<region>.amazonaws.com/<user-pool-id>
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
   NEXT_PUBLIC_LOGOUT_URI=http://localhost:3000
   
   # API Configuration
   NEXT_PUBLIC_SCAN_API_BASE_URL=https://api.mandoguru.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 📁 Project Structure

```
mandoscan/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   ├── api-keys/       # API key management endpoints
│   │   │   ├── files/          # File listing endpoint
│   │   │   ├── scan/           # Contract scanning endpoint
│   │   │   └── upload/         # File upload endpoint
│   │   ├── dashboard/          # Dashboard pages
│   │   │   └── (admin)/
│   │   │       └── (others-pages)/
│   │   │           ├── api-keys/       # API key management UI
│   │   │           ├── api-reference/  # API documentation UI
│   │   │           ├── profile/        # User profile
│   │   │           └── solidity/       # Contract upload & scan UI
│   │   ├── auth-provider.tsx   # Cognito authentication provider
│   │   └── layout.js           # Root layout
│   ├── components/             # React components
│   │   ├── api-keys/           # API key UI components
│   │   ├── auth/               # Authentication components
│   │   ├── common/             # Shared components
│   │   ├── ecommerce/          # Dashboard widgets
│   │   ├── form/               # Form components
│   │   ├── solidity/           # Solidity-specific components
│   │   ├── ui/                 # Base UI components
│   │   ├── Graph.jsx           # Force graph visualization
│   │   └── VulnerabilityGrid.jsx
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── icons/                  # SVG icon components
│   ├── layout/                 # Layout components
│   └── lib/                    # Utility functions & middleware
├── public/                     # Static assets
│   ├── examples/               # Sample vulnerability reports
│   └── images/                 # Image assets
├── docs/                       # Documentation
├── data_backup/                # Sample contract data
├── next.config.mjs             # Next.js configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 📡 API Reference

### Base URL

```
https://api.mandoguru.com
```

### Authentication

All API requests require authentication using an API key or JWT token:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Endpoints

#### Upload Contract

```http
POST /api/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

file: <solidity-file.sol>
estimated_cost: 1
```

#### Scan Contract

```http
POST /api/scan
Content-Type: application/json
Authorization: Bearer <api-key>

{
  "contract_code": "pragma solidity ^0.8.0; ...",
  "contract_name": "MyContract"
}
```

#### Get Scan Results

```http
GET /api/scan/{scan_id}
Authorization: Bearer <api-key>
```

### API Key Scopes

| Scope | Description |
|-------|-------------|
| `scan:read` | Read scan results |
| `scan:write` | Submit contracts for scanning |
| `ai:inference` | Access AI detection services |
| `reports:read` | Read vulnerability reports |
| `reports:export` | Export reports (PDF, HTML) |

For complete API documentation, see [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

## 🌐 Deployment

### AWS Amplify (Recommended)

1. Push code to GitHub
2. Connect repository to AWS Amplify
3. Configure environment variables in Amplify Console
4. Deploy

For detailed instructions, see [AWS_AMPLIFY_DEPLOYMENT.md](AWS_AMPLIFY_DEPLOYMENT.md).

### Manual Deployment

```bash
# Build the application
npm run build

# The build output is in the 'mando-tool' directory
# Deploy the contents to your hosting provider
```

### Environment Variables for Production

```env
NEXT_PUBLIC_COGNITO_AUTHORITY=https://cognito-idp.<region>.amazonaws.com/<pool-id>
NEXT_PUBLIC_COGNITO_CLIENT_ID=<client-id>
NEXT_PUBLIC_REDIRECT_URI=https://your-domain.com
NEXT_PUBLIC_LOGOUT_URI=https://your-domain.com
NEXT_PUBLIC_SCAN_API_BASE_URL=https://api.mandoguru.com
```

## 🔗 Related Repositories

| Repository | Description |
|------------|-------------|
| [mandoscan_engine](https://github.com/MANDO-Project/mandoscan_engine) | Backend scanning engine and API server |

<!-- ## 🗺 Roadmap

### Q1 2026
- [ ] Multi-file contract support (import resolution)
- [ ] Batch scanning for multiple contracts
- [ ] Enhanced vulnerability explanations with AI

### Q2 2026
- [ ] VS Code extension integration
- [ ] GitHub Actions integration for CI/CD pipelines
- [ ] Slack/Discord notifications for scan results

### Q3 2026
- [ ] Support for Vyper smart contracts
- [ ] Custom vulnerability rule definitions
- [ ] Team collaboration features

### Q4 2026
- [ ] On-premise deployment option
- [ ] Advanced analytics dashboard
- [ ] Integration with popular development frameworks (Hardhat, Foundry)

### Future
- [ ] Real-time monitoring for deployed contracts
- [ ] Automated fix suggestions with code patches
- [ ] Multi-chain support (Solana, Cosmos, etc.) -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by the <a href="https://github.com/MANDO-Project">MANDO Project</a> team
</p>
