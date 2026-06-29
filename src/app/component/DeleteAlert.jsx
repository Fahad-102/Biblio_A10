"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { deleteBook } from "../lib/api/books";
import { toast } from "react-toastify"; 

export function DeleteAlert({ book, onDeleteSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting book from library... 🗑️");
    try {
      await deleteBook(book?._id);
      
      toast.update(toastId, {
        render: "Book deleted successfully.",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      setIsOpen(false); 
      
      setTimeout(() => {
        if (onDeleteSuccess) {
          onDeleteSuccess();
        } else {
          window.location.href = "/browse-books";
        }
      }, 1000);
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.update(toastId, {
        render: "Failed to delete the book.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onPress={() => setIsOpen(true)} 
        className="text-red-500 rounded-xl border border-red-500 hover:bg-red-50 flex items-center gap-1 text-sm px-3 py-1.5 cursor-pointer" 
        variant="bordered"
      >
        <BiTrash /> Delete
      </Button>

      <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container placement="center">
            <AlertDialog.Dialog className="w-full max-w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 p-5 sm:p-6 flex flex-col gap-4 relative">
              
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="top-4 right-4 absolute cursor-pointer text-gray-400 hover:text-gray-600 text-base p-1 font-bold z-30"
              >
                ✕
              </button>
              
              <AlertDialog.Header className="flex items-center gap-3 pb-2 border-b border-gray-50">
              
                <div className="p-2 bg-red-50 text-red-500 rounded-xl w-9 h-9 flex items-center justify-center text-lg shrink-0">
                  <BiTrash />
                </div>
                <AlertDialog.Heading className="text-base sm:text-lg font-bold text-gray-800">
                  Delete book permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              
              <AlertDialog.Body className="text-xs sm:text-sm text-gray-600 leading-relaxed py-2">
                <p>
                  This will permanently delete <strong>{book?.title || "this book"}</strong> and all of its
                  data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              
              <AlertDialog.Footer className="flex justify-end gap-2 sm:gap-3 pt-2 border-t border-gray-50">
                <Button 
                  onPress={() => setIsOpen(false)} 
                  variant="flat" 
                  className="bg-gray-100 text-gray-600 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </Button>
                <Button 
                  onPress={handleDelete} 
                  isLoading={loading}
                  color="danger"
                  variant="solid"
                  className="bg-red-600 text-white hover:bg-red-700 font-semibold rounded-xl shadow-lg cursor-pointer"
                >
                  Delete Book
                </Button>
              </AlertDialog.Footer>

            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}