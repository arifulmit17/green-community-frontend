"use client"

import { useState } from "react"
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
import { signupUser } from "@/services/auth.service"

export  function SignupForm(props: React.ComponentProps<typeof Card>) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  })

  

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
})


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const  handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()

    

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image || undefined,
    }

    const result = signupSchema.safeParse(payload)

if (!result.success) {
  result.error.issues.forEach((issue) => {
    toast.error(issue.message)
  })
  return
}


    // console.log("Signup payload:", payload)
    try {
      const { data } = await signupUser(payload)
      if(data){
        toast.success("Signup successful")
        window.location.href="/"
      }
    //   if (error) {
    //     toast.error(`Signup error: ${error}`)
    //     return
    //   }
      
    }catch (error) {
      toast.error(`Signup error: ${error}`)
      toast.error("Signup not successful, Please try again.")
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="abc@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
              <Input
                id="image"
                name="image"
                placeholder="https://example.com/image.png"
                value={formData.image}
                onChange={handleChange}
              />
              <FieldDescription>
                Optional profile photo.
              </FieldDescription>
            </Field>

            <Field>
              <Button type="submit" className="w-full">
                Create Account
              </Button>


              <FieldDescription className="text-center">
                Already have an account? <a href="/login">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
