---
title: "System Design 101: Architecting a Scalable Real-time Web Application"
date: "2024-12-10"
category: "Architecture"
tags: ["System Design", "WebSockets", "Redis", "Scalability", "Backend"]
description: "A deep architectural breakdown of building scalable real-time systems using WebSockets, Redis Pub/Sub, horizontal server scaling, and message persistence."
featured: false
---

Building a real-time messaging application that works for 10 users on a single server is trivial. Scaling that same system to support hundreds of thousands of concurrent connections with sub-100ms message delivery requires thoughtful distributed system design.

In this guide, we explore the architectural building blocks needed to construct a production-ready real-time chat platform.

---

## 1. High-Level Requirements

### Functional Requirements
- 1-on-1 direct messaging and multi-user group chat rooms.
- Real-time online/offline presence indicators.
- Read receipts and typing notifications.
- Message history persistence and offline synchronization.

### Non-Functional Requirements
- **Low latency**: Global message delivery in `< 100ms`.
- **High availability**: Zero downtime deployments and fault tolerance.
- **Horizontal scalability**: Support scaling from 1,000 to 1,000,000 active concurrent connections.

---

## 2. Choosing the Transport Protocol

| Protocol | Pros | Cons | Best Use Case |
| :--- | :--- | :--- | :--- |
| **HTTP Short Polling** | Simple to implement, standard REST | Heavy server overhead, high latency | Non-critical updates |
| **Long Polling** | Works over legacy proxies | Connection reconnect storms | Fallback mechanism |
| **Server-Sent Events (SSE)** | Built on HTTP, automatic reconnect | Unidirectional (Server → Client only) | Stock tickers, notifications |
| **WebSockets** | Full-duplex, lowest overhead, sub-millisecond | Stateful connections, tricky to load balance | Real-time chat, gaming, collab tools |

**Decision**: WebSockets is the clear industry standard for bi-directional real-time messaging.

---

## 3. The Multi-Server Dilemma & Redis Pub/Sub

When you scale horizontally across multiple instances (`Server A`, `Server B`, `Server C`), client connections are split:

```
[User 1 (Connected to Server A)]  --->  Sends message to User 2
[User 2 (Connected to Server B)]  --->  How does Server A reach User 2?
```

Because WebSockets are stateful persistent TCP connections, `Server A` cannot directly write to `User 2`'s socket on `Server B`.

### Solution: The Distributed Message Broker

We introduce **Redis Pub/Sub** (or Apache Kafka / RabbitMQ) as a coordination bus:

1. Every server subscribes to channel topics corresponding to the users or chat rooms currently connected to that server.
2. When `User 1` publishes a message to `Room 42`, `Server A` publishes this event to Redis: `PUBLISH room:42 '{"text":"Hello"}'`.
3. Redis broadcasts the payload to all servers subscribed to `room:42` (including `Server B`).
4. `Server B` receives the message and immediately pushes it down the WebSocket connection to `User 2`.

```typescript
// Sample Redis Pub/Sub Relay in Node.js
import Redis from "ioredis";

const pub = new Redis(process.env.REDIS_URL);
const sub = new Redis(process.env.REDIS_URL);

// Subscribe to a specific chat room
sub.subscribe("channel:room_42", (err, count) => {
  if (err) console.error("Failed to subscribe:", err);
});

// Broadcast received messages to local WebSocket clients
sub.on("message", (channel, message) => {
  const data = JSON.parse(message);
  broadcastToLocalSocketClients(channel, data);
});
```

---

## 4. Message Storage Architecture

Chat apps have two distinct access patterns:
1. **Hot Data (Recent Messages)**: Rapidly accessed during active conversations.
2. **Cold Data (Historical Archive)**: Read sequentially when a user scrolls up to load historical context.

### The Hybrid Storage Model
- **In-Memory Cache (Redis Streams / Sorted Sets)**: Keep the last 100 messages per active conversation in Redis sorted by timestamp. Provides microsecond reads for users opening chat windows.
- **Persistent Store (Cassandra / PostgreSQL / MongoDB)**: Write messages asynchronously through a message queue (Kafka or BullMQ) into a partitioned relational or NoSQL database.

---

## 5. Handling Network Drops & Offline Sync

Mobile networks disconnect frequently (elevators, tunnels). When a client reconnects, sending the entire message history is wasteful.

Instead, employ a **Sequence Number / High-Water Mark Pattern**:
- Every message in a conversation is assigned a monotonically increasing 64-bit integer (`seq_id`).
- When reconnecting, the client sends its last received sequence ID:
  ```json
  { "action": "SYNC", "conversationId": "chat_89", "lastSeqId": 4120 }
  ```
- The server simply queries:
  ```sql
  SELECT * FROM messages WHERE conversation_id = 'chat_89' AND seq_id > 4120 ORDER BY seq_id ASC;
  ```
- This guarantees zero duplicate messages and perfectly ordered delivery even over unreliable networks.

---

## Conclusion

Building scalable real-time applications requires separating connection management (WebSockets), inter-server communication (Redis Pub/Sub), and durable message storage. By decoupling these layers, your system can gracefully scale to handle millions of simultaneous users.
