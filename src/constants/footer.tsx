import ClarnaIcon from "@/common/components/icons/clarna-icon";
import IDealIcon from "@/common/components/icons/i-deal-icon";
import MasterCashIcon from "@/common/components/icons/master-cash-icon";
import MasterCardIcon from "@/common/components/icons/mastercard-icon";
import PayPalIcon from "@/common/components/icons/paypal-icon";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";

export const footer = {
  social: [
    {
      icon: <IoLogoTwitter className="text-[#1DA1F2]" />,
      url: "#",
    },
    {
      icon: <FaFacebookF className="text-[#316FF6]" />,
      url: "#",
    },
    {
      icon: <FaInstagram className="text-[#ED4954]" />,
      url: "#",
    },
  ],

  navigations: [
    {
      label: "Essentials+",
      links: [
        {
          label: "Ons Verhaal",
          url: "/our-story",
        },
        {
          label: "Affiliates/Partners",
          url: "/affiliates-partner",
        },
        {
          label: "Cadeaubon",
          url: "#",
        },
        {
          label: "Cookievoorwaarden",
          url: "/cookie-terms",
        },
        {
          label: "Algemene voorwaarden",
          url: "https://www.dropbox.com/scl/fi/pcn0pxdnw4efon16ffeib/Bijlage-III-Leveringsvoorwaarden-Algemene-Voorwaarden-Essentialsplus.pdf?rlkey=gzgrnw2l2e0x2owbf5384g7th&dl=0",
        },
        {
          label: "Privacypolicy",
          url: "/privacy-policy",
        },
      ],
    },
    {
      label: "Advies+",
      links: [
        {
          label: "Voedingsadvies",
          url: "/nutritional-advice",
        },
        {
          label: "Supplementenadvies",
          url: "#",
        },
      ],
    },
    {
      label: "Klantenservice+",
      links: [
        {
          label: "Contact",
          url: "/contact",
        },
        {
          label: "Veelgestelde vragen",
          url: "/faq",
        },
        {
          label: "Retourneren",
          url: "/returns",
        },
        {
          label: "Betaalmogelijkheden",
          url: "/payment-options",
        },
        {
          label: "Vacatures",
          url: "#",
        },
      ],
    },
  ],

  paymentIcons: [
    {
      icon: <IDealIcon className="w-8" />,
    },
    {
      icon: <ClarnaIcon className="w-12" />,
    },
    {
      icon: <PayPalIcon className="w-12" />,
    },
    {
      icon: <MasterCashIcon className="w-12" />,
    },
    {
      icon: <MasterCardIcon className="w-12" />,
    },
  ],
};
