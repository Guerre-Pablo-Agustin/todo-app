"use client";
import BackButton from "@/components/Panel/BackButton/BackButton";
import CreateForm from "@/components/Panel/CreateForm/CreateForm";

const page = () => {
  return (
    <section className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <div>
        <CreateForm />
      </div>
      <div className="mt-4 flex justify-end">
     <BackButton /> 
      </div>
    </section>
  );
};

export default page;
