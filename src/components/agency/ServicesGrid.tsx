import type { Service } from "../../types";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div key={service.title} className="rounded-2xl border border-black/10 p-6 hover:border-orange/40 transition-colors">
          <h3 className="text-lg font-black text-black">{service.title}</h3>
          <p className="mt-2 text-sm text-black/60">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
