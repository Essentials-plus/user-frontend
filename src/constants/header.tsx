import routes, { registerRouteWithRedirectToOnboarding } from "@/config/routes";

export const navigations = [
  {
    label: "Home",
    url: routes.home,
  },
  {
    label: "Bestellen",
    url: registerRouteWithRedirectToOnboarding,
  },
  {
    label: "Menu",
    url: routes.weeklyMenu,
  },
  {
    label: "Hoe werkt het?",
    url: routes.howItWorks,
  },
  {
    label: "Lifestyle",
    url: routes.lifestyleProduct,
  },
  // {
  //   label: "Inloggen",
  //   url: routes.logIn,
  //   // className: "text-app-dark-green hover:opacity-80",
  // },
];

export const productAccessNavigations = [
  {
    label: "Home",
    url: routes.home,
  },
  {
    label: "Bestellen",
    url: routes.order,
  },
  {
    label: "Menu",
    url: routes.weeklyMenu,
  },
  {
    label: "Hoe werkt het?",
    url: routes.howItWorks,
  },
  {
    label: "Lifestyle",
    url: routes.lifestyleProduct,
  },
];

export const allAccessNavigations = [
  {
    label: "Home",
    url: routes.home,
  },
  {
    label: "Menu",
    url: routes.weeklyMenu,
  },
  {
    label: "Hoe werkt het?",
    url: routes.howItWorks,
  },
  {
    label: "Lifestyle",
    url: routes.lifestyleProduct,
  },
];
