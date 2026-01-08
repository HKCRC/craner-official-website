/* eslint-disable @next/next/no-img-element */
import { useForm, SubmitHandler, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsCN } from "@/scripts/utils";
import { useTranslation } from "next-export-i18n";
import { businessEmail } from "@/constants";

const ENDPOINT =
  "https://env-1gy344xr89dc3a71-1251089768.ap-shanghai.app.tcloudbase.com/submit";

const nonemptyMsg = { message: "Required" };
const formSchema = z.object({
  name: z.string().nonempty(nonemptyMsg),
  email: z.string().email().nonempty(nonemptyMsg),
  industry: z.string().nonempty(nonemptyMsg),
  company: z.string().nonempty(nonemptyMsg),
  company_size: z.string().nonempty(nonemptyMsg),
  contact_method: z.string(),
  contact_number: z.string(),
  role: z.string().nonempty(nonemptyMsg),
});

const industries = [
  "Architecture Service",
  "Advertising, Publishing, and Media",
  "Digital Media, Software, and Technology",
  "Education & Student",
  "Interior Design Service",
  "Real Estate",
  "Retail Businesses",
  "Product Design",
  "Video Game",
  "Other",
];

const roles = [
  "Architect",
  "Business Owner/Co-founder",
  "CAD Manager",
  "3D Concept/Previz",
  "3D Lighting Artist",
  "3D Modeler/Asset Creator",
  "Designer",
  "Drafter",
  "Design Director/Supervisor",
  "Interior Designer",
  "Producer",
  "Procurement Buyer",
  "Product Designer",
  "Studio Owner",
  "Social Media Specialist",
  "Student or Researcher",
  "Other",
];

const companySizes = [
  "1-10",
  "10-100",
  "100-500",
  "500-1000",
  "1000-10000",
  "10000+",
];

const contactMethods = ["Phone", "WhatsApp", "Skype", "WeChat", "Other"];

type Inputs = z.infer<typeof formSchema>;

function FormControl({
  children,
  title,
  error,
  required,
}: {
  title: string;
  error?: FieldError;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="form-control w-full my-1">
      <label className="label">
        <span className="label-text">
          {title}
          {required && <span className="text-red-600">*</span>}
        </span>
      </label>
      {children}
      {error ? (
        <label className="label">
          <span className="label-text-alt text-red-600">{error.message}</span>
        </label>
      ) : null}
    </div>
  );
}

export default function WaitingListForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });
  const isCN = useIsCN();
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [interestMap, setInterestMap] = useState<{ [key: string]: boolean }>({
    "AI Floorplan Design": false,
    "Concept Rendering": false,
    "Generate Keynote Pitch": false,
    "Replicate Design Guideline": false,
  });

  useEffect(() => {
    // Check record if saved
    const submittedBefore = localStorage.getItem("craner-waitlist-submitted");
    if (submittedBefore) {
      setSubmittedEmail(submittedBefore);
      setIsSubmitted(true);
    }
  }, []);

  const enableSubmitAgain = () => {
    localStorage.setItem("craner-waitlist-submitted", "");
    setIsSubmitted(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsSubmitting(true);
      const mergedData = {
        ...data,
        preferred_feat: Object.keys(interestMap).filter(
          (key) => interestMap[key]
        ),
        device_info: navigator.userAgent,
      };
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mergedData),
      });
      const json = await res.json();
      if (!json || !json.status) {
        throw new Error(json?.msg);
      }
      setIsSubmitted(true);
      setSubmittedEmail(data.email);
      // Save submitted info to local storage
      localStorage.setItem("craner-waitlist-submitted", data.email);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTextInput = (
    title: string,
    id: keyof Inputs,
    placeholder: string,
    required = true
  ) => {
    return (
      <FormControl title={title} required={required} error={errors[id]}>
        <input
          className="input waitlist-input input-bordered"
          {...register(id)}
          placeholder={placeholder}
        />
      </FormControl>
    );
  };

  const renderSelectInput = (
    title: string,
    id: keyof Inputs,
    options: string[],
    required = true
  ) => {
    return (
      <FormControl title={title} required={required} error={errors[id]}>
        <select
          className="select select-bordered waitlist-input"
          {...register(id)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {t(`form.selectOptions.${id}.${option}`)}
            </option>
          ))}
        </select>
      </FormControl>
    );
  };

  const renderInterests = () => {
    return (
      <FormControl title={t("form.feature")} required={false}>
        <div className="grid gap-2 md:grid-cols-2">
          {Object.keys(interestMap).map((interest) => (
            <div
              className={`input waitlist-input input-bordered flex items-center gap-3 cursor-pointer ${
                interestMap[interest] ? "selected" : ""
              }`}
              key={interest}
              onClick={() => {
                setInterestMap((prev) => ({
                  ...prev,
                  [interest]: !prev[interest],
                }));
              }}
            >
              <input
                type="checkbox"
                name={interest}
                className={`checkbox scale-90 ${
                  interestMap[interest] ? "checkbox-primary" : ""
                }`}
                checked={interestMap[interest]}
              />
              <div className="text-sm">{t(`form.interests.${interest}`)}</div>
            </div>
          ))}
        </div>
      </FormControl>
    );
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <motion.div
          className="mt-10 mb-5"
          transition={{ staggerChildren: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, type: "spring", damping: 20 }}
          >
            <img
              src="/img/success.svg"
              className="w-24 h-24 m-auto"
              alt="success"
            />
          </motion.div>

          <motion.div
            className="text-2xl font-bold mt-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.2,
              type: "spring",
              damping: 20,
            }}
          >
            {submittedEmail && submittedEmail !== ""
              ? t("form.success_before")
              : t("form.success1")}
          </motion.div>
          <motion.div
            className="opacity-60 my-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            transition={{
              duration: 0.25,
              delay: 0.3,
              type: "spring",
              damping: 20,
            }}
          >
            {submittedEmail && submittedEmail !== ""
              ? submittedEmail
              : t("form.success2")}
          </motion.div>

          {/* <motion.div
            className="opacity-100 my-1 mt-24 cursor-pointer hover:text-indigo-600"
            onClick={() => enableSubmitAgain()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: .5, type: "spring", damping: 20 }}>
              <span>{t("form.success_submit_again")}</span>
          </motion.div> */}
        </motion.div>

        <motion.div
          className="mt-6 mb-8"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, type: "spring", damping: 20 }}
        >
          <div className="mb-2">
            <>
              <div className="divider text-gray-400">{t("form.wechat")}</div>
              <div className="grid grid-cols-3 justify-items-center items-center mt-5 mb-6 px-2">
                <div className="flex flex-col items-center">
                  <img
                    src="/img/wx_qrcode.png"
                    className="w-24 z h-24 lg:w-32 lg:h-32 ml-3 mr-3"
                    alt="wechat qr"
                  />
                  <a
                    href="https://wa.me/64378432?text=Hello, I'm interested in your services."
                    target="_blank"
                    className="text-[10px] bg-gray-500 mt-1 border border-gray-50 rounded-full px-2 py-1"
                  >
                    WhatsApp
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="/img/hgwhatsapp.png"
                    className="w-24 z h-24 lg:w-32 lg:h-32 ml-3 mr-3"
                    alt="wechat qr"
                  />
                  <a
                    href="https://wa.me/64876758?text=Hello, I'm interested in your services."
                    target="_blank"
                    className="text-[10px] bg-gray-500 mt-1 border border-gray-50 rounded-full px-2 py-1"
                  >
                    WhatsApp
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="/img/hgwx.png"
                    className="w-24 z h-24 lg:w-32 lg:h-32 ml-3 mr-3"
                    alt="wechat qr"
                  />
                  <p className="text-[10px] bg-gray-500 mt-1 border border-gray-50 rounded-full px-2 py-1">
                    Wechat
                  </p>
                </div>
              </div>
            </>
            {/* {isCN ? (
            <>
              <div className="divider text-gray-400">{t("form.wechat")}</div>
              <img src="/img/wechat_qr.png" className="w-36 h-36 m-auto" alt="wechat qr" />
            </>
          ) : (
            <div className="h-24">
              <div className="divider text-gray-400">{t("form.ph")}</div>
              <PHLogo />
            </div>
          )} */}

            <a href={`mailto:${businessEmail}`}>Email: {businessEmail}</a>
            <p>Tel: +852 64378432</p>
            <p>+86 13926508390</p>
            <p>+852 64876758</p>

            <button
              onClick={() =>
                window.open(
                  "https://ncnd27zbzpqm.feishu.cn/share/base/form/shrcna3DVeWa4aT72cjiAZF7v9c",
                  "_blank"
                )
              }
              className="btn btn-success mt-4 mx-3 hover:bg-green-600 border-black hover:border-black"
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
              >
                <path
                  d="M127.2 256c0-70.4 57.6-128 128-128s128 57.6 128 128-57.6 128-128 128-128-57.6-128-128z m641.6 128c70.4 0 128-57.6 128-128s-57.6-128-128-128-128 57.6-128 128 56.8 128 128 128z m0 64c-70.4 0-128 57.6-128 128v51.2L512 701.6l-128-74.4V576c0-70.4-57.6-128-128-128s-128 57.6-128 128v288c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V701.6l110.4 64c0.8 0 0.8 0.8 1.6 0.8 9.6 5.6 21.6 6.4 32 0l112.8-65.6V864c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V576c0-70.4-57.6-128-128-128z"
                  p-id="13288"
                ></path>
              </svg>

              <p className="ml-2">{t("form.business_opportunities")}</p>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <form
      data-theme="light"
      className={`flex flex-col transition-all h-full overflow-hidden ${
        isSubmitting ? "opacity-50 pointer-events-none cursor-wait" : ""
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-2xl font-bold pr-2">{t("form.title")}</div>
      <div className="opacity-60 mb-3 mr-16 pr-2">{t("form.subtitle")}</div>

      <div className="overflow-y-scroll flex-1 nobar">
        {renderTextInput(t("form.name"), "name", t("form.preferred-name"))}
        {renderTextInput(t("form.email"), "email", "example@mail.com")}
        {renderSelectInput(t("form.industry"), "industry", industries)}

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3">
          <div className="col-span-2">
            {renderTextInput(
              t("form.company"),
              "company",
              t("form.company-inc")
            )}
          </div>
          <div>
            {renderSelectInput(
              t("form.company-size"),
              "company_size",
              companySizes
            )}
          </div>
        </div>

        {renderSelectInput(t("form.role"), "role", roles)}

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3">
          <div>
            {renderSelectInput(
              t("form.contact-method"),
              "contact_method",
              contactMethods,
              false
            )}
          </div>
          <div className="col-span-2">
            {renderTextInput(
              t("form.number-or-id"),
              "contact_number",
              t("form.phone-or-social-media-id"),
              false
            )}
          </div>
        </div>

        {renderInterests()}
      </div>

      <div className="w-full h-[1px] md:h-0 absolute left-0 bottom-[5.97rem] bg-black opacity-[0.15]"></div>

      <input
        className="main-btn mt-5 h-12 !rounded-full"
        type="submit"
        value={t("form.submit")}
      />
    </form>
  );
}
