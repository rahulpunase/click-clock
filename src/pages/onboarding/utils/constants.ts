import office from "@/assets/steps/office.svg";
import others from "@/assets/steps/others.svg";
import personal from "@/assets/steps/personal.svg";

export const options = ["work", "personal", "others"] as const;

export const optionsMap: Record<(typeof options)[number], { image: string }> = {
  work: {
    image: office,
  },
  personal: {
    image: personal,
  },
  others: {
    image: others,
  },
};
