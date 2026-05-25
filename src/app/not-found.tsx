import Image from "next/image";
import { PillButton } from "@/components/primitives/PillButton";
import { media } from "@/lib/media";

export default function NotFound() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="container-x grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7">
          <div className="eyebrow mb-6">404</div>
          <h1 className="display display-tight" style={{ fontSize: "var(--t-h1)" }}>
            That page <span data-faint>didn&apos;t move in.</span>
          </h1>
          <p className="mt-8 max-w-[42ch] text-lg text-[var(--ink-soft)] leading-relaxed">
            The URL you tried doesn&apos;t exist on Vamar — yet. Head back home or
            meet the team.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillButton href="/">Back home</PillButton>
            <PillButton href="/agents" variant="ghost">Meet the agents</PillButton>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <Image
              src={media.notFound}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              quality={82}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
