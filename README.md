# Task Management Application

## Overview

This project is a **Task Management Application** built using **React** and **TypeScript** for the frontend, **Firebase** for authentication and real-time data storage, and **Material-UI (MUI)** for a polished, responsive user interface. The app allows users to efficiently manage tasks with features like drag-and-drop functionality, categorization, due dates, and advanced sorting options.

## Features

- **User Authentication**: Secure Google Sign-In integration using Firebase Authentication.
- **Task Management**:
  - Create, edit, and delete tasks.
  - Set due dates, categories, and custom tags for tasks.
  - Drag-and-drop functionality to organize tasks within and across lists.
- **Views**:
  - Toggle between **Board View** (Kanban-style) and **List View**.
- **Advanced Filtering**:
  - Filter tasks by tags, categories, or due dates.
  - Search for tasks by keywords.
- **Responsive Design**:
  - Built with **Tailwind CSS** and **MUI** for an adaptive and seamless user experience.
  - Fully responsive for desktop, tablet, and mobile devices.

## Tech Stack

### Frontend

- **React**: For building user interfaces.
- **TypeScript**: For static typing and better developer experience.
- **Material-UI (MUI)**: For pre-styled, accessible components.
- **Tailwind CSS**: For custom styling and responsive design.
- **React Beautiful DnD**: For drag-and-drop functionality.
- **React Query**: For efficient data fetching and caching.

### Backend

- **Firebase**:
  - Authentication: Used for secure Google Sign-In.
  - Firestore: NoSQL database for real-time task management.

## Folder Structure

The project is organized into the following structure:

src/ ├── assets/ # Images and other static assets
├── components/ # Reusable React components
├── helpers/ # Utility functions
├── pages/ # Top-level application views

## Drag-and-Drop Implementation

Drag-and-drop functionality is implemented using the **React Beautiful DnD** library, which allows users to reorganize tasks easily. The tasks update in real-time with Firestore, ensuring a seamless user experience.

### Steps for Drag-and-Drop

1. Wrap your lists in a `<DragDropContext>` component.
2. Each list becomes a `<Droppable>` area, and tasks are rendered as `<Draggable>` items.
3. On drag end, the `handleDragEnd` function updates the state and syncs changes with Firestore.
