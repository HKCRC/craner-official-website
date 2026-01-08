import { TextGradient } from "@/components/text-block";

// YouTube for non-mainland, 1080 for mobile, 4k for desktop, 1080 have no size differen than 4k, i give up

export const subtitleGradient1: TextGradient = {
    deg: 270,
    from: "#204DA0",
    to: "#06b2b1",
  };
  
export const subtitleGradient2: TextGradient = {
    deg: 90,
    from: "#204DA0",
    to: "#06b2b1",
 };

export const sliderImagesMultiView = (t: any) => {
  return [
    {
      name: t("video_slider.prompts1.first"),
      path: "./video/first.webm",
      poster: "/img/poster/p2.jpg"
    },
    {
      name: t("video_slider.prompts1.second"),
      path: "",
      poster: "/img/poster/p1.jpg"
    },
  ]
}


  export const sliderImagesMultiStyle = (t: any) => {
    return [
      {
        name: t("video_slider.prompts2.first"),
        path: "./vid/test1.mp4",
        poster: "vid/test1-0001.png"
      },
      {
        name: t("video_slider.prompts2.second"),
        path: "./vid/test2.mp4",
        poster: "vid/test2-0002.png"
      },
      {
        name: t("video_slider.prompts2.third"),
        path: "./vid/test3.mp4",
        poster: "vid/test3-0003.png"
      },
    ];
  }



export const partnerList = [
  {
   url: "/img/cooperation/017.png",
  },
  {
   url: "/img/cooperation/015.png",
   href: "",
  },
  {
   url: "/img/cooperation/016.png",
   href: "",
  },
  {
   url: "/img/cooperation/023.png",
   href: "",
  },
  {
   url: "/img/cooperation/019.png",
   href: "",
  },
  {
   url: "/img/cooperation/020.png",
   href: "",
  },
  {
   url: "/img/cooperation/021.png",
   href: "",
  },
  {
   url: "/img/cooperation/022.png",
   href: "",
  },
  {
    url: "/img/cooperation/024.png",
    href: "",
   },
   {
    url: "/img/cooperation/025.png",
    href: "",
   },
   {
    url: "/img/cooperation/026.png",
    href: "",
   },
   {
    url: "/img/cooperation/018.png",
    href: "",
   },
]

export enum VIDEO_INTRO_ENUM {
   "TOP" = "0",
   "BOTTOM" = "1"
}



export const matchText = (t: (key: string) => string) => [
  `<strong class="text-2xl">${t('video_prompts_module.feature1_01_desc')}</strong>`,
  `<strong class="text-2xl">${t('video_prompts_module.feature1_02_desc')}</strong>`,
]


export const businessEmail = "cranerbusiness@craner.hk";