"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Blog = {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  createdAt: string
}

export default function BlogPage() {
  const [search, setSearch] = useState("")

  const blogs: Blog[] = [
    {
      id: "1",
      title: "10 Easy Ways to Live More Sustainably 🌿",
      excerpt: "Simple habits you can adopt today to reduce your carbon footprint.",
      image: "/10way.jpg",
      category: "Sustainability",
      author: "Admin",
      createdAt: "2026-04-01",
    },
    {
      id: "2",
      title: "Urban Gardening: Grow Your Own Food 🪴",
      excerpt: "Learn how to start a garden even in small city spaces.",
      image: "/gardening.jpg",
      category: "Gardening",
      author: "Green Team",
      createdAt: "2026-03-28",
    },
    {
      id: "3",
      title: "Plastic-Free Lifestyle Guide ♻️",
      excerpt: "Reduce plastic waste with these practical everyday tips.",
      image: "/plastic.jpg",
      category: "Eco Living",
      author: "Community",
      createdAt: "2026-03-25",
    },
  ]

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-11/12 mx-auto py-10 space-y-10">

      {/* 🌿 Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold">🌿 Green Community Blog</h1>
        <p className="text-muted-foreground">
          Explore ideas, tips, and stories for a sustainable future
        </p>
      </div>

      {/* 🔍 Search */}
      <div className="max-w-xl mx-auto">
        <Input
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus-visible:ring-green-500"
        />
      </div>

      {/* 📰 Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="group rounded-2xl border bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              
              {/* Category */}
              <Badge className="bg-green-100 text-green-700">
                🌱 {blog.category}
              </Badge>

              {/* Title */}
              <h2 className="text-lg font-semibold group-hover:text-green-600 transition">
                {blog.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Meta */}
              <div className="text-xs text-muted-foreground">
                By {blog.author} · {blog.createdAt}
              </div>

              {/* Read More */}
              <Link
                href={`/blog/${blog.id}`}
                className="inline-block text-green-600 text-sm font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}

      </div>

      {/* Empty */}
      {filteredBlogs.length === 0 && (
        <div className="text-center text-muted-foreground">
          No blog posts found 🌿
        </div>
      )}
    </div>
  )
}