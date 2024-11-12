"use client"
import i18n from "@/lib/i18n";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";



const Header = () => {

    const {language, setLanguage} = useAppStore();

    console.log("language", language);

    useEffect(() => {
        if (language) {
          i18n.changeLanguage(language);
        }
      }, [language]);


      const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage); 
      };   


  return (
    <div className="text-black">
      <select
        name="language"
        id="language"
        value={language}
        onChange={handleLanguageChange}
        className="border rounded-md p-2"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  )
}

export default Header