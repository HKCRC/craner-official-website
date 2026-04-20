export interface ArticleSection {
  heading: string;
  body: string;
  image?: string;
}

export interface ArticleData {
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  content: string;
  client?: string;
  industry?: string;
  tags?: string[];
  sections?: ArticleSection[];
  gallery?: string[];
}

export const articles: Record<string, Record<string | "zh" | "en" | "zh-HK", ArticleData>> = {
    "1": {
        "zh": {
            title: "AI天秤系统成功应用于香港房屋署白田邨13期公营房屋重建项目",
            subtitle: "AI天秤系统首次成功应用于香港房屋署白田邨13期公营房屋重建项目，通过智能监控和预警功能，大幅提升工地安全性和施工效率。",
            coverImage: "/img/news/new01_cover.jpg",
            date: "2025/10/30",
            client: "香港房屋署",
            industry: "建筑",
            tags: ["AI天秤", "智能建造", "HKCRC", "InnoHK"],
            sections: [
                {
                    heading: "合作基石",
                    body: "作为HKCRC CraneR团队与香港房屋局战略合作的重要组成部分，AI天秤系统的开发与应用旨在解决建筑业劳动力短缺、提升工地安全及应对未来庞大的建屋需求。此次白田邨13期重建项目的成功实践，标志着政府与科研机构协作推动行业转型的重要里程碑。",
                    image: "/img/news/new01_cover.jpg"
                },
                {
                    heading: "安全革新",
                    body: `传统天秤操作需工人长时间在高空环境下工作，面临高空作业风险与极端天气挑战。HKCRC的AI天秤系统通过远程智能驾驶舱，让操作员在地面即可完成吊运指挥，彻底避免高空作业带来的安全隐患。一名操作员反馈："新系统让我们能在舒适环境中工作，彻底解决了如厕、用餐等基本需求难题。"\n\n此外，系统解决了建筑工人长期面临的职业健康问题：1）减少物理劳损：告别传统天秤操作需频繁攀爬与长时间蹲守的疲劳，降低腰背损伤与肌肉骨骼疾病风险；2）规避环境危害：操作员无需暴露于高温、强风或暴雨中，有效预防中暑与意外伤害。`
                },
                {
                    heading: "安全监测",
                    body: "系统配备的AI安全监测功能可自动识别吊钩周围3米范围内的人员，即时预警潜在风险，显著降低工地事故发生率。目前AI系统能兼容不同品牌天秤，适用于不同的工地环境，AI监测识别准确度达98%。",
                    image: "/img/news/new02_cover.jpeg"
                },
                {
                    heading: "效率提升",
                    body: `系统融合激光雷达与卫星定位技术，支持"点对点"自动路径规划，能在10秒内稳定吊钩摆动，其精准度相当于30年经验的操作员水平。实测数据显示，AI天秤每日吊运次数达130次，较传统天秤提升约30%，大幅缩短公营房屋建设工期。`
                },
                {
                    heading: "总结",
                    body: "此系统由HKCRC与香港房委会联合研发，为香港公营房屋项目中首创的应用案例。未来该技术将推广至东涌第42区公营房屋项目，并逐步纳入新工程合约，为香港智能建造的长远发展奠定坚实基础。"
                }
            ],
            content: `InnoHK香港智能建造研发中心（HKCRC）CraneR团队研发的AI天秤系统首次成功应用于香港房屋署白田邨13期公营房屋重建项目，通过创新技术实现工地安全与施工效率的双重变革。`
        },
        "en": {
            title: "AI Tower Crane System Successfully Applied in Hong Kong Housing Authority Pak Tin Estate Phase 13 Public Housing Redevelopment Project",
            subtitle: "The AI crane system has been successfully applied in the Hong Kong Housing Authority's Pak Tin Estate Phase 13 public housing redevelopment project, significantly improving site safety and construction efficiency through intelligent monitoring and early warning functions.",
            coverImage: "/img/news/new01_cover.jpg",
            date: "2025/10/30",
            client: "Hong Kong Housing Authority",
            industry: "Construction",
            tags: ["AI Tower Crane", "Smart Construction", "HKCRC", "InnoHK"],
            sections: [
                {
                    heading: "Foundation of Collaboration",
                    body: "As a key component of the strategic partnership between the HKCRC CraneR team and the Hong Kong Housing Bureau, the development and application of the AI Tower Crane System aim to address the construction industry's labor shortage, enhance site safety, and meet the massive future public housing demand. The successful implementation in the Pak Tin Estate Phase 13 redevelopment project marks a significant milestone in government-research institution collaboration to drive industry transformation.",
                    image: "/img/news/new01_cover.jpg"
                },
                {
                    heading: "Safety Revolution",
                    body: "Traditional tower crane operations require workers to work at height for extended periods, facing risks of working at heights and challenges from extreme weather. HKCRC's AI Tower Crane System introduces a remote intelligent control cabin, allowing operators to command lifting operations from the ground, completely eliminating safety hazards associated with working at height.\n\nIn addition, the system addresses long-standing occupational health challenges: Reduced physical strain eliminates the fatigue from frequent climbing and prolonged squatting. Operators no longer need to be exposed to high temperatures, strong winds, or heavy rain, effectively preventing heatstroke and accidental injuries."
                },
                {
                    heading: "Safety Monitoring",
                    body: "The system's AI safety monitoring function can automatically detect personnel within a 3-meter radius of the hook and provide immediate warnings of potential risks, significantly reducing the incidence of site accidents. The AI system is compatible with tower cranes of different brands and adaptable to various site environments, achieving a recognition accuracy of 98%.",
                    image: "/img/news/new02_cover.jpeg"
                },
                {
                    heading: "Efficiency Improvement",
                    body: "Integrating LiDAR and satellite positioning technologies, the system supports point-to-point automatic path planning, stabilizing the hook swing within 10 seconds, with precision equivalent to an operator with 30 years of experience. Field test data shows that the AI tower crane achieves approximately 130 lifts per day, representing an improvement of about 30% over traditional tower cranes."
                },
                {
                    heading: "Conclusion",
                    body: "This system was jointly developed by HKCRC and the Hong Kong Housing Authority, marking the first application case in Hong Kong's public housing projects. The technology will be extended to the Tung Chung Area 42 public housing project and gradually incorporated into new engineering contracts, laying a solid foundation for the long-term development of intelligent construction in Hong Kong."
                }
            ],
            content: `The AI Tower Crane System developed by the CraneR team of HKCRC under InnoHK has been successfully applied for the first time in the Hong Kong Housing Authority's Pak Tin Estate Phase 13 Public Housing Redevelopment Project.`
        },
        "zh-HK": {
            title: "AI天秤系統成功應用於香港房屋署白田邨13期公營房屋重建項目",
            subtitle: "AI天秤系統成功應用於香港房屋署白田邨13期公營房屋重建項目，通過智能監控和預警功能，大幅提升地盤安全性和施工效率。",
            coverImage: "/img/news/new01_cover.jpg",
            date: "2025/10/30",
            client: "香港房屋署",
            industry: "建築",
            tags: ["AI天秤", "智能建造", "HKCRC", "InnoHK"],
            sections: [
                {
                    heading: "合作基石",
                    body: "作為HKCRC CraneR團隊與香港房屋局戰略合作的重要組成部分，AI天秤系統的開發與應用旨在解決建造業勞動力短缺、提升地盤安全及應對未來龐大建屋需求。此次白田邨13期重建專案的成功實踐，標誌著政府與科研機構協作推動行業轉型的重要里程碑。",
                    image: "/img/news/new01_cover.jpg"
                },
                {
                    heading: "安全革新",
                    body: "傳統天秤操作需工人長時間在高空環境下工作，面臨高空作業風險與極端天氣挑戰。HKCRC的AI天秤系統通過遠端智慧駕駛艙，讓操作員在地面即可完成吊運指揮，徹底避免高空作業帶來的安全隱患。\n\n此外，系統解決了建築工人長期面臨的職業健康問題：1）減少物理勞損：告別傳統天秤操作需頻繁攀爬與長時間蹲守的疲勞，降低腰背損傷與肌肉骨骼疾病風險；2）規避環境危害：操作員無需暴露于高溫、強風或暴雨中，有效預防中暑與意外傷害。"
                },
                {
                    heading: "安全監測",
                    body: "系統配備的AI安全監測功能可自動識別吊鉤周圍3米範圍內的人員，即時預警潛在風險，顯著降低地盤事故發生率。目前AI系統能相容不同品牌天秤，適用於不同的地盤環境，AI監測識別準確度達98%。",
                    image: "/img/news/new02_cover.jpeg"
                },
                {
                    heading: "效率提升",
                    body: "系統融合雷射鐳射與衛星定位技術，支援「點對點」自動路徑規劃，能在10秒內穩定吊鉤擺動，其精准度相當於30年經驗的操作員水準。實測資料顯示，AI天秤每日吊運次數達130次，較傳統天秤提升約30%，大幅縮短公營房屋建設工期。"
                },
                {
                    heading: "總結",
                    body: "此系統由HKCRC與香港房委會聯合研發，為香港公營房屋專案中首創的應用案例。未來該技術將推廣至東湧第42區公營房屋專案，並逐步納入新工程合約，為香港智能建造的長遠發展奠定堅實基礎。"
                }
            ],
            content: `InnoHK香港智能建造研發中心（HKCRC）CraneR团队研發的AI天秤系統首次成功應用於香港房屋署白田邨13期公營房屋重建專案，通過創新技術實現工地安全與施工效率的雙重變革。`
        },
    },
    "2": {
        "zh": {
            title: "房委会项目首次应用人工智能塔吊系统　减少误差及提高建屋效率",
            subtitle: "房委会在白田邨公营房屋重建项目首次应用人工智能塔吊系统，塔吊操作员可于配备AI塔吊系统的地面智能驾驶舱遥距操控吊运工作，无需每日上落塔吊并长时间在高空工作。",
            coverImage: "/img/news/new02_cover.jpeg",
            date: "2025/10/30",
            client: "香港房屋委员会",
            industry: "建筑",
            tags: ["AI塔吊", "远程操控", "HKCRC", "房屋委员会"],
            sections: [
                {
                    heading: "项目简介",
                    body: "香港房屋委员会在白田邨公营房屋重建项目中首次应用人工智能天秤系统，天秤操作员可在配备AI天秤系统的地面智能驾驶舱内遥距操控吊运工作，无需每天攀爬天秤并长时间在高空作业。",
                    image: "/img/news/new02_cover.jpeg"
                },
                {
                    heading: "解决方案",
                    body: "该系统具备AI安全监测、吊钩稳定以及自动路线规划功能，结合激光雷达及卫星定位技术，能自动识别障碍物，由人工智能系统自动规划最合适的吊运路径，通过「点对点」辅助操作，大幅减少人为操作误差。"
                },
                {
                    heading: "实施成效",
                    body: "房屋署表示，应用AI天秤系统后，吊运效率提升约30%，有助提高整体建屋效率，初步成效令人满意。预计今年底将在东涌第42区一个公营房屋发展项目继续应用，若效果理想，未来将陆续在新工程合约中引入该系统。",
                    image: "/img/news/new01_cover.jpg"
                },
                {
                    heading: "操作员反馈",
                    body: "有使用AI天秤的操作员表示，需先接受约40小时的相关培训，操作方式与传统天秤基本一致，但加入AI技术后能显著提升工地安全。例如，系统可透过镜头自动识别吊钩3米范围内是否有人员存在，不同于以往只能依靠目测判断。操作员还提到，引入新系统后，工作环境得到改善，在工作期间解决如厕、用餐等基本需求也变得更加方便。"
                },
                {
                    heading: "总结",
                    body: "该系统由房委会及香港智能建造研发中心合作研究，目前正就相关技术申请专利。据中心介绍，系统研发成本约数百万元，AI监测准确度达98%，为香港建造业的智能化转型树立了新标杆。"
                }
            ],
            content: `香港房屋委員會在白田邨公營房屋重建項目中首次應用人工智能天秤系統。`
        },
        "en": {
            title: "Hong Kong Housing Authority Project First Application of AI Tower Crane System — Reduce Errors and Improve Construction Efficiency",
            subtitle: "The Hong Kong Housing Authority has successfully applied the AI tower crane system in the Pak Tin Estate public housing redevelopment project for the first time, eliminating the need to climb the tower daily and work long hours at height.",
            coverImage: "/img/news/new02_cover.jpeg",
            date: "2025/10/30",
            client: "Hong Kong Housing Authority",
            industry: "Construction",
            tags: ["AI Tower Crane", "Remote Control", "HKCRC", "Housing Authority"],
            sections: [
                {
                    heading: "Project Introduction",
                    body: "The Hong Kong Housing Authority has, for the first time, applied the Artificial Intelligence Tower Crane System in the Pak Tin Estate public housing redevelopment project. Tower crane operators can remotely control lifting operations from a ground-based intelligent control cabin equipped with the AI tower crane system, eliminating the need to climb the crane daily and work at height for extended periods.",
                    image: "/img/news/new02_cover.jpeg"
                },
                {
                    heading: "Solution",
                    body: "The system features AI safety monitoring, hook stabilization, and automatic route planning functions. By integrating LiDAR and satellite positioning technologies, it can automatically detect obstacles, and the AI system plans the most suitable lifting path. Through point-to-point assisted operation, human operational errors are significantly reduced."
                },
                {
                    heading: "Results",
                    body: "The Housing Department stated that the application of the AI tower crane system has improved lifting efficiency by approximately 30%, helping to enhance overall construction productivity, with initial results described as very satisfactory. The system is expected to be applied later this year in a public housing development project in Tung Chung Area 42.",
                    image: "/img/news/new01_cover.jpg"
                },
                {
                    heading: "Operator Feedback",
                    body: "An AI tower crane operator said that operators must first undergo about 40 hours of relevant training. The operation method is basically the same as that of a traditional tower crane, but the addition of AI technology significantly enhances site safety. The system can automatically detect through cameras whether there are people within a 3-meter radius of the hook, unlike the past when reliance was solely on visual judgment."
                },
                {
                    heading: "Conclusion",
                    body: "The system was jointly developed by the Housing Authority and the Hong Kong Centre for Construction Robotics. Patent applications for the relevant technologies are currently underway. The research and development cost of the system is approximately several million Hong Kong dollars, with the AI monitoring accuracy reaching 98%."
                }
            ],
            content: `The Hong Kong Housing Authority has, for the first time, applied the Artificial Intelligence Tower Crane System in the Pak Tin Estate public housing redevelopment project.`
        },
        "zh-HK": {
            title: "房委會項目首次應用人工智能天秤系統　減少誤差及提高建屋效率",
            subtitle: "房委會在白田邨公營房屋重建項目首次應用人工智能天秤系統，天秤操作員可於配備AI天秤系統的地面智能駕駛艙遙距操控吊運工作，無需每日上落天秤並長時間在高空工作。",
            coverImage: "/img/news/new02_cover.jpeg",
            date: "2025/10/30",
            client: "香港房屋委員會",
            industry: "建築",
            tags: ["AI天秤", "遙距操控", "HKCRC", "房委會"],
            sections: [
                {
                    heading: "項目簡介",
                    body: "房委會在白田邨公營房屋重建項目首次應用人工智能天秤系統，天秤操作員可於配備AI天秤系統的地面智能駕駛艙遙距操控吊運工作，無需每日上落天秤並長時間在高空工作。",
                    image: "/img/news/new02_cover.jpeg"
                },
                {
                    heading: "解決方案",
                    body: "系統具備AI安全監測、穩定吊鈎及自動規劃路線功能，結合雷射激光及衛星定位技術，能夠自動識別障礙物，以人工智能系統自動規劃最合適吊運路徑，透過「點對點」輔助操作，減少人手操作誤差。"
                },
                {
                    heading: "實施成效",
                    body: "房屋署表示，應用AI天秤系統令提升吊運效率提升約3成，可提高建屋效率，形容初步成效理想。今年底亦會在東涌第42區一個公營房屋發展項目應用，若效果滿意，未來陸續會在新工程合約引入應用。",
                    image: "/img/news/new01_cover.jpg"
                },
                {
                    heading: "操作員反饋",
                    body: "有AI天秤操作員說，要先接受40小時相關培訓，操作與傳統天秤基本一致，但加入AI技術更能提升工地安全，例如系統可透過鏡頭識別到吊鈎3米範圍內有無人，有別於以往只能靠目測。操作員又說，引入新系統後，可改善工作環境，亦方便在工作期間，解決如廁、用膳等。"
                },
                {
                    heading: "總結",
                    body: "系統由房委會及香港智能建造研發中心合作研究，正就有關技術申請專利。中心說，系統研發成本約數百萬元，準確度達98%，為香港建造業的智能化轉型樹立了新標桿。"
                }
            ],
            content: `房委會在白田邨公營房屋重建項目首次應用人工智能天秤系統。`
        },
    },
}
