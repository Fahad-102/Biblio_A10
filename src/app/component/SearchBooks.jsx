"use client"
import { Button, Input } from "@heroui/react"
import { redirect } from "next/navigation";

const SearchBooks = () => {
    const onsubmit = (e)=>{
        e.preventDefault();
        redirect(`/browse-books?search=${e.target.search.value}`)
    }
  return (
    <div >
       <form onSubmit={onsubmit} className="flex gap-4">
         <Button type="submit" className="bg-purple-700">Search</Button>
      <Input
      name="search"
      className="w-96"
      type="search"
      placeholder="Search Books"
      />
       </form>
    </div>
  )
}

export default SearchBooks