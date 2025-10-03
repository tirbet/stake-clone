# Stake.com Clone - Next.js Project

A clone of [Stake.com](https://stake.com) built using **Next.js 15+**. This project aims to replicate core functionalities of Stake.com including user registration, betting systems, wallet management, and real-time updates.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [TODO](#todo)
- [Implemented](#implemented)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is a work-in-progress clone of Stake.com, designed for educational purposes and testing Next.js capabilities with real-time betting functionalities. It includes a full-stack setup with API routes, Prisma database integration, authentication using Better-auth, and dynamic betting features.

---

## Features

- User registration and login
- Real-time betting dashboard
- Multiple bet markets (1X2, Double Chance, Asian Handicap, Total Goals, Correct Score, etc.)
- Wallet system for deposits and withdrawals
- Transaction history
- Dynamic bet settlement
- Admin dashboard (future)

---

## Tech Stack

- **Frontend:** Next.js 15+, React, TailwindCSS, ShadCN UI
- **Backend:** Next.js API routes with Hono (microservices)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Better-auth
- **State Management:** React Query / Zustand
- **Validation:** Zod
- **Testing / Load:** Autocannon

---

## Installation

```bash
# Clone the repo
git clone https://github.com/tirbet/stake-clone.git
cd stake-clone

# Install dependencies
npm install
# or
bun i
# or
yarn install

# Run development server
npm run dev
# or
bun run dev
# or
yarn dev
