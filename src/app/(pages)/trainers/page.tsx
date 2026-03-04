import Footer from "@/components/Footer";

const trainers = [
  {
    name: "Parul",
    role: "Zumba Instructor",
    rating: 4.9,
    experience: "8+ Years",
    clients: "7,500+",
    specialty: "PCOD & Hormonal Balance",
    tags: ["Energetic", "Results-Focused", "Empowering"],
  },
  {
    name: "Shivangi",
    role: "Zumba & Flexibility Coach",
    rating: 4.8,
    experience: "10+ Years",
    clients: "6,500+",
    specialty: "Stress Relief",
    tags: ["Calming", "Mindful", "Gentle"],
  },
  {
    name: "Vanshika",
    role: "Strength & Power Yoga",
    rating: 4.9,
    experience: "3+ Years",
    clients: "12,000+",
    specialty: "Women-Focused Training",
    tags: ["Dynamic", "Challenging", "Inspiring"],
  },
];

export default function TrainersPage() {
  return (
    <main>
      <div className="pt-20 lg:pt-24" />
      <section id="trainers" className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3">
              Our Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Meet your expert trainers
            </h2>
            <p className="text-slate-500 text-base">
              Certified fitness & Zumba experts dedicated to your transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative bg-slate-900 px-6 pt-8 pb-6 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-4">
                    <span className="text-white text-2xl font-bold">
                      {trainer.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{trainer.role}</p>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-xs font-semibold">{trainer.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b border-slate-100">
                  <div className="text-center py-4 border-r border-slate-100">
                    <p className="text-slate-900 font-bold text-sm">{trainer.experience}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Experience</p>
                  </div>
                  <div className="text-center py-4 border-r border-slate-100">
                    <p className="text-slate-900 font-bold text-sm">{trainer.clients}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Clients</p>
                  </div>
                  <div className="text-center py-4">
                    <p className="text-primary font-bold text-xs">{trainer.specialty}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Specialty</p>
                  </div>
                </div>

                <div className="p-5 flex flex-wrap gap-2">
                  {trainer.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-slate-50 text-slate-600 text-xs px-3 py-1.5 rounded-lg border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
