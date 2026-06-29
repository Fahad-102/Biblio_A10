import React from 'react'
import Link from 'next/link'
import { Button } from "@heroui/react"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">About BiblioDrop</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base mb-8 leading-relaxed">
          BiblioDrop is a next-generation decentralized digital library ecosystem built for avid readers, independent publishers, and smart librarians. We help bridge the gap between physical book sharing and tracking.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
            <h4 className="text-xl font-bold text-purple-700">Premium Books</h4>
            <p className="text-xs text-purple-600 mt-1">Access verified rare and academic collections globally.</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <h4 className="text-xl font-bold text-emerald-700">Smart UI</h4>
            <p className="text-xs text-emerald-600 mt-1">Seamless interaction built with Tailwind CSS & HeroUI.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <h4 className="text-xl font-bold text-amber-700">Secure Logs</h4>
            <p className="text-xs text-amber-600 mt-1">End-to-end token verification for role-based users.</p>
          </div>
        </div>

        <Link href="/browse-books">
          <Button color="secondary" size="lg" radius="xl" className="font-bold bg-purple-600 text-white hover:bg-purple-700">
            Explore Collection Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AboutPage