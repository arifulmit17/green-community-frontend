import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="w-11/12 mx-auto py-12 space-y-16">

      {/* 🌿 Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          🌿 About Green Community
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A platform dedicated to sharing eco-friendly ideas, promoting sustainability,
          and building a greener future together.
        </p>
      </section>

      {/* 🌱 Mission */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">🌱 Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is to empower individuals and communities to adopt
            sustainable lifestyles by sharing innovative ideas, eco-friendly
            practices, and meaningful solutions.
          </p>
          <p className="text-muted-foreground">
            We believe small actions can create a big impact when people come together.
          </p>
        </div>

        <div className="relative h-64 w-full">
          <Image
            src="/green.webp"
            alt="Mission"
            fill
            className="object-contain rounded-2xl"
          />
        </div>
      </section>

      {/* 🌍 Vision */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-64 w-full order-2 md:order-1">
          <Image
            src="/green.webp"
            alt="Vision"
            fill
            className="object-contain rounded-2xl"
          />
        </div>

        <div className="space-y-4 order-1 md:order-2">
          <h2 className="text-3xl font-semibold">🌍 Our Vision</h2>
          <p className="text-muted-foreground">
            To create a global community where sustainable living is accessible,
            achievable, and inspiring for everyone.
          </p>
          <p className="text-muted-foreground">
            We envision a future where innovation meets responsibility to protect
            our planet.
          </p>
        </div>
      </section>

      {/* 🌿 What We Do */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">🌿 What We Do</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">💡 Share Ideas</h3>
            <p className="text-sm text-muted-foreground">
              Users submit eco-friendly ideas to inspire others.
            </p>
          </div>

          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🗳 Community Voting</h3>
            <p className="text-sm text-muted-foreground">
              The community votes to highlight impactful ideas.
            </p>
          </div>

          <div className="p-6 border rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🌍 Promote Sustainability</h3>
            <p className="text-sm text-muted-foreground">
              Encouraging eco-friendly habits and awareness globally.
            </p>
          </div>

        </div>
      </section>

      {/* 🌳 Impact Section */}
      <section className="bg-green-50 rounded-2xl p-10 text-center space-y-6">
        <h2 className="text-3xl font-semibold">🌳 Our Impact</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-green-600">100+</h3>
            <p className="text-sm text-muted-foreground">Ideas Shared</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-600">500+</h3>
            <p className="text-sm text-muted-foreground">Community Votes</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-600">50+</h3>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </div>
        </div>
      </section>

      {/* 🤝 Call to Action */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-semibold">
          Join Our Green Movement 🌿
        </h2>
        <p className="text-muted-foreground">
          Be part of a community that cares about the planet and future generations.
        </p>

        
      </section>

    </div>
  )
}