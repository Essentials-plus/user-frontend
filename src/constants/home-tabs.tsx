import BreakfastIcon from "@/common/components/icons/breakfast-icon";
import DinnerIcon from "@/common/components/icons/dinner-icon";
import LunchIcon from "@/common/components/icons/lunch-icon";
import SnackIcon from "@/common/components/icons/snack-icon";

export const homeTabs = [
  {
    tabKey: "home-tab-1",
    contentKey: "breakfast",
    trigger: {
      icon: <BreakfastIcon className="h-[55px]" />,
      title: "Ontbijt",
    },
    content: {
      cards: [
        {
          imgSrc: "/imgs/plate.jpg",
          title: "Havermout met kiwi & Pindakaas",
          calories: "483 kcal",
          fats: "22 gr",
          protein: "23 gr",
        },
        {
          imgSrc: "/imgs/plate-1.jpg",
          title: "Ontbijt smooth met bramen & havermout",
          calories: "538 kcal",
          fats: "15 gr",
          protein: "43 gr",
        },
        {
          imgSrc: "/imgs/plate-2.jpg",
          title: "Brood met geitenkaas & jam",
          calories: "485 kcal",
          fats: "21 gr",
          protein: "23 gr",
        },
        {
          imgSrc: "/imgs/plate-3.jpg",
          title: "Kwark met noten & rozijnen",
          calories: "480 kcal",
          fats: "21 gr",
          protein: "25 gr",
        },
      ],
    },
  },
  {
    tabKey: "home-tab-2",
    contentKey: "lunch",
    trigger: {
      icon: <LunchIcon className="h-[55px]" />,
      title: "Lunch",
    },
    content: {
      cards: [
        {
          imgSrc: "/imgs/plate.jpg",
          title: "Havermout met kiwi & Pindakaas",
          calories: "483 kcal",
          fats: "22 gr",
          protein: "23 gr",
        },
        {
          imgSrc: "/imgs/plate-1.jpg",
          title: "Ontbijt smooth met bramen & havermout",
          calories: "538 kcal",
          fats: "15 gr",
          protein: "43 gr",
        },
      ],
    },
  },
  {
    tabKey: "home-tab-3",
    contentKey: "dinner",
    trigger: {
      icon: <DinnerIcon className="h-[55px]" />,
      title: "dinner",
    },
    content: {
      cards: [
        {
          imgSrc: "/imgs/plate-2.jpg",
          title: "Brood met geitenkaas & jam",
          calories: "485 kcal",
          fats: "21 gr",
          protein: "23 gr",
        },
        {
          imgSrc: "/imgs/plate-3.jpg",
          title: "Kwark met noten & rozijnen",
          calories: "480 kcal",
          fats: "21 gr",
          protein: "25 gr",
        },
      ],
    },
  },
  {
    tabKey: "home-tab-4",
    contentKey: "snack",

    trigger: {
      icon: <SnackIcon className="h-[55px]" />,
      title: "snack",
    },
    content: {
      cards: [
        {
          imgSrc: "/imgs/plate.jpg",
          title: "Havermout met kiwi & Pindakaas",
          calories: "483 kcal",
          fats: "22 gr",
          protein: "23 gr",
        },
        {
          imgSrc: "/imgs/plate-1.jpg",
          title: "Ontbijt smooth met bramen & havermout",
          calories: "538 kcal",
          fats: "15 gr",
          protein: "43 gr",
        },
      ],
    },
  },
];
