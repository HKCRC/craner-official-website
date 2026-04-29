import { partnerList } from "@/constants";
import styles from "@/styles/cooperative.module.css";
import { LazyImage } from "./lazy-image";

export const CooperativePartner = () => {
  return (
    <div className="w-full overflow-hidden relative max-w-full bg-white py-5">
      <div className={styles.reviews_row1_wrap}>
        {new Array(4).fill("").map((_, idx) => (
          <div
            className={styles.reviews_row_1}
            style={{ gap: "20px" }}
            key={idx}
          >
            {partnerList.map((item, idx2) => (
              <LazyImage
                className="h-8 md:h-8 mr-2"
                src={item.url}
                alt=""
                key={idx2}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.logosShadowsLeft}></div>
      <div className={styles.logosShadowsRight}></div>
    </div>
  );
};
