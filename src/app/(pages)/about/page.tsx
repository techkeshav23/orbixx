import Link from "next/link";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main>
      <div className="pt-16 lg:pt-20" />

      {/* ── Main Content ── */}
      <section className="py-16 md:py-20 bg-[#ffdee4]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

          {/* ── About Orbixx ── */}
          <div className="mb-20">
            <span className="text-primary text-xs font-mono tracking-[0.3em] uppercase block mb-4">
              // ABOUT US
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Story</span>
            </h2>

            <div className="rounded-3xl bg-gradient-to-br from-white to-pink-50 border border-pink-200 p-7 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 leading-tight relative z-10 max-w-3xl">
                Empowering people to live <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">healthier, stronger, and more confident</span> lives.
              </h3>

              <div className="grid md:grid-cols-2 gap-8 sm:gap-12 relative z-10 items-center">
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Orbixx Fitness is a dynamic wellness platform built to make fitness simple, effective, and accessible. From high-energy Zumba to guided home workouts, we combine modern fitness techniques with a supportive, motivating community.
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    At its core, we stand for <strong className="text-slate-900">dedication, growth, and transformation</strong>—helping you develop healthy habits that last a lifetime.
                  </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-sm">
                  <h4 className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-primary uppercase mb-3">Leadership</h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    <strong className="text-slate-900 text-lg">Nitin Upadhyay</strong> and <strong className="text-slate-900 text-lg">Ram Saini</strong> are the founders of ORBIXX FITNESS. Our mission goes beyond physical appearance. We are here to inspire you to move more, stay stronger, and build unwavering confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Founders + HQ Split ── */}
          <div className="grid lg:grid-cols-5 gap-8 items-start mb-20">

            {/* Founders — Left */}
            <div className="lg:col-span-3">
              <span className="text-primary text-xs font-mono tracking-[0.3em] uppercase block mb-4">
                // THE PEOPLE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
                Meet the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Founders</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Nitin */}
                <div className="group relative rounded-2xl overflow-hidden border border-pink-300 bg-white hover:border-transparent transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-7">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent group-hover:bg-white/20 flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                      <span className="text-white text-xl font-black">NU</span>
                    </div>
                    <h4 className="font-black text-slate-900 group-hover:text-white text-lg transition-colors duration-500">Nitin Upadhyay</h4>
                    <p className="text-primary group-hover:text-white/80 text-sm font-bold mt-1 transition-colors duration-500">Founder</p>
                    <p className="text-slate-500 group-hover:text-white/60 text-xs mt-3 transition-colors duration-500">
                      Visionary behind Orbixx&apos;s mission to make fitness accessible for every woman in India.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>

                {/* Ram */}
                <div className="group relative rounded-2xl overflow-hidden border border-pink-300 bg-white hover:border-transparent transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-7">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent group-hover:bg-white/20 flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                      <span className="text-white text-xl font-black">RS</span>
                    </div>
                    <h4 className="font-black text-slate-900 group-hover:text-white text-lg transition-colors duration-500">Ram Saini</h4>
                    <p className="text-secondary group-hover:text-white/80 text-sm font-bold mt-1 transition-colors duration-500">Founder</p>
                    <p className="text-slate-500 group-hover:text-white/60 text-xs mt-3 transition-colors duration-500">
                      Driving operations and growth to bring world-class fitness experiences online.
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </div>
            </div>

            {/* Headquarters — Right */}
            <div className="lg:col-span-2">
              <span className="text-primary text-xs font-mono tracking-[0.3em] uppercase block mb-4">
                // HEADQUARTERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">
                Where it all
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> started</span>
              </h2>
              <div className="relative rounded-2xl overflow-hidden bg-white border border-pink-300 p-7">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-[40px]" />
                <div className="relative z-10">
                  <p className="text-slate-900 font-bold text-base mb-1">Orbixx Fitness</p>
                  <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-primary to-accent mb-4" />
                  <p className="text-slate-600 text-sm leading-relaxed">
                    45, Jairambagh Colony<br />
                    Near 100 Feet Road<br />
                    Dayalbagh, Agra<br />
                    Uttar Pradesh — 282005<br />
                    India
                  </p>
                </div>
              </div>

              {/* Live Map */}
              <div className="mt-5 rounded-2xl overflow-hidden border border-pink-300 shadow-sm">
                <iframe
                  title="Orbixx Fitness Location"
                  src="https://maps.google.com/maps?q=45+Jairambagh+Colony+Dayalbagh+Agra+282005&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* ── Contact Methods ── */}
          <div>
            <span className="text-primary text-xs font-mono tracking-[0.3em] uppercase block mb-4">
              // REACH OUT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8">
              Get in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> Touch</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Email */}
              <a
                href="mailto:info.orbixxfitness@gmail.com"
                className="group relative rounded-2xl p-8 border border-pink-300 bg-white hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Email Us</h3>
                  <p className="text-slate-500 text-sm mb-3">We reply within 24 hours</p>
                  <span className="text-primary text-sm font-bold group-hover:underline">info.orbixxfitness@gmail.com</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl p-8 border border-pink-300 bg-white hover:border-[#25D366]/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">WhatsApp</h3>
                  <p className="text-slate-500 text-sm mb-3">Instant replies, always</p>
                  <span className="text-[#25D366] text-sm font-bold group-hover:underline">Chat with us &rarr;</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#25D366] to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </a>

              {/* Location */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=45+Jairambagh+Colony+Near+100+Feet+Road+Dayalbagh+Agra+282005"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl p-8 border border-pink-300 bg-white hover:border-accent/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Visit Us</h3>
                  <p className="text-slate-500 text-sm mb-3">Our headquarters</p>
                  <span className="text-accent text-sm font-bold group-hover:underline">Get Directions &rarr;</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </a>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
