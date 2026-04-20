export interface ProductSection {
  heading: string;
  body: string;
  image?: string;
  imagePosition?: "left" | "right";
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  coverImage: string;
  carouselImages: { src: string; alt: string; caption?: string }[];
  stats: { value: string; label: string }[];
  sections: ProductSection[];
  faqs: ProductFAQ[];
  tags: string[];
  color: string;
}

export const products: Record<string, Product> = {
  "intelligent-crane": {
    id: "intelligent-crane",
    label: "智能塔吊系統",
    title: "CraneR 智能天秤系統",
    subtitle:
      "融合 AI 視覺感知、自動路徑規劃與雲端監控，為建築工地帶來前所未有的安全與效率提升。",
    coverImage: "/img/feature/f1.jpg",
    color: "blue",
    tags: ["AI 路徑規劃", "遠程監控", "安全警報"],
    carouselImages: [
      { src: "/img/feature/f1.jpg", alt: "智能天秤全景", caption: "工地全景監控" },
      { src: "/img/feature/f2.jpg", alt: "硬件細節", caption: "精密傳感器陣列" },
      { src: "/img/feature/f3.jpg", alt: "智能介面", caption: "AI 操控介面" },
      { src: "/img/feature/f4.jpg", alt: "施工現場", caption: "實際應用場景" },
    ],
    stats: [
      { value: "98%", label: "AI 準確度" },
      { value: "+30%", label: "效率提升" },
      { value: "130次", label: "每日吊運" },
      { value: "10s", label: "吊鉤穩定時間" },
    ],
    sections: [
      {
        heading: "AI 智能感知系統",
        body: "CraneR 智能天秤系統採用多維度感知融合技術，整合高精度攝像頭、LiDAR 點雲掃描與毫米波雷達，實現工地環境的全天候三維重建。系統能實時識別工人、設備、障礙物等多類別目標，並在毫秒級別完成危險評估。\n\n系統的核心 AI 引擎基於自研的輕量化神經網絡架構，在邊緣設備上實現 30fps 的實時推理速度，確保吊運過程中每一幀畫面都得到精準分析。即使在惡劣天氣、低能見度等極端環境下，系統依然能保持穩定可靠的感知能力。",
        image: "/img/feature/f1.jpg",
        imagePosition: "right",
      },
      {
        heading: "自動路徑規劃引擎",
        body: "基於實時三維地圖，CraneR 路徑規劃引擎能在複雜的工地環境中自動計算最優吊運路徑。系統綜合考慮障礙物位置、風速風向、載荷重量等多個維度，動態生成安全高效的運動軌跡。\n\n路徑規劃算法融合了強化學習與傳統機器人學方法，在保障安全的前提下最大化作業效率。系統還支持多台天秤的協同調度，通過雲端協調避免相互干擾，進一步提升整體工地的吊運吞吐量。",
        image: "/img/feature/f5.jpg",
        imagePosition: "left",
      },
      {
        heading: "雲端監控與數據分析",
        body: "所有吊運作業數據實時上傳至 CraneR 雲端平台，管理人員可通過網頁或手機 App 隨時查看工地狀態、設備健康指標和作業記錄。平台提供豐富的數據可視化功能，幫助管理層做出更明智的決策。\n\n系統自動生成每日、每週、每月報告，涵蓋作業效率、安全事件、設備狀態等關鍵指標。通過趨勢分析和異常檢測，系統能提前預警潛在的設備故障或安全風險，實現預測性維護。",
        image: "/img/feature/f3.jpg",
        imagePosition: "right",
      },
    ],
    faqs: [
      {
        question: "CraneR 智能系統需要改裝現有天秤嗎？",
        answer:
          "CraneR 系統設計為即插即用的加裝方案，可兼容市面上主流品牌的塔吊設備，無需大幅改裝。我們的工程師會上門評估現有設備，提供定制化的安裝方案，通常安裝調試周期為 2-3 個工作日。",
      },
      {
        question: "系統在惡劣天氣下（如強風、大雨）能正常工作嗎？",
        answer:
          "是的。CraneR 採用多傳感器融合架構，即使單一傳感器受天氣影響，系統仍能通過其他傳感器維持穩定感知。硬件設備均達到 IP67 防護等級，可在香港本地常見的惡劣天氣條件下穩定運行。此外，系統集成了氣象數據接口，可根據風速自動調整作業策略。",
      },
      {
        question: "系統是否符合香港建造業的安全法規要求？",
        answer:
          "CraneR 系統完全符合香港勞工處、屋宇署及建造業議會的相關安全規定。系統已通過多項第三方安全認證，並在多個大型政府基建項目中成功應用，積累了豐富的本地合規經驗。",
      },
      {
        question: "如何獲得技術支持和培訓？",
        answer:
          "CraneR 提供全面的售後服務體系，包括：現場安裝調試、操作人員培訓、7×24 小時遠程技術支持，以及定期系統巡檢和軟件更新。我們在香港設有本地技術支持團隊，確保問題能在最短時間內得到響應和解決。",
      },
      {
        question: "系統是否支持購買或租賃？",
        answer:
          "兩種模式均支持。購買方案適合長期持有設備的承建商，享有完整所有權和更低的長期成本；租賃方案則適合項目制需求，按月計費，靈活部署，無需大額前期投入。歡迎聯絡我們的銷售團隊獲取定制報價。",
      },
    ],
  },
  "path-planning": {
    id: "path-planning",
    label: "路徑規劃系統",
    title: "AI 智能路徑規劃",
    subtitle:
      "實時三維環境重建與動態障礙物規避，讓天秤吊運路徑更短、更安全、更可預測。",
    coverImage: "/img/feature/f5.jpg",
    color: "indigo",
    tags: ["3D 建圖", "動態規避", "多機協同"],
    carouselImages: [
      { src: "/img/feature/f5.jpg", alt: "路徑規劃主視圖", caption: "三維路徑可視化" },
      { src: "/img/feature/f6.jpg", alt: "地圖細節", caption: "精細環境建模" },
      { src: "/img/feature/f7.jpg", alt: "檢測細節", caption: "動態障礙物檢測" },
      { src: "/img/feature/f8.jpg", alt: "執行細節", caption: "精準路徑執行" },
    ],
    stats: [
      { value: "<50ms", label: "規劃延遲" },
      { value: "99.5%", label: "避障成功率" },
      { value: "360°", label: "感知範圍" },
      { value: "±5cm", label: "定位精度" },
    ],
    sections: [
      {
        heading: "實時三維環境建模",
        body: "系統採用高密度 LiDAR 點雲與雙目視覺相機的融合方案，在工地範圍內構建厘米級精度的三維動態地圖。地圖以 10Hz 的頻率持續更新，能夠即時反映工地環境的變化，包括人員走動、設備移位、新增障礙物等。\n\n三維地圖不僅用於路徑規劃，還為操作員提供直觀的第三視角工地全景，讓坐在控制室的操作員能如身臨其境般掌握吊運全局，大幅降低操作難度和出錯風險。",
        image: "/img/feature/f6.jpg",
        imagePosition: "right",
      },
      {
        heading: "動態多目標協同規劃",
        body: "面對多台天秤同時作業的複雜場景，CraneR 路徑規劃引擎採用分布式協同算法，通過雲端統一調度，確保各台設備的運動路徑不發生衝突。系統支持優先級設定，緊急作業任務可優先獲得路徑資源。\n\n協同規劃算法具備自適應能力，當某台設備出現故障或任務變更時，系統能在秒級時間內重新計算所有受影響設備的路徑，保持整體作業的連續性和安全性。",
        image: "/img/feature/f7.jpg",
        imagePosition: "left",
      },
      {
        heading: "路徑執行與精準控制",
        body: "規劃好的路徑通過高精度伺服控制系統執行，實時比對實際軌跡與規劃軌跡的偏差，在毫秒級別進行修正補償。吊鉤姿態控制算法能有效抑制擺動，在目標位置實現快速穩定，大幅縮短每次吊運的等待時間。\n\n系統全程記錄路徑執行數據，包括速度曲線、加速度分佈、偏差統計等，為後續的設備維護和性能優化提供數據支撐。",
        image: "/img/feature/f8.jpg",
        imagePosition: "right",
      },
    ],
    faqs: [
      {
        question: "路徑規劃系統能處理多複雜的工地環境？",
        answer:
          "系統已在香港多個大型地盤（包括超高層建築、密集城市環境）中成功應用，能夠處理層疊腳手架、臨時建築結構等高複雜度環境。地圖精度達厘米級，障礙物識別類別超過 20 種。",
      },
      {
        question: "系統如何處理突發障礙物（如意外入場人員）？",
        answer:
          "系統以 30fps 的頻率持續掃描環境，一旦檢測到新出現的障礙物，路徑規劃引擎立即啟動緊急重規劃流程，在 50ms 內生成新的安全路徑。同時系統會發出聲光警報，提醒相關人員注意安全。",
      },
      {
        question: "多台天秤協同作業時如何避免互相干擾？",
        answer:
          "通過雲端集中調度系統，所有天秤的實時位置和規劃路徑都在統一的三維空間模型中進行衝突檢測。系統採用時空分離策略，確保任何時刻都不會有兩台設備佔用同一空間區域。",
      },
      {
        question: "路徑規劃系統能否與現有的工地管理系統集成？",
        answer:
          "系統提供標準的 REST API 和 Webhook 接口，可與主流工地管理平台、BIM 系統和 ERP 系統無縫集成。我們的技術團隊可協助定制集成方案，確保數據的互聯互通。",
      },
    ],
  },
  "ai-safety": {
    id: "ai-safety",
    label: "AI 安全監控",
    title: "AI 工地安全守衛",
    subtitle:
      "全天候 AI 視覺監控系統，自動識別危險行為與安全隱患，構建工地零事故防線。",
    coverImage: "/img/feature/f9.jpg",
    color: "sky",
    tags: ["危險區域檢測", "行為識別", "實時警報"],
    carouselImages: [
      { src: "/img/feature/f9.jpg", alt: "AI 安全檢測", caption: "AI 危險識別" },
      { src: "/img/feature/f10.jpg", alt: "吊鉤穩定", caption: "吊鉤姿態監控" },
      { src: "/img/feature/f11.jpg", alt: "工地安全全覽", caption: "全場景安全覆蓋" },
      { src: "/img/feature/f1.jpg", alt: "人員識別", caption: "人員軌跡追蹤" },
    ],
    stats: [
      { value: "3-3-3", label: "安全標準" },
      { value: "<1s", label: "警報響應" },
      { value: "24/7", label: "全天候監控" },
      { value: "0", label: "目標事故率" },
    ],
    sections: [
      {
        heading: "動態危險區域劃定",
        body: "系統根據天秤的實時位置、吊運載荷的形狀和尺寸，動態計算並標定地面危險禁區。危險區域隨吊運物的移動而即時更新，避免了固定禁區覆蓋不足或過度限制作業的問題。\n\n3D LiDAR 精確測量吊運物離地高度，配合「3-3-3」安全規則：危險區域 3 米範圍內清場、離地至少 300 毫米方可移動、保持穩定 3 秒後確認安全。系統全自動執行這一流程，無需人工干預。",
        image: "/img/feature/f9.jpg",
        imagePosition: "right",
      },
      {
        heading: "AI 人員行為識別",
        body: "深度學習模型對工地攝像頭畫面進行逐幀分析，能識別包括未佩戴安全帽、進入危險區域、危險站姿等十餘種安全違規行為。識別準確率超過 95%，誤報率控制在 2% 以下，確保警報的有效性和操作員的信任。\n\n系統支持人員身份識別功能，可與門禁系統聯動，記錄每名工人的安全合規情況，為工地安全管理提供客觀的數據依據。",
        image: "/img/feature/f10.jpg",
        imagePosition: "left",
      },
      {
        heading: "多通道即時警報系統",
        body: "一旦檢測到安全威脅，系統立即通過多個通道同步發出警報：現場聲光警報器、操作員控制台彈窗、主管手機推送通知。警報信息包含事件類型、位置坐標和現場截圖，幫助管理人員快速做出判斷。\n\n所有警報事件自動存檔，包括事前 30 秒和事後 30 秒的完整視頻記錄，形成完整的事故調查鏈路。管理平台提供警報統計分析功能，幫助識別高風險時段和區域，有針對性地加強管理。",
        image: "/img/feature/f11.jpg",
        imagePosition: "right",
      },
    ],
    faqs: [
      {
        question: "系統能識別哪些類型的安全違規行為？",
        answer:
          "目前系統支持識別：未佩戴安全帽/安全背心、進入吊運危險區域、在高空邊緣站立/坐姿、闖入機械作業區域、非授權人員進入管制區域等 15 種以上的違規行為，並持續通過機器學習迭代更新識別能力。",
      },
      {
        question: "系統如何處理個人私隱問題？",
        answer:
          "CraneR 安全系統嚴格遵守香港《個人資料（私隱）條例》。人員身份識別功能為可選配置，視頻數據在本地加密存儲，訪問受嚴格權限控制。我們提供數據保留策略定制服務，可根據客戶需求設定自動刪除周期。",
      },
      {
        question: "攝像頭在夜間或低光環境下能正常工作嗎？",
        answer:
          "系統配備了具備星光級感光能力的工業攝像頭，結合紅外補光設備，可在極低照度環境（低至 0.001lux）下保持清晰畫面。AI 識別模型針對低光環境單獨訓練，確保夜間作業的識別準確率。",
      },
      {
        question: "警報系統會不會因為誤報太多而被操作員忽略？",
        answer:
          "我們非常重視誤報問題。系統採用多模型投票機制，只有當多個模型達成一致判斷時才會觸發警報。同時，系統設有警報優先級分級，緊急威脅立即警報，低風險提示以非干擾方式呈現，確保操作員的注意力集中在真正重要的警報上。",
      },
      {
        question: "系統需要多少個攝像頭才能覆蓋整個工地？",
        answer:
          "覆蓋範圍因工地形狀和設備數量而異。我們的工程師會在初期現場勘測後提供最優的攝像頭布點方案，通常中型工地（約 5000 平方米）需要 8-12 個攝像頭實現全覆蓋，同時最大化減少盲角。",
      },
    ],
  },
};
