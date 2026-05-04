"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { z } from "zod"
import { loginUser } from "@/services/auth.service"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })

  const handleDemoLogin = async () => {
  setEmail("kamal@gmail.com")
  setPassword("password1234")
  
  // optionally auto submit
  await handleSubmit(new Event("submit") as any)
}

const handleAdminLogin = async () => {
  setEmail("jamal@example.com")
  setPassword("admin1234")
  
  await handleSubmit(new Event("submit") as any)
}

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const result = loginSchema.safeParse({ email, password })
    // console.log(result);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    setLoading(true)

    try {
      const res = await loginUser(result.data)
      // console.log("Login response:", res);
      const data =res
      // console.log("Login data:",data);

      if (!data.success) {
        setError(data.message)
        toast.error(data.message || "Login failed")
        return
      }


      toast.success("Login successful")

      window.location.href = "/"
    } catch (err) {
      // console.log(err)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {error && (
                <FieldDescription className="text-red-500 text-center">
                  {error}
                </FieldDescription>
              )}

              <Field className="space-y-2">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
                

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
          <div className="flex flex-col gap-5 py-5">
            <Button onClick={handleDemoLogin} type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Demo User Login"}
                </Button>
                <Button onClick={handleAdminLogin} type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Demo Admin Login"}
                </Button>
                <h1 className="text-gray-400">Demo Accounts: press login button again after form is filled</h1>

          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}