export interface CaseSection {
  heading: string;
  body: string;
  image?: string;
}

export interface CaseData {
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  content: string;
  partner?: string;
  partnerType?: string;
  industry?: string;
  tags?: string[];
  sections?: CaseSection[];
}

export const cases: Record<string, Record<string | "zh" | "en" | "zh-HK", CaseData>> = {
  "1": {
    "zh": {
      title: "携手香港房屋署，推进白田邨公营房屋重建项目智能化升级",
      subtitle: "与香港房屋署合作，在白田邨13期公营房屋重建项目中成功落地AI天秤系统，实现施工安全与效率的双重提升，标志着政府与科研机构协同推动建造业智能转型的重要里程碑。",
      coverImage: "/img/news/new01_cover.jpg",
      date: "2025/10/30",
      partner: "香港房屋署",
      partnerType: "政府部门",
      industry: "公营房屋",
      tags: ["AI天秤", "智能建造", "HKCRC", "InnoHK"],
      sections: [
        {
          heading: "合作背景",
          body: "香港建造业长期面临劳动力短缺、工地安全隐患及建屋周期压力等挑战。HKCRC CraneR团队与香港房屋署携手合作，以科技手段应对这些系统性难题，将AI天秤系统首次引入公营房屋建造现场。",
          image: "/img/news/new01_cover.jpg"
        },
        {
          heading: "合作成果",
          body: "AI天秤系统成功部署于白田邨13期工地，操作员通过地面智能驾驶舱即可完成高空吊运指令，彻底避免高空作业风险。系统配备AI安全监测功能，能自动识别吊钩3米范围内的人员并即时预警，AI识别准确率达98%。\n\n实测数据显示，每日吊运次数达130次，较传统天秤提升约30%，大幅缩短建设工期。该项目成为香港公营房屋工程中首个成功应用AI天秤系统的案例。"
        },
        {
          heading: "未来展望",
          body: "此次合作的成功经验将推广至东涌第42区公营房屋项目，并逐步纳入新工程合约体系。双方将持续深化合作，探索更多智能建造技术在公营房屋中的应用场景，为香港建造业的长远发展奠定坚实基础。"
        }
      ],
      content: "与香港房屋署合作，成功在白田邨13期公营房屋重建项目中落地AI天秤系统，实现安全与效率双重突破。"
    },
    "en": {
      title: "Partnering with Hong Kong Housing Authority to Advance Intelligent Upgrades in Pak Tin Estate Public Housing Redevelopment",
      subtitle: "In collaboration with the Hong Kong Housing Authority, the AI Tower Crane System was successfully deployed in the Pak Tin Estate Phase 13 public housing redevelopment project, achieving dual improvements in construction safety and efficiency—marking a significant milestone in government-research collaboration for smart construction transformation.",
      coverImage: "/img/news/new01_cover.jpg",
      date: "2025/10/30",
      partner: "Hong Kong Housing Authority",
      partnerType: "Government Department",
      industry: "Public Housing",
      tags: ["AI Tower Crane", "Smart Construction", "HKCRC", "InnoHK"],
      sections: [
        {
          heading: "Collaboration Background",
          body: "Hong Kong's construction industry has long faced challenges including labor shortages, site safety hazards, and housing construction timeline pressures. The HKCRC CraneR team joined hands with the Hong Kong Housing Authority to address these systemic challenges through technology, introducing the AI Tower Crane System to a public housing construction site for the first time.",
          image: "/img/news/new01_cover.jpg"
        },
        {
          heading: "Collaboration Outcomes",
          body: "The AI Tower Crane System was successfully deployed at the Pak Tin Estate Phase 13 site. Operators can now issue lifting commands from a ground-based intelligent control cabin, completely eliminating the risks associated with working at height. The system features AI safety monitoring that automatically detects personnel within 3 meters of the hook and issues immediate warnings, with an AI recognition accuracy of 98%.\n\nField data shows that daily lifting operations reached 130 cycles—approximately 30% higher than traditional cranes—significantly shortening construction timelines. This project became the first successful application case of the AI Tower Crane System in Hong Kong's public housing construction."
        },
        {
          heading: "Future Outlook",
          body: "The successful experience of this collaboration will be extended to the public housing project in Tung Chung Area 42 and gradually incorporated into new engineering contract frameworks. Both parties will continue to deepen collaboration, exploring more intelligent construction technology applications in public housing to lay a solid foundation for the long-term development of Hong Kong's construction industry."
        }
      ],
      content: "Partnered with the Hong Kong Housing Authority to successfully deploy the AI Tower Crane System in the Pak Tin Estate Phase 13 public housing redevelopment project, achieving breakthroughs in both safety and efficiency."
    },
    "zh-HK": {
      title: "攜手香港房屋署，推進白田邨公營房屋重建項目智能化升級",
      subtitle: "與香港房屋署合作，在白田邨13期公營房屋重建項目中成功落地AI天秤系統，實現施工安全與效率的雙重提升，標誌著政府與科研機構協同推動建造業智能轉型的重要里程碑。",
      coverImage: "/img/news/new01_cover.jpg",
      date: "2025/10/30",
      partner: "香港房屋署",
      partnerType: "政府部門",
      industry: "公營房屋",
      tags: ["AI天秤", "智能建造", "HKCRC", "InnoHK"],
      sections: [
        {
          heading: "合作背景",
          body: "香港建造業長期面臨勞動力短缺、地盤安全隱患及建屋週期壓力等挑戰。HKCRC CraneR團隊與香港房屋署攜手合作，以科技手段應對這些系統性難題，將AI天秤系統首次引入公營房屋建造現場。",
          image: "/img/news/new01_cover.jpg"
        },
        {
          heading: "合作成果",
          body: "AI天秤系統成功部署於白田邨13期地盤，操作員通過地面智能駕駛艙即可完成高空吊運指令，徹底避免高空作業風險。系統配備AI安全監測功能，能自動識別吊鉤3米範圍內的人員並即時預警，AI識別準確率達98%。\n\n實測數據顯示，每日吊運次數達130次，較傳統天秤提升約30%，大幅縮短建設工期。該項目成為香港公營房屋工程中首個成功應用AI天秤系統的案例。"
        },
        {
          heading: "未來展望",
          body: "此次合作的成功經驗將推廣至東涌第42區公營房屋項目，並逐步納入新工程合約體系。雙方將持續深化合作，探索更多智能建造技術在公營房屋中的應用場景，為香港建造業的長遠發展奠定堅實基礎。"
        }
      ],
      content: "與香港房屋署合作，成功在白田邨13期公營房屋重建項目中落地AI天秤系統，實現安全與效率雙重突破。"
    }
  },
  "2": {
    "zh": {
      title: "联合香港房屋委员会，共建香港首个AI塔吊智慧工地标准",
      subtitle: "与香港房屋委员会深度合作，在白田邨重建工程中联合研发并应用AI天秤系统，共同申请相关技术专利，探索将智能建造技术标准化、规模化应用于香港公营房屋工程的可行路径。",
      coverImage: "/img/news/new02_cover.jpeg",
      date: "2025/10/30",
      partner: "香港房屋委员会",
      partnerType: "法定机构",
      industry: "建筑与房屋",
      tags: ["AI塔吊", "联合研发", "专利申请", "智慧工地"],
      sections: [
        {
          heading: "联合研发历程",
          body: "香港房委会与HKCRC香港智能建造研发中心自项目立项起便紧密协作，共同参与系统的功能定义、测试验证和现场调试。双方投入数百万港元的联合研发资金，历经多轮迭代，最终形成适用于香港本地建造条件的AI天秤系统解决方案。",
          image: "/img/news/new02_cover.jpeg"
        },
        {
          heading: "技术创新与专利保护",
          body: "本次合作产生了多项核心技术创新，包括吊钩危险区域AI识别算法、点对点自动路径规划引擎、远程智能驾驶舱交互系统等。双方正就上述技术联合申请专利，以保护自主知识产权，推动技术的可持续发展与商业化应用。\n\nAI监测准确率达98%，系统可兼容不同品牌天秤，具备广泛的推广适用性。"
        },
        {
          heading: "行业标准引领",
          body: "此次合作不仅是一次技术应用的成功实践，更是为香港建造业制定智能化标准的重要探索。双方计划将本项目的经验整理成技术指引，向业界推广，并推动相关标准的制定，为香港智能建造生态体系的建立贡献力量。"
        }
      ],
      content: "与香港房屋委员会联合研发AI天秤系统，共同申请专利，探索香港智能建造标准化路径。"
    },
    "en": {
      title: "Joint Initiative with Hong Kong Housing Authority to Establish Hong Kong's First AI Crane Smart Site Standards",
      subtitle: "Through deep collaboration with the Hong Kong Housing Authority, the AI Tower Crane System was jointly developed and deployed at the Pak Tin Estate redevelopment project. Joint patent applications are underway to explore a standardized and scalable pathway for applying intelligent construction technologies in Hong Kong's public housing projects.",
      coverImage: "/img/news/new02_cover.jpeg",
      date: "2025/10/30",
      partner: "Hong Kong Housing Authority",
      partnerType: "Statutory Body",
      industry: "Construction & Housing",
      tags: ["AI Tower Crane", "Joint R&D", "Patent Application", "Smart Site"],
      sections: [
        {
          heading: "Joint R&D Journey",
          body: "The Hong Kong Housing Authority and HKCRC Hong Kong Centre for Construction Robotics collaborated closely from the inception of the project, jointly participating in system function definition, testing and validation, and on-site commissioning. Both parties invested millions of Hong Kong dollars in joint R&D funding and went through multiple iterations to ultimately develop an AI Tower Crane System solution tailored to Hong Kong's local construction conditions.",
          image: "/img/news/new02_cover.jpeg"
        },
        {
          heading: "Technical Innovation and Patent Protection",
          body: "This collaboration produced several core technical innovations, including an AI recognition algorithm for hook danger zones, a point-to-point automatic path planning engine, and a remote intelligent control cabin interaction system. Both parties are jointly applying for patents on these technologies to protect intellectual property rights and promote sustainable development and commercialization.\n\nThe AI monitoring accuracy reaches 98%, and the system is compatible with tower cranes of different brands, demonstrating broad applicability for wider adoption."
        },
        {
          heading: "Leading Industry Standards",
          body: "This collaboration is not only a successful practice of technology application but also an important exploration for setting intelligent standards for Hong Kong's construction industry. Both parties plan to compile the experiences of this project into technical guidelines for industry promotion and to drive the formulation of related standards, contributing to the establishment of Hong Kong's smart construction ecosystem."
        }
      ],
      content: "Jointly developed the AI Tower Crane System with the Hong Kong Housing Authority, filed joint patents, and explored a standardized pathway for smart construction in Hong Kong."
    },
    "zh-HK": {
      title: "聯合香港房屋委員會，共建香港首個AI天秤智慧地盤標準",
      subtitle: "與香港房屋委員會深度合作，在白田邨重建工程中聯合研發並應用AI天秤系統，共同申請相關技術專利，探索將智能建造技術標準化、規模化應用於香港公營房屋工程的可行路徑。",
      coverImage: "/img/news/new02_cover.jpeg",
      date: "2025/10/30",
      partner: "香港房屋委員會",
      partnerType: "法定機構",
      industry: "建築與房屋",
      tags: ["AI天秤", "聯合研發", "專利申請", "智慧地盤"],
      sections: [
        {
          heading: "聯合研發歷程",
          body: "香港房委會與HKCRC香港智能建造研發中心自項目立項起便緊密協作，共同參與系統的功能定義、測試驗證和現場調試。雙方投入數百萬港元的聯合研發資金，歷經多輪迭代，最終形成適用於香港本地建造條件的AI天秤系統解決方案。",
          image: "/img/news/new02_cover.jpeg"
        },
        {
          heading: "技術創新與專利保護",
          body: "本次合作產生了多項核心技術創新，包括吊鉤危險區域AI識別算法、點對點自動路徑規劃引擎、遠程智能駕駛艙交互系統等。雙方正就上述技術聯合申請專利，以保護自主知識產權，推動技術的可持續發展與商業化應用。\n\nAI監測準確率達98%，系統可兼容不同品牌天秤，具備廣泛的推廣適用性。"
        },
        {
          heading: "行業標準引領",
          body: "此次合作不僅是一次技術應用的成功實踐，更是為香港建造業制定智能化標準的重要探索。雙方計劃將本項目的經驗整理成技術指引，向業界推廣，並推動相關標準的制定，為香港智能建造生態體系的建立貢獻力量。"
        }
      ],
      content: "與香港房屋委員會聯合研發AI天秤系統，共同申請專利，探索香港智能建造標準化路徑。"
    }
  },
  "3": {
    "zh": {
      title: "与InnoHK香港智能建造研发中心深化产学研合作，构建建造业AI创新生态",
      subtitle: "作为InnoHK创新香港研发平台的重要成员，HKCRC CraneR团队持续深化与国际顶尖科研机构的产学研合作，将前沿AI研究成果转化为可实际落地的工程解决方案，推动香港建造业创新生态体系的形成。",
      coverImage: "/img/feature/f1.jpg",
      date: "2025/06/01",
      partner: "InnoHK / HKCRC",
      partnerType: "科研机构",
      industry: "科技研发",
      tags: ["InnoHK", "产学研", "AI研发", "香港科学园"],
      sections: [
        {
          heading: "研发生态合作",
          body: "InnoHK创新香港研发平台由香港特区政府创新科技署资助，旨在吸引海内外顶尖科研机构和企业落户香港，开展世界级研究与开发工作。HKCRC香港智能建造研发中心作为其核心成员，专注于AI、机器人技术与建造业的深度融合，为CraneR团队提供了强大的科研基础与资源支持。",
          image: "/img/feature/f1.jpg"
        },
        {
          heading: "核心技术突破",
          body: "依托InnoHK平台的科研资源，CraneR团队在多个核心技术方向取得重要突破：自研轻量化神经网络架构实现边缘设备30fps实时推理；融合LiDAR与卫星定位的点对点路径规划算法获工地验证；多传感器融合的全天候感知系统通过IP67认证。\n\n这些技术成果不仅在白田邨项目中得到成功验证，更形成了可复制推广的技术方案，具备向建造业更广泛应用场景延伸的潜力。"
        },
        {
          heading: "人才培育与知识转移",
          body: "通过与InnoHK生态体系内的高校及研究机构合作，CraneR团队积极开展人才培育与知识转移工作。定期举办技术研讨会与培训工作坊，为业界从业者提供智能建造技术的实践学习机会，培养香港本地建造科技人才，为行业的可持续发展注入新生力量。"
        }
      ],
      content: "依托InnoHK平台，深化产学研合作，将前沿AI技术转化为建造业可落地的工程解决方案。"
    },
    "en": {
      title: "Deepening Industry-Academia-Research Collaboration with InnoHK HKCRC to Build an AI Innovation Ecosystem for the Construction Industry",
      subtitle: "As a key member of the InnoHK Innovation Hong Kong Research and Development Platform, the HKCRC CraneR team continuously deepens its industry-academia-research collaboration with top international research institutions, transforming cutting-edge AI research results into practical engineering solutions and driving the formation of an innovative ecosystem for Hong Kong's construction industry.",
      coverImage: "/img/feature/f1.jpg",
      date: "2025/06/01",
      partner: "InnoHK / HKCRC",
      partnerType: "Research Institution",
      industry: "Technology R&D",
      tags: ["InnoHK", "Industry-Academia", "AI R&D", "Hong Kong Science Park"],
      sections: [
        {
          heading: "R&D Ecosystem Collaboration",
          body: "The InnoHK Innovation Hong Kong R&D Platform is funded by the Innovation and Technology Commission of the HKSAR Government, aiming to attract top research institutions and enterprises from around the world to Hong Kong to conduct world-class R&D work. HKCRC, as a core member, focuses on the deep integration of AI, robotics, and the construction industry, providing the CraneR team with a strong scientific research foundation and resource support.",
          image: "/img/feature/f1.jpg"
        },
        {
          heading: "Core Technology Breakthroughs",
          body: "Leveraging InnoHK platform resources, the CraneR team has achieved important breakthroughs in several core technology areas: a self-developed lightweight neural network architecture enabling 30fps real-time inference on edge devices; a point-to-point path planning algorithm integrating LiDAR and satellite positioning validated on construction sites; and an all-weather perception system with multi-sensor fusion passing IP67 certification.\n\nThese technological achievements have been successfully validated in the Pak Tin Estate project and have formed replicable and scalable technical solutions with the potential for broader applications across the construction industry."
        },
        {
          heading: "Talent Development and Knowledge Transfer",
          body: "Through collaboration with universities and research institutions within the InnoHK ecosystem, the CraneR team actively engages in talent development and knowledge transfer. Regular technical seminars and training workshops are held to provide industry practitioners with hands-on learning opportunities for intelligent construction technologies, cultivating local Hong Kong construction technology talent and injecting new vitality into the industry's sustainable development."
        }
      ],
      content: "Leveraging the InnoHK platform, deepening industry-academia-research collaboration to transform cutting-edge AI into practical engineering solutions for the construction industry."
    },
    "zh-HK": {
      title: "與InnoHK香港智能建造研發中心深化產學研合作，構建建造業AI創新生態",
      subtitle: "作為InnoHK創新香港研發平台的重要成員，HKCRC CraneR團隊持續深化與國際頂尖科研機構的產學研合作，將前沿AI研究成果轉化為可實際落地的工程解決方案，推動香港建造業創新生態體系的形成。",
      coverImage: "/img/feature/f1.jpg",
      date: "2025/06/01",
      partner: "InnoHK / HKCRC",
      partnerType: "科研機構",
      industry: "科技研發",
      tags: ["InnoHK", "產學研", "AI研發", "香港科學園"],
      sections: [
        {
          heading: "研發生態合作",
          body: "InnoHK創新香港研發平台由香港特區政府創新科技署資助，旨在吸引海內外頂尖科研機構和企業落戶香港，開展世界級研究與開發工作。HKCRC香港智能建造研發中心作為其核心成員，專注於AI、機器人技術與建造業的深度融合，為CraneR團隊提供了強大的科研基礎與資源支持。",
          image: "/img/feature/f1.jpg"
        },
        {
          heading: "核心技術突破",
          body: "依托InnoHK平台的科研資源，CraneR團隊在多個核心技術方向取得重要突破：自研輕量化神經網絡架構實現邊緣設備30fps實時推理；融合LiDAR與衛星定位的點對點路徑規劃算法獲地盤驗證；多傳感器融合的全天候感知系統通過IP67認證。\n\n這些技術成果不僅在白田邨項目中得到成功驗證，更形成了可複製推廣的技術方案，具備向建造業更廣泛應用場景延伸的潛力。"
        },
        {
          heading: "人才培育與知識轉移",
          body: "通過與InnoHK生態體系內的高校及研究機構合作，CraneR團隊積極開展人才培育與知識轉移工作。定期舉辦技術研討會與培訓工作坊，為業界從業者提供智能建造技術的實踐學習機會，培養香港本地建造科技人才，為行業的可持續發展注入新生力量。"
        }
      ],
      content: "依托InnoHK平台，深化產學研合作，將前沿AI技術轉化為建造業可落地的工程解決方案。"
    }
  }
};
