"use client"
import {Pagination, Table} from "@heroui/react";
import Link from "next/link";

export default function BookTable({booksData}) {
    const books = booksData.data;
    const page = booksData.page;
    const pages = []
    const totalPages = booksData.totalPage;
    for(let i=1; i<=totalPages; i++){
        pages.push(i)
    }
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-150">
          <Table.Header>
            <Table.Column isRowHeader>#</Table.Column>
            <Table.Column>Title</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Quantity</Table.Column>
          </Table.Header>
          <Table.Body>
           {books.map((book,index)=> <Table.Row key={book._id}>
              <Table.Cell>{index+1}</Table.Cell>
              <Table.Cell>{book.title}</Table.Cell>
              <Table.Cell>{book.price}</Table.Cell>
              <Table.Cell>{book.quantity}</Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm" className="flex justify-center">
         
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
              >
                <Link className="flex gap-2" href={`/dashboard/librarian/books?page=${page-1}`}>
                <Pagination.PreviousIcon />
                Prev
                </Link>
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                
                <Link href={`/dashboard/librarian/books?page=${p}`}>
                <Pagination.Link className={`${p === page && 'bg-purple-700 text-white'}`} isActive={p === page}>
                  {p}
                </Pagination.Link>
                </Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
              >
                <Link className="flex gap-2" href={`/dashboard/librarian/books?page=${page+1}`}>
                Next
                <Pagination.NextIcon />
                </Link>
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}