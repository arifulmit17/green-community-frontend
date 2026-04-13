Project name : Green Community

Project Description:

Green Community is a full-stack web platform where users can share, explore, and support eco-friendly ideas.
Users can submit innovative ideas, vote on others’ contributions, and even monetize premium ideas.
The platform encourages collaboration and sustainability through community-driven engagement.

Live URLs:

Frontend: https://green-community-frontend.vercel.app

Backend API: https://green-community-backend.vercel.app/

Features:
-Authentication & User Management
-Secure login & signup (JWT + cookies)
-Role-based access (Admin / Member)
-Block / Unblock users (Admin control)
-Create, update, and delete ideas
-View all ideas with search & filtering
-View personal ideas (My Ideas page)
-Edit ideas via modal UI
-Reddit-style upvote & downvote system
-Dynamic vote count calculation
-Sorted ideas based on popularity
-Paid ideas with secure checkout
-Stripe payment integration
-Webhook handling for payment confirmation
-Search and category filtering
-Pagination & sorting
-Responsive UI

Technologies Used:

Frontend:
-Next.js (App Router)
-TypeScript
-Tailwind CSS
-shadcn/ui

Backend:
-Node.js
-Express.js
-TypeScript

Database & ORM:
-PostgreSQL
-Prisma ORM

Payments:
-Stripe API
-Webhooks

Authentication:
-JWT (stored in HTTP-only cookies)

Deployment:
-Vercel (Frontend)
-Render (Backend)

Setup Instructions:

Clone the repository:

git clone https://github.com/your-username/green-community.git

For backend setup , go to green-community directory, install npm packages, connect to database and migrate using prisma, create an env file, run server

do the same for frontend repository. using nextjs and other npm packages in git repo.
