import KanbanBoard from "@/components/Panel/KanbanBoard/KanbanBoard"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Kanban Board',
};

const page = () => {
  return (
    <section>
      <KanbanBoard />
    </section>
  )
}

export default page