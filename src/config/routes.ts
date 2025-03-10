import { redirectUriQueryKey } from "@/constants";

const routes = {
  home: "/",
  onboarding: (page: string) => `/onboarding/${page}`,
  lifestyleProduct: "/products/lifestyle",
  productByCategory: (categorySlug: string) =>
    `/products?category=${categorySlug}`,
  products: "/products",
  product: (slug: string) => `/products/${slug}`,

  register: "/register",
  passwordReset: "/password-reset",
  registerVerifyToken: (token: string) => `/register/verify/${token}`,

  vacancies: "/vacancies",
  vacancy: (vacancyId: string) => `/vacancies/${vacancyId}`,

  accountInformation: "/account-information",
  affiliatesPartner: "/affiliates-partner",
  alternative: "/alternative",
  cadeaubon: "/cadeaubon",
  cart: "/cart",
  contact: "/contact",
  cookieTerms: "/cookie-terms",
  faq: "/faq",
  howItWorks: "/how-it-works",
  logIn: "/log-in",
  logout: "/logout",
  lostPassword: "/lost-password",
  mealBoxSettings: "/meal-box-settings",
  nutritionalAdvice: "/nutritional-advice",
  orderHistory: "/order-history",
  order: "/order",
  ourStory: "/our-story",
  paymentOptions: "/payment-options",
  privacyPolicy: "/privacy-policy",
  returns: "/returns",
  supplementenadvies: "/supplementenadvies",
  thankYou: "/thank-you",
  weeklyMenu: "/weekly-menu",
  checkout: "/checkout",
};

export default routes;

export const registerRouteWithRedirectToOnboarding = `${
  routes.register
}?${redirectUriQueryKey}=${routes.onboarding("credentials")}`;

export const unAuthneticatedRoutes = [
  `${routes.register}/verify/(.*)?`,
  routes.register,
  routes.logIn,
  routes.logout,
  routes.lostPassword,
  `${routes.passwordReset}/(.*)?`,
];

export const authneticatedRoutes = [
  routes.mealBoxSettings,
  routes.accountInformation,
  routes.orderHistory,
  routes.onboarding("(.*)?"),
];
export const guestRoutes = [routes.checkout];
