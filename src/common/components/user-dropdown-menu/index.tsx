import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import routes from "@/config/routes";
import { UserSession, useUserSession } from "@/hooks/useUserSession";
import {
  HelpCircleIcon,
  LogOutIcon,
  PhoneIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { LuUser } from "react-icons/lu";

const menuItems = [
  {
    label: "Instellingen",
    icon: SettingsIcon,
    url: routes.mealBoxSettings,
  },
  // {
  //   label: "informatie",
  //   icon: <AiOutlineUser />,
  //   url: routes.accountInformation,
  // },
  {
    label: "Hulp",
    icon: HelpCircleIcon,
    url: "#",
  },
  {
    label: "Contact",
    icon: PhoneIcon,
    url: routes.contact,
  },
  {
    label: "Uitloggen",
    icon: LogOutIcon,
    url: routes.logout,
  },
];

type Props = {
  user: UserSession;
};

const UserDropdownMenu = ({}: Props) => {
  const { logout } = useUserSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="__c_all __fv aspect-square h-9 overflow-hidden rounded-full border-app-black duration-200 hover:scale-105 lg:border">
          <LuUser className="size-5 lg:size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        loop
        align="end"
        sideOffset={10}
        className="min-w-[160px] rounded-xl border border-app-dark-grey bg-white"
      >
        {menuItems.map((menuItem, i) => (
          <DropdownMenuItem
            key={i}
            asChild
            className="cursor-pointer rounded-lg"
          >
            <Link
              href={menuItem.url}
              onClick={() => {
                if (menuItem.url == routes.logout) {
                  logout();
                }
              }}
              className="__body_16 flex items-center gap-2.5 px-4 py-2.5 pl-3.5 text-app-text outline-none"
            >
              <menuItem.icon className="size-5" />
              {menuItem.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
