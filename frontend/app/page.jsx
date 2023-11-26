"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  // const [boardId, setBoardId] = useState(null);
  const router = useRouter();

  const handleCreateBoard = async () => {
    // Make a request to your backend to create a new board and get the board ID
    const response = await fetch('http://localhost:8000/create_board', {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data.board_id);

    router.push(`/whiteboard/${data.board_id}?h=true`);
  };

  return (
    <div className='max-w-max mx-auto bg-red-600 text-white text-center p-20 mt-20'>
      <h1>Welcome to the Whiteboard App</h1>
      <button className='rounded-md bg-green-700 p-5 mt-5' onClick={handleCreateBoard}>Create New Board</button>
      {/* {boardId && (
        <div>
          <p>Board created! Share the link:</p>
          <Link to={`/board/${boardId}`}>{`http://your-frontend-url/board/${boardId}`}</Link>
        </div>
      )} */}
    </div>
  );
};
