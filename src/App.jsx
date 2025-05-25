import { useState, useEffect } from "react"
import StoryList from "./components/StoryList"
import StoryViewer from "./components/StoryViewer"
import db from "./data/db.json"

export default function App() {
  const [users, setUsers] = useState([])
  const [activeStory, setActiveStory] = useState(null)

  useEffect(() => {
    setUsers(db.filter(user => user.stories && user.stories.length > 0))
  }, [])

  return (
    <section className="bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="w-full h-[100svh] overflow-hidden bg-slate-50 dark:bg-slate-950">
            {activeStory ? (
                <StoryViewer
                users={users}
                active={activeStory}
                onClose={() => setActiveStory(null)}
                setActive={setActiveStory}
                />
            ) : (
                <StoryList users={users} onSelect={setActiveStory} />
            )}
        </div>
    </section>
    
  )
} 