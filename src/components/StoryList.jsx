import React from "react"

export default function StoryList({ users, onSelect }) {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4 bg-slate-50 dark:bg-slate-950">
      {users.map((user, index) => (
        <button key={user._id} onClick={() => onSelect({ userIndex: index, storyIndex: 0 })} className="flex-shrink-0">
          <img src={`https://quitter-git-main-sumitabha.vercel.app/avatar/${user.image}`} alt={user.username} className="w-16 h-16 rounded-full border-2 border-pink-500" />
          <p className="text-slate-950 dark:text-white  text-xs mt-1 text-center w-16 overflow-hidden truncate">{user.username}</p>
        </button>
      ))}
    </div>
  )
}