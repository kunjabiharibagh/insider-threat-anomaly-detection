import cyberSecurityImage from "./assets/cyber_security_emoji.svg";

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#05020d] text-white">

      {/* ================= NAVBAR ================= */}
      <header className="border-b border-white/10 bg-[#07030f]/80 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">

          {/* Logo */}
          <div className="text-xl font-bold">
            <span className="text-blue-400">Cyber</span>
            <span className="text-purple-500">Shield</span>
          </div>

          {/* Navigation */}
          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#" className="transition hover:text-white">
              Services
            </a>

            <a href="#" className="transition hover:text-white">
              Threat Detection
            </a>

            <a href="#" className="transition hover:text-white">
              Resources
            </a>

            <a href="#" className="transition hover:text-white">
              Partners
            </a>

            <a href="#" className="transition hover:text-white">
              Blog
            </a>
          </div>

          {/* Right buttons */}
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="#"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Contact
            </a>
          </div>

        </nav>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="mx-auto grid min-h-[700px] max-w-7xl items-center gap-10 px-6 py-20 md:px-12 lg:grid-cols-2 lg:px-20">

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10">

            {/* Small heading */}
            <div className="mb-6 flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

              <span className="text-xs font-semibold tracking-[3px] text-cyan-400">
                CYBER SECURITY SOLUTIONS
              </span>

            </div>


            {/* Main heading */}
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

              Protect Your

              <br />

              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                Cyber Security
              </span>

            </h1>


            {/* Description */}
            <p className="mt-7 max-w-xl text-sm leading-7 text-gray-400 md:text-base">

              Keep your software up to date. Regularly update your operating
              system, antivirus software, web browsers, and other applications
              to ensure you have the latest security patches.

            </p>


            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button
                className="
                  rounded-lg
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  shadow-lg
                  shadow-purple-600/20
                  transition
                  duration-300
                  hover:scale-105
                  hover:shadow-blue-500/30
                "
              >
                Get Started →
              </button>


              <button
                className="
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-gray-300
                  transition
                  duration-300
                  hover:border-purple-500/50
                  hover:bg-white/[0.06]
                "
              >
                Explore Services
              </button>

            </div>

          </div>


          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative flex items-center justify-center">

            {/* Main SVG */}
            <img
              src={cyberSecurityImage}
              alt="Cyber Security"
              className="
                relative
                z-10
                w-full
                max-w-[650px]
                object-contain
              "
            />


            {/* =================================================
                INVISIBLE BULB HOVER AREA
                ================================================= */}

            <div
              className="
                bulb-hover-area
                group
                absolute
                left-[23%]
                top-[16%]
                z-20
                h-[28%]
                w-[25%]
                cursor-pointer
              "
            >

              {/* Large blue glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-36
                  w-36
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-blue-500
                  opacity-0
                  blur-3xl
                  group-hover:opacity-100
                  group-hover:animate-bulb-blink
                "
              />


              {/* Medium blue glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-24
                  w-24
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-cyan-400
                  opacity-0
                  blur-2xl
                  group-hover:opacity-100
                  group-hover:animate-bulb-blink
                "
              />


              {/* Small bright center */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-12
                  w-12
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-cyan-300
                  opacity-0
                  blur-lg
                  group-hover:opacity-100
                  group-hover:animate-bulb-blink
                "
              />

            </div>

          </div>

        </section>


        {/* ================= SECOND SECTION ================= */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 lg:px-20">

          <div className="grid gap-8 md:grid-cols-3">

            {/* Card 1 */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
                backdrop-blur-md
                transition
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/40
              "
            >

              <div className="mb-5 text-3xl">
                🛡️
              </div>

              <h2 className="text-xl font-bold">
                Threat Detection
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Detect suspicious activities and potential security threats
                before they become serious incidents.
              </p>

            </div>


            {/* Card 2 */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
                backdrop-blur-md
                transition
                duration-300
                hover:-translate-y-2
                hover:border-purple-500/40
              "
            >

              <div className="mb-5 text-3xl">
                🔐
              </div>

              <h2 className="text-xl font-bold">
                Data Protection
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Protect sensitive information with intelligent security
                monitoring and access control.
              </p>

            </div>


            {/* Card 3 */}
            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
                backdrop-blur-md
                transition
                duration-300
                hover:-translate-y-2
                hover:border-cyan-500/40
              "
            >

              <div className="mb-5 text-3xl">
                ⚡
              </div>

              <h2 className="text-xl font-bold">
                Real-Time Monitoring
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Monitor user activity and security events in real time to
                identify anomalies quickly.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;