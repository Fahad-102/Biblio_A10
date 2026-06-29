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

  
    const toastId = toast.loading("Uploading book details and image... 📚");

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      
     
      const image = await imageUpload(data.image);
      
      if (!image?.url) {
        throw new Error("Image upload failed. Please try again.");
      }

      const books = {
        ...data,
        image: image.url,
        price: Number(data.price),      
        quantity: Number(data.quantity) 
      };    
      
      const result = await addBooks(books);

      if (result?.success || result) { 
        toast.update(toastId, {
          render: "New book added to the collection successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
        
        e.target.reset(); 
        setIsOpen(false);  
      } else {
        throw new Error("Could not save the book to the database.");
      }

    } catch (error) {
      console.error("Error adding book:", error);
      toast.update(toastId, {
        render: error.message || "Failed to add book. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="secondary" 
        className="bg-purple-700 text-white hover:bg-purple-800 cursor-pointer"
      >
        Add New Book
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl shadow-xl border border-slate-100">
            <Modal.CloseTrigger className="cursor-pointer" onClick={() => setIsOpen(false)} />
            
            <Modal.Header className="pb-2 border-b border-slate-100">
              <Modal.Heading className="text-xl font-bold text-slate-900">
                📚 Add a New Book
              </Modal.Heading>
            </Modal.Header>
            
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="add-book-form" onSubmit={onSubmit} className="flex flex-col gap-4">
                  
                  <TextField className="w-full" name="title" type="text" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Book Title</Label>
                    <Input placeholder="e.g., The Great Gatsby" className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="description" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Description</Label>
                    <Input placeholder="Write a brief summary..." className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="price" type="number" step="0.01" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Price ($)</Label>
                    <Input placeholder="e.g., 12.99" className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="quantity" type="number" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Quantity</Label>
                    <Input placeholder="e.g., 10" className="w-full" />
                  </TextField>

                  <TextField className="w-full" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Book Image</Label>
                    <input name="image" type="file" accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />
                  </TextField>

                  <Modal.Footer className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                    <Button type="button" variant="secondary" className="cursor-pointer" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      form="add-book-form"
                      disabled={loading}
                      className="bg-purple-700 text-white hover:bg-purple-900 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Adding..." : "Add Book"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}