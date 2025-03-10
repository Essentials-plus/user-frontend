import ClarnaIcon from "@/common/components/icons/clarna-icon";
import IDealIcon from "@/common/components/icons/i-deal-icon";
import MasterCardIcon from "@/common/components/icons/mastercard-icon";
import PayPalIcon from "@/common/components/icons/paypal-icon";
import routes from "@/config/routes";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const footer = {
  social: [
    {
      icon: <FaXTwitter className="text-[rgb(15,20,25)]" />,
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
          url: routes.ourStory,
        },
        {
          label: "Affiliates/Partners",
          url: routes.affiliatesPartner,
        },
        // {
        //   label: "Cadeaubon",
        //   url: routes.cadeaubon,
        // },
        {
          label: "Cookievoorwaarden",
          url: routes.cookieTerms,
        },
        {
          label: "Algemene voorwaarden",
          url: "https://www.dropbox.com/scl/fi/pcn0pxdnw4efon16ffeib/Bijlage-III-Leveringsvoorwaarden-Algemene-Voorwaarden-Essentialsplus.pdf?rlkey=gzgrnw2l2e0x2owbf5384g7th&dl=0",
        },
        {
          label: "Privacypolicy",
          url: routes.privacyPolicy,
        },
      ],
    },
    {
      label: "Advies+",
      links: [
        {
          label: "Voedingsadvies",
          url: routes.nutritionalAdvice,
        },
        {
          label: "Supplementenadvies",
          url: routes.supplementenadvies,
        },
      ],
    },
    {
      label: "Klantenservice+",
      links: [
        {
          label: "Contact",
          url: routes.contact,
        },
        {
          label: "Veelgestelde vragen",
          url: routes.faq,
        },
        {
          label: "Retourneren",
          url: routes.returns,
        },
        {
          label: "Betaalmogelijkheden",
          url: routes.paymentOptions,
        },
        {
          label: "Vacatures",
          url: routes.vacancies,
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
    // {
    //   icon: <MasterCashIcon className="w-12" />,
    // },
    {
      icon: <MasterCardIcon className="w-12" />,
    },
  ],
};
