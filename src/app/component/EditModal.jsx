"use client";

import { Button, Input, Modal, Surface } from "@heroui/react";
import { useState } from "react";
import { FaEdit, FaBookOpen } from "react-icons/fa";
import { editBooksId } from "../lib/api/books";

export function EditModal({ book }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      let finalImageUrl = book?.image || ""; 

      const imageFile = formData.get("image");
      
      if (imageFile && imageFile.name) {
        const uploadRes = await imageUpload(imageFile); 
        finalImageUrl = uploadRes.url;
      }
      
      const updatedBookData = { 
        title: data.title,
        description: data.description,
        price: Number(data.price),      
        quantity: Number(data.quantity), 
        image: finalImageUrl 
      };

      // API Call
      const result = await editBooksId(book?._id, updatedBookData);
      console.log("Updated Result:", result);
      
      setIsOpen(false); 
      window.location.reload(); 
    } catch (error) {
      console.error("Error updating book:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end p-2 sm:p-4">
        <Button 
          onPress={() => setIsOpen(true)} 
          className="rounded-xl flex items-center gap-2 border-purple-600 text-purple-700 hover:bg-purple-50 text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2" 
          variant="outline"
        >
          <FaEdit /> Edit Book
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="bottom-center" className="sm:baseline-center">
            <Modal.Dialog className="w-full max-w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
              <Modal.CloseTrigger className="cursor-pointer top-4 right-4 absolute p-1 text-gray-400 hover:text-gray-600">
   <span>✕</span> 
</Modal.CloseTrigger>
              
              <Modal.Header className="flex items-center gap-3 p-5 sm:p-6 pb-4 border-b border-gray-50 shrink-0">
                <div className="p-2.5 sm:p-3 bg-purple-50 text-purple-600 rounded-xl sm:rounded-2xl shrink-0">
                  <FaBookOpen className="size-4 sm:size-5" />
                </div>
                <div>
                  <Modal.Heading className="text-lg sm:text-xl font-bold text-gray-800">Edit Book Details</Modal.Heading>
                  <p className="text-xs text-gray-400">Update the fields below to modify book information</p>
                </div>
              </Modal.Header>

              <Modal.Body className="p-5 sm:p-6 overflow-y-auto grow">
                <Surface variant="default">
                  <form id="edit-book-form" onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5">
                    
                    {/* Book Title */}
                    <div className="w-full">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5 block">Book Title</label>
                      <Input 
                        name="title" 
                        type="text" 
                        defaultValue={book?.title || ""} 
                        placeholder="e.g., The Great Gatsby" 
                        className="w-full" 
                        required 
                      />
                    </div>

                    {/* Description */}
                    <div className="w-full">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5 block">Description</label>
                      <Input 
                        name="description" 
                        type="text" 
                        defaultValue={book?.description || ""} 
                        placeholder="Write a brief summary..." 
                        className="w-full" 
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5 block">Price ($)</label>
                        <Input 
                          name="price" 
                          type="number" 
                          step="0.01" 
                          defaultValue={book?.price || ""} 
                          placeholder="e.g., 12.99" 
                          className="w-full"
                          required 
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5 block">Quantity</label>
                        <Input 
                          name="quantity" 
                          type="number" 
                          defaultValue={book?.quantity || ""}
                          placeholder="e.g., 10" 
                          className="w-full"
                          required 
                        />
                      </div>
                    </div>

                    {/* Book Image Cover */}
                    <div className="w-full">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5 block">Book Cover Image</label>
                      <input 
                        name="image" 
                        type="file" 
                        accept="image/*"
                        className="w-full text-xs sm:text-sm text-slate-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-xl file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" 
                      />
                    </div>

                    <Modal.Footer className="pt-4 border-t border-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 shrink-0 px-0">
                      <Button 
                        onPress={() => setIsOpen(false)} 
                        variant="flat" 
                        className="w-full sm:w-auto cursor-pointer bg-gray-100 text-gray-600 rounded-xl font-medium"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 font-semibold sm:px-6 rounded-xl shadow-lg shadow-purple-100 disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? "Updating..." : "Save Changes"}
                      </Button>
                    </Modal.Footer>

                  </form>
                </Surface>
              </Modal.Body>
              
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}