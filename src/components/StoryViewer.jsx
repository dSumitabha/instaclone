import { useEffect, useRef, useState } from "react"

export default function StoryViewer({ users, active, setActive, onClose }) {
  const { userIndex, storyIndex } = active
  const user = users[userIndex]
  const story = user.stories[storyIndex]
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextStory()
          return 0
        }
        return prev + 2
      })
    }, 100)
    return () => clearInterval(intervalRef.current)
  }, [paused])

  function nextStory() {
    if (storyIndex + 1 < user.stories.length) {
      setActive({ userIndex, storyIndex: storyIndex + 1 })
    } else if (userIndex + 1 < users.length) {
      setActive({ userIndex: userIndex + 1, storyIndex: 0 })
    } else {
      onClose()
    }
  }

  function prevStory() {
    if (storyIndex > 0) {
      setActive({ userIndex, storyIndex: storyIndex - 1 })
    } else if (userIndex > 0) {
      const prevUser = users[userIndex - 1]
      setActive({ userIndex: userIndex - 1, storyIndex: prevUser.stories.length - 1 })
    } else {
      onClose()
    }
  }

  function getTimeAgo(iso) {
    const seconds = Math.floor((new Date() - new Date(iso)) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div
      className="relative w-full h-full text-white dark:text-slate-900"
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
    >
      <img src={`/stories/${story.image}`} alt="story" className="w-full h-full object-cover absolute top-0 left-0 z-0" />
      <div className="absolute top-0 left-0 w-full z-10 p-4">
        <div className="h-1 bg-white/30 rounded">
          <div className="h-1 bg-white rounded transition-all duration-100 linear" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center mt-2">
          <img src={`https://quitter-git-main-sumitabha.vercel.app/avatar/${user.image}`} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
          <span className="font-semibold text-sm dark:text-slate-50">{user.username}</span>
          <span className="ml-2 text-xs text-gray-300 dark:text-gray-700">{getTimeAgo(story.timestamp)}</span>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-1/2 h-full z-20" onClick={prevStory}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full z-20" onClick={nextStory}></div>
    </div>
  )
}