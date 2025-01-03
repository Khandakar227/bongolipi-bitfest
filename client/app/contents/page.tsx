import { Plus } from "lucide-react"
import Link from "next/link"

function Contents() {
  return (
    <div className="min-h-screen py-12 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-bold">Manage your Contents</h1>
        <Link href={"/contents/create"} className="flex justify-center items-center gap-2 bg-primary p-2 pr-4 rounded text-white"><Plus/><span>Create</span></Link>
      </div>
    </div>
  )
}

export default Contents