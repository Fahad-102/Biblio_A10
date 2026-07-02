"use client";
import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { imageUpload } from "@/app/lib/imgUpload";
import { addBooks } from "@/app/lib/action/books";
import { toast } from "react-toastify";

export default function AddBooksModal() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Uploading book details...");

    try {
      const formData = new FormData(e.target);
      const file = formData.get("image"); 
      
      
      const image = await imageUpload(file);
      if (!image?.url) throw new Error("Image upload failed.");

      const rawData = Object.fromEntries(formData.entries());
      const bookData = {
        title: rawData.title,
        description: rawData.description,
        price: Number(rawData.price),
        quantity: Number(rawData.quantity),
        image: image.url,
        status: "pending" 
      };

      const result = await addBooks(bookData);

      if (result) {
        toast.update(toastId, { render: "Book added successfully! 🎉", type: "success", isLoading: false, autoClose: 3000 });
        e.target.reset();
        setIsOpen(false);
      } else {
        throw new Error("Failed to save book.");
      }
    } catch (error) {
      toast.update(toastId, { render: error.message, type: "error", isLoading: false, autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-purple-700 text-white hover:bg-purple-800 cursor-pointer">
        Add New Book
      </Button>

      <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold"> Add a New Book</Modal.Heading>
              </Modal.Header>
              
              <Modal.Body className="py-4">
                <form id="add-book-form" onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField name="title" aria-label="Book Title" required><Input placeholder="e.g., The Great Gatsby" /></TextField>
                  <TextField name="description" aria-label="Description" required><Input placeholder="Brief summary" /></TextField>
                  <TextField name="price" aria-label="Price" aria-activedescendantlabel="Price ($)" type="number" required><Input placeholder="12.99" /></TextField>
                  <TextField name="quantity" aria-label="Quantity" type="number" required><Input placeholder="10" /></TextField>
                  
                  <Label className="text-sm font-semibold text-slate-700">Book Image</Label>
                  <input name="image" type="file" accept="image/*" className="w-full text-sm p-2 border rounded-full" required />
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading} className="bg-purple-700 text-white">
                      {loading ? "Adding..." : "Add Book"}
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}