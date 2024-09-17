import { UserSession, useUserSession } from "@/hooks/useUserSession";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";

const menuItems = [
  {
    label: "Instellingen",
    icon: <IoSettingsOutline />,
    url: "/meal-box-settings",
  },
  // {
  //   label: "informatie",
  //   icon: <AiOutlineUser />,
  //   url: "/account-information",
  // },
  {
    label: "Hulp",
    url: "#",
  },
  {
    label: "Contact",
    url: "/contact",
  },
  {
    label: "Uitloggen",
    icon: <RiLogoutBoxRLine />,
    url: "/logout",
  },
];

type Props = {
  user: UserSession;
};

const UserDropdownMenu = ({}: Props) => {
  const { logout } = useUserSession();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="h-9 aspect-square rounded-full border hover:scale-105 duration-200 border-app-black __c_all overflow-hidden __fv">
          <LuUser className="size-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          loop
          align="end"
          sideOffset={10}
          className="bg-white border border-app-dark-grey rounded-xl"
        >
          {menuItems.map((menuItem, i) => (
            <DropdownMenu.Item key={i} asChild>
              <Link
                href={menuItem.url}
                onClick={() => {
                  if (menuItem.url == "/logout") {
                    logout();
                  }
                }}
                className="flex items-center gap-2.5 __body_16 text-app-text data-[highlighted]:bg-app-black/5 outline-none px-4 py-2.5"
              >
                {menuItem.icon}
                {menuItem.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdownMenu;
