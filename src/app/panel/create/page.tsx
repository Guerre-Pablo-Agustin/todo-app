import CreateForm from "@/components/Panel/CreateForm/CreateForm"
import Link from "next/link"


const page = () => {
  return (
    <section className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
    <h1 className="text-2xl font-bold mb-4">Editar Tarea</h1>
    <div>
      <CreateForm />
    </div>
    <div className="mt-4 flex justify-end">
      <Link href="/panel/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </Link>
    </div>
  </section>
  )
}

export default page