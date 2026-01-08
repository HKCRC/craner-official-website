import { useTranslation } from "next-export-i18n";
import { MotionRevealUp } from "./animated-text";
import Image from "next/image";

export const BusinessBox = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 px-6 md:px-0 overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="absolute inset-0 pointer-events-none flex justify-center">
        <div className="w-px h-full border-r border-dashed border-gray-300 opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <MotionRevealUp>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {t("business_box.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              {t("business_box.subtitle")}
            </p>
          </MotionRevealUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Perception System */}
          <MotionRevealUp delay={0.1} className="flex h-full">
            <div className="group flex flex-col w-full bg-slate-50 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="h-64 relative overflow-hidden">
                <Image
                  src="/img/feature/f2.jpg"
                  alt="Perception System"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-500 text-white text-[10px] rounded uppercase font-bold">
                      Vision
                    </span>
                    <span className="px-2 py-1 bg-cyan-500 text-white text-[10px] rounded uppercase font-bold">
                      Sensors
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-8 transition-transform duration-500 group-hover:-translate-y-8 bg-slate-50 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("business_box.card1_title")}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  {t("business_box.card1_desc")}
                </p>
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <a
                    href="https://ncnd27zbzpqm.feishu.cn/share/base/form/shrcna3DVeWa4aT72cjiAZF7v9c"
                    className="text-blue-600 font-bold flex items-center gap-2 group/link"
                  >
                    {t("business_box.learn_more")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </MotionRevealUp>

          {/* Card 2 - Edge Intelligence */}
          <MotionRevealUp delay={0.2} className="flex h-full">
            <div className="group flex flex-col w-full bg-slate-50 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                {/* Hardware Mockup / Real Image Slot */}
                <div className="absolute inset-0 opacity-40">
                  <Image
                    src="/img/business-swiper/safe.jpg"
                    alt="Edge Computing"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 w-4/5 h-3/4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                        Edge Status
                      </div>
                      <div className="text-xs text-green-400 font-mono">
                        RUNNING
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-blue-400"></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-white/60 font-mono">
                      <span>LATENCY: 12ms</span>
                      <span>LOAD: 42%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 transition-transform duration-500 group-hover:-translate-y-8 bg-slate-50 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("business_box.card2_title")}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  {t("business_box.card2_desc")}
                </p>
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <a
                    href="https://ncnd27zbzpqm.feishu.cn/share/base/form/shrcna3DVeWa4aT72cjiAZF7v9c"
                    target="_blank"
                    className="text-blue-600 font-bold flex items-center gap-2 group/link"
                  >
                    {t("business_box.learn_more")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </MotionRevealUp>

          {/* Card 3 - Connectivity */}
          <MotionRevealUp delay={0.3} className="flex h-full">
            <div className="group flex flex-col w-full bg-slate-50 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center p-6">
                <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-4">
                  <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        Modular Hardware Interface
                      </div>
                      <div className="text-[8px] text-slate-400 mt-1">
                        5G / Industrial Ethernet / Serial
                      </div>
                    </div>
                    <div className="px-2 py-0.5 bg-green-100 text-green-600 text-[8px] font-bold rounded">
                      5G ONLINE
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-500 font-bold mb-1">
                        Vibration Res.
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        MIL-STD-810H
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-[10px] text-slate-500 font-bold mb-1">
                        Protection
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        IP67 Rated
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-[10px] text-blue-600 font-bold">
                    <span>Extension Interface: 4x Sensor Port</span>
                    <div className="flex-1 border-t border-dashed border-blue-200"></div>
                  </div>
                </div>
              </div>
              <div className="p-8 transition-transform duration-500 group-hover:-translate-y-8 bg-slate-50 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("business_box.card3_title")}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  {t("business_box.card3_desc")}
                </p>
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <a
                    href="https://ncnd27zbzpqm.feishu.cn/share/base/form/shrcna3DVeWa4aT72cjiAZF7v9c"
                    className="text-blue-600 font-bold flex items-center gap-2 group/link"
                  >
                    {t("business_box.learn_more")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </MotionRevealUp>
        </div>
      </div>
    </section>
  );
};
