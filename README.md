# Meet Up — Video Calling App

A full-stack real-time video calling application built with React, Node.js, Socket.IO, and WebRTC. Users can register, log in, create or join meetings via a code, chat during calls, and share their screen.

---

## Features

- **User Authentication** — Register and log in with username/password (tokens stored in localStorage)
- **Protected Routes** — Home page is wrapped with a `withAuth` HOC that redirects unauthenticated users
- **Meeting Lobby** — Preview your camera before joining; enter a display name to connect
- **Real-Time Video Calls** — Peer-to-peer video/audio via WebRTC, signalled through Socket.IO
- **Multi-Participant Support** — Displays remote participants in a responsive grid layout
- **Camera & Microphone Toggle** — Turn video or audio on/off mid-call
- **Screen Sharing** — Share your screen if the browser supports `getDisplayMedia`
- **In-Call Chat** — Real-time chat via Socket.IO with unread message badge
- **Guest Access** — Join a call without registering via the landing page

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, React Router, MUI (Material UI) |
| Signalling | Socket.IO                          |
| Video/Audio | WebRTC (native browser APIs)      |
| Backend   | Node.js, Express 5                  |
| Database  | MongoDB (Mongoose)                  |
| Auth      | bcrypt (password hashing), JWT tokens |

---




## API Endpoints

| Method | Endpoint                    | Description               | Auth Required |
|--------|-----------------------------|---------------------------|---------------|
| POST   | `/api/users/register`       | Register a new user       | No            |
| POST   | `/api/users/login`          | Login and receive a token | No            |
| GET    | `/api/users/getUserData`    | Get profile by token      | Token (query) |

---

## WebRTC / Socket.IO Flow

1. User joins a room by navigating to `/<meetingCode>`.
2. The `VideoComponent` connects to the Socket.IO server and emits a `join-call` event.
3. The server broadcasts the new peer's socket ID to all existing participants.
4. Each participant creates an `RTCPeerConnection`, exchanges SDP offers/answers and ICE candidates via the `signal` event.
5. Tracks (video/audio) are added with `addTrack` / `replaceTrack`; fallback to a silent black stream when no media is available.
6. Chat messages are broadcast over the `chat-message` socket event and displayed in the in-call panel.

---

Deployed On Render-https://videocalling-platform-1.onrender.com
