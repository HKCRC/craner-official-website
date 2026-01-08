import { partnerList } from "@/constants";
import styles from "@/styles/cooperative.module.css";

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
              <a href="" className={styles.reviews_card} key={idx2}>
                <img className="h-8 md:h-8 mr-2" src={item.url} alt="" />
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.logosShadowsLeft}></div>
      <div className={styles.logosShadowsRight}></div>
    </div>
  );
};
