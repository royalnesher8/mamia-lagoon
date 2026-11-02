import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left", id }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${tone === "dark" ? "text-sun-ink" : "text-sun"} ${centered ? "justify-center" : ""}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`title-display mt-5 text-[2.6rem] text-balance sm:text-5xl lg:text-[4rem] ${tone === "dark" ? "text-lagoon" : "text-ivory"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-base leading-relaxed text-pretty sm:text-lg ${tone === "dark" ? "text-charcoal/75" : "text-ivory/75"} ${centered ? "mx-auto max-w-2xl" : ""}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
