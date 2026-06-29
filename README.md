# 📚 BiblioDrop – Online Book Delivery Management System

**BiblioDrop** is a comprehensive, full-stack digital marketplace that democratizes access to books by connecting avid readers and students with local libraries and independent book owners. Designed to eliminate the barrier of physical library visits, BiblioDrop enables seamless book discovery, secure doorstep delivery requests, and real-time reading management with robust role-based workflows.

---

## 🚀 Live Links & Repositories
* **Live Deployment Site:
* **Client-Side (Frontend) Repository:
* **Server-Side (Backend API) Repository:

---

## 👥 Multi-Role Ecosystem Workflows

### 1. 📖 Users (Readers)
* **Explore & Discover:** Publicly search, filter, and browse diverse book collections.
* **Premium Delivery Integration:** Request doorstep delivery securely using **Stripe Payment Gateway** for handling delivery fees.
* **Personalized Dashboard:** Track live stats via data visualization charts, view delivery status logs, access a gallery of delivered books (My Reading List), and manage reviews.

### 💼 2. Librarians (Providers / Book Owners)
* **Inventory Upload:** List books with comprehensive metadata and high-resolution cover images powered by the **imgBB API**.
* **Publishing Control:** All newly submitted listings default to `Pending Approval`. Once accepted by the admin, librarians can dynamically toggle their books between `Published` and `Unpublished` states.
* **Order Fulfillment:** Live tracking table to update order processing states (`Pending` ➔ `Dispatched` ➔ `Delivered`).

### 👑 3. Admin (Platform Overseer)
* **Book Approval Queue:** Dedicated portal to critically evaluate, authorize (`Approve & Publish`), or dismiss pending inventory requests.
* **Platform Control & Governance:** Ultimate power to forcibly unpublish or completely erase any malicious listing platform-wide.
* **User & Financial Auditing:** Update user roles (e.g., Promote to Admin/Librarian), handle structural account deletions, and access cross-platform ledger logs tracking every Stripe transaction ID, amount, and timestamp.

---

## ✨ Premium Challenges & Technical Implementations

* **🔒 Session-Drop Resilient (Better-Auth):** Configured specialized routing middleware preventing session expiration or fallback login redirections during hard page refreshes on private routes (`/dashboard/*`).
* **⭐ Verified Review System:** Advanced database-level checking ensures only users with verified `Delivered` status logs can rate and comment on a specific book's details page.
* **💳 Stripe Payment Pipeline:** Automated end-to-end payment webhook triggering immediate system state shifts from unpaid items to a validated `Pending Delivery` status.
* **🔍 Optimized Server-Side Pagination:** Seamless handling of high-density data on the Browse page featuring dynamic server-side pagination (6–12 items per page), multi-criteria range filtering (Category, Delivery Fee Range, Availability), and optimized real-time search strings.

---

## 🛠️ Modern Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI/UX** | Next.js 14 (App Router), Tailwind CSS, HeroUI / DaisyUI, Framer Motion (Animations) |
| **State & Auth** | Better-Auth (Role-Based Access Control), React Hooks |
| **Data Visualization** | Recharts / Chart.js |
| **Backend & API** | Node.js, Express.js, REST API Architecture, JWT Cookie Verification |
| **Database & Cloud** | MongoDB Atlas, Mongoose ODM, imgBB API (Image Hosting) |
| **Payment Gateway** | Stripe SDK Integration |
| **Alerts & Feedback** | React Hot Toast / React Toastify |

---

## 📦 Installed Dependencies & Packages

### Client-Side Packages:
* `next` (v14+)
* `tailwind-merge` & `clsx`
* `framer-motion` (Fluid UI animations)
* `recharts` / `chart.js` (Statistical dynamic charts)
* `lucide-react` (Modern icons including rebranded **X** logo)
* `react-hot-toast` (Asynchronous validation responses)

### Server-Side Packages:
* `express` (Core routing)
* `mongoose` (Object Data Modeling)
* `cors` (Secure Cross-Origin Resource Sharing rules)
* `dotenv` (Environment management)
* `stripe` (Financial processing)
* `jsonwebtoken` / `better-auth` node server integrations

---

## ⚙️ Environment Variables Setup

Ensure the following configuration keys are added in your root directories before executing local runtime environments:

