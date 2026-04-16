export default function AuditLoadingPage() {
  return (
    <div className="page-shell py-6 md:py-10">
      <div className="space-y-4">
        <section className="panel grid-halo overflow-hidden rounded-[36px] p-6 md:p-8">
          <div className="relative z-10 animate-pulse space-y-4">
            <div className="h-6 w-40 rounded-full bg-white/70" />
            <div className="h-14 max-w-3xl rounded-[28px] bg-white/75" />
            <div className="h-5 max-w-2xl rounded-full bg-white/60" />
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-28 rounded-[24px] bg-white/70" />
              ))}
            </div>
          </div>
        </section>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          {Array.from({ length: 2 }).map((_, index) => (
            <section key={index} className="panel h-[460px] rounded-[32px] bg-white/70" />
          ))}
        </div>
      </div>
    </div>
  );
}
