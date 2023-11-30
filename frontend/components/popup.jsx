import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBoardPopup() {

    const router = useRouter();

    const handleCreateBoard = async () => {
        // Make a request to the backend to create a new board and get the board ID
        const response = await fetch('http://localhost:8000/create_board', {
        method: 'POST',
        });
        const data = await response.json();

        router.push(`/whiteboard/${data.board_id}?h=true`);
    };


    return (
        <div className="bg-white rounded-2xl p-10 max-w-[400px]">
            <h1 className="text-[30px] text-center pb-5">Continue without signing In?</h1>
            <div className="max-w-max mx-auto flex flex-row gap-5">
                <button className="bg-blue-700 text-white mx-auto py-3 px-5 rounded-xl">Sign In</button>
                <button className="bg-red-600 text-white mx-auto py-3 px-5 rounded-xl" onClick={handleCreateBoard}>Create my board</button>
            </div>
        </div>
    )
}