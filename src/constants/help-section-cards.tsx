import { essentialsPlusEmail } from "@/constants";
import { BsTelephone } from "react-icons/bs";
import { IoChatboxOutline, IoMailOutline } from "react-icons/io5";

export const helpSectionCards = [
  {
    icon: <IoMailOutline />,
    title: "Mail",
    description: "Stel je vraag in de mail of fanmail",
    value: (
      <a href={`mailto:${essentialsPlusEmail}`} className="hover:underline">
        {essentialsPlusEmail}
      </a>
    ),
  },
  {
    icon: <IoChatboxOutline />,
    title: "Chat",
    description: "Vraag het digitaal in de chat",
    value: (
      <a href="https://wa.me/+8801606594843" className="hover:underline">
        Chat on WhatsApp
      </a>
    ),
  },
  {
    icon: <BsTelephone />,
    title: "Telefoon",
    description: "Op werkdagen van 08:30 tot 17:00",
    value: (
      <a href="tel:+8801606594843" className="hover:underline">
        Call Us
      </a>
    ),
  },
];
