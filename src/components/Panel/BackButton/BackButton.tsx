import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Trans } from "react-i18next";

const BackButton = () => {
  return (
    <>
      <Link href="/panel/">
        <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 gap-2 rounded shadow-md shadow-blue-500/50">
          <ArrowLeftCircleIcon className="ml-2 h-5 w-5" />
          <Trans i18nKey="panel.form.buttonBack">Back</Trans>
        </button>
      </Link>
    </>
  );
};

export default BackButton;
