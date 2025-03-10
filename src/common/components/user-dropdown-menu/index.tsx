import routes from "@/config/routes";
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
    url: routes.mealBoxSettings,
  },
  // {
  //   label: "informatie",
  //   icon: <AiOutlineUser />,
  //   url: routes.accountInformation,
  // },
  {
    label: "Hulp",
    url: "#",
  },
  {
    label: "Contact",
    url: routes.contact,
  },
  {
    label: "Uitloggen",
    icon: <RiLogoutBoxRLine />,
    url: routes.logout,
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
        <button className="__c_all __fv aspect-square h-9 overflow-hidden rounded-full border border-app-black duration-200 hover:scale-105">
          <LuUser className="size-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          loop
          align="end"
          sideOffset={10}
          className="rounded-xl border border-app-dark-grey bg-white"
        >
          {menuItems.map((menuItem, i) => (
            <DropdownMenu.Item key={i} asChild>
              <Link
                href={menuItem.url}
                onClick={() => {
                  if (menuItem.url == routes.logout) {
                    logout();
                  }
                }}
                className="__body_16 flex items-center gap-2.5 px-4 py-2.5 text-app-text outline-none data-[highlighted]:bg-app-black/5"
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
