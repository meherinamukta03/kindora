import { createAuthClient } from "better-auth/react"

// একটাই client — কোনো baseURL দিতে হয় না, same-origin (localhost:3000) এর
// /api/auth এ better-auth route handler mount করা আছে।
export const authClient = createAuthClient()

export const { signIn, signUp, useSession, signOut } = authClient
