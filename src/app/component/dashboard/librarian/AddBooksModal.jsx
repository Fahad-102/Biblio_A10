"use client";
import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function AddBooksModal() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())

    console.log("Final Book Data :", data);

    try {
     
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button variant="secondary" className="bg-purple-700 text-white hover:bg-purple-800 cursor-pointer">
        Add New Book
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white rounded-2xl shadow-xl border border-slate-100">
            <Modal.CloseTrigger className="cursor-pointer" />
            
            <Modal.Header className="pb-2 border-b border-slate-100">
              <Modal.Heading className="text-xl font-bold text-slate-900">
                📚 Add a New Book
              </Modal.Heading>
            </Modal.Header>
            
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="add-book-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  <TextField className="w-full" name="title" type="text" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Book Title</Label>
                    <Input placeholder="e.g., The Great Gatsby" className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="description" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Description</Label>
                    <Input placeholder="Write a brief summary of the book..." className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="price" type="number" step="0.01" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Price ($)</Label>
                    <Input placeholder="e.g., 12.99" className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="quantity" type="number" variant="secondary" required>
                    <Label className="text-sm font-semibold text-slate-700 mb-1 block">Quantity</Label>
                    <Input placeholder="e.g., 10" className="w-full" />
                  </TextField>

                  <TextField className="w-full" name="coverImage" type="url" variant="secondary" required>
                    <Label type="file" className="text-sm font-semibold text-slate-700 mb-1 block">Book Image</Label>
                    <Input name="image" type="file" placeholder="book-cover.jpg" className="w-full" />
                  </TextField>

            <Modal.Footer className="p-6 pt-2 border-t border-slate-100 flex justify-end gap-2">
              <Button slot="close" variant="secondary" className="cursor-pointer">
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