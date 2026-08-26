import React, { useEffect, useState } from "react";
import cyberSecurityImage from "./assets/cyber_security_emoji.svg";
import first_background from "./assets/first_background.png";
const App = () => {
    const text = "Detect Insider Threats";
const [displayText, setDisplayText] = useState("");

useEffect(() => {
  let index = 0;

  const typingInterval = setInterval(() => {
    setDisplayText(text.slice(0, index + 1));
    index++;

    if (index === text.length) {
      clearInterval(typingInterval);
    }
  }, 100);

  return () => clearInterval(typingInterval);
}, []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05030d] text-white">

      {/* ================= NAVBAR ================= */}
     <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05030d]/80 px-6 py-5 backdrop-blur-xl md:px-12 lg:px-20">
  <div className="mx-auto flex max-w-7xl items-center gap-8">

    {/* Logo */}
    <a
      href="#"
      className="text-xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text"
    >
      ThreatIQ
    </a>

    {/* Main Navigation */}
    <div className="hidden items-center gap-8 text-xs text-gray-400 md:flex">
      <a href="#blog" className="transition hover:text-white">
        Home
      </a>

      <a href="#services" className="transition hover:text-white">
        Monitoring <span className="text-[9px]">▼</span>
      </a>

      <a href="#solutions" className="transition hover:text-white">
        Alert <span className="text-[9px]">▼</span>
      </a>

      <a href="#resources" className="transition hover:text-white">
        Resources
      </a>
    </div>

    {/* Admin Dashboard */}
    <div className="hidden md:flex items-center ml-auto">
      <a
        href="/admin-dashboard"
        className="group relative flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-[11px] font-semibold tracking-wider text-blue-300 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/20 hover:text-blue-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.5 12l1.7 1.7 3.5-3.5"
          />
        </svg>

        ADMIN DASHBOARD


      </a>
    </div>

    {/* Right Navigation */}
    <div className="hidden items-center gap-6 text-xs text-gray-400 md:flex">
      <a href="#about" className="transition hover:text-white">
        About
      </a>

      <a href="#contact" className="transition hover:text-white">
        Contact us
      </a>
    </div>

    {/* Mobile */}
    <button className="ml-auto rounded-lg border border-white/10 px-3 py-2 text-gray-300 md:hidden">
      ☰
    </button>

  </div>
</nav>

      {/* ================= HERO ================= */}
<section
  className="
    relative
    min-h-[680px]
    overflow-hidden
    bg-[#05020d]
    bg-cover
    bg-center
    bg-no-repeat

    grid
    items-center
    gap-16
    px-6
    py-20

    md:px-12
    lg:grid-cols-2
    lg:px-20
  "
  style={{
    backgroundImage: `url(${first_background})`,
  }}
>

  {/* Dark overlay for better text visibility */}


  {/* Background Glow */}


  {/* Hero Content */}
 <div className="relative z-10 lg:-ml-16 lg:-mt-60">

    <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-5xl">

      <span className="whitespace-nowrap">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>

      <br />

    <span className="whitespace-nowrap text-cyan-400">
        Before They Become Risks
      </span>

    </h1>

<p
  className="
    mt-24
    max-w-lg
    border-l-2 border-cyan-400/60
    pl-6
    text-sm
    leading-8
    tracking-wide
    text-gray-300
    font-light
    drop-shadow-[0_0_12px_rgba(34,211,238,0.12)]
    transition-all duration-500
    hover:border-cyan-400
    hover:text-gray-200
    md:mt-28
    md:text-base
  "
>
  Monitor employee activities, company devices, and data-transfer patterns with intelligent anomaly detection.
   Our system uses machine learning to identify unusual behavior and help security administrators
  respond to potential insider threats before they become serious
  security incidents.
</p>
    {/* Buttons */}

    {/* Hero Stats */}

  </div>


  {/* ================= HERO VISUAL ================= */}

  <div className="relative mx-auto h-[450px] w-full max-w-[500px]">

    {/* Glow */}
    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/30 blur-[100px]" />


    {/* Shield */}

    {/* Floating Status */}

  </div>

</section>

      {/* ================= STATISTICS ================= */}


      {/* ================= THREATS SECTION ================= */}
      <section
        id="threats"
        className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:px-12 lg:grid-cols-2 lg:px-20"
      >

        {/* Server Illustration */}
        <div className="relative mx-auto h-[450px] w-full max-w-[500px]">

          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[100px]" />

          {/* Server */}
       <div className="absolute left-1/2 top-1/2 z-10 h-[350px] w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#0c1b3a] to-[#050b18] p-5 shadow-[0_0_70px_rgba(37,99,235,0.25)]">
            <div className="flex justify-between text-[9px] text-gray-500">
              <span>SECURITY MONITOR</span>
             
            </div>

            <div className="mt-7 space-y-5">

              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex h-10 items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3"
                >

                  <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />

                  <div className="h-1 flex-1 rounded bg-gradient-to-r from-purple-500/60 to-transparent" />

                  <span className="text-[8px] text-gray-600">
                   USER  — NORMAL
                  </span>

                </div>
              ))}

            </div>

            <div className="mt-7 flex justify-between text-[8px] text-purple-400">
              <span>SECURE</span>
              <span>ENCRYPTED</span>
            </div>

          </div>

          {/* Floating threat */}
          <div className="absolute right-0 top-16 z-20 rounded-lg border border-red-500/20 bg-[#100b1d]/90 px-4 py-3 text-xs backdrop-blur-xl">

            <span className="mr-2 text-red-400">●</span>
           
 ANOMALY DETECTED

          </div>

          {/* Cube */}
        <div className="absolute bottom-10 left-8 flex h-24 w-24 rotate-45 items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600 shadow-[0_0_50px_rgba(37,99,235,0.4)]">    
              <span className="-rotate-45 text-xl">•••</span>
          </div>

        </div>

        {/* Content */}
        <div>

          <div className="mb-5 flex items-center gap-3 text-[11px] tracking-[3px] text-purple-400">
            <span className="h-px w-8 bg-purple-500" />
          INSIDER THREAT DETECTION
          </div>

          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Detect Insider Threats Before 
            <br />

            <span className="bg-blue-400 bg-clip-text text-transparent">
            They Become Risks
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-gray-400">
          
Monitor user activity,
 identify unusual behavior,
  and detect potential insider threats before they can impact your organization.
          </p>

          {/* Threat Cards */}
          <div className="mt-8 space-y-3">

            {[
              [
                "🦠",
                "User Activity Monitoring",
                "Track user logins, system access, and activity across your organization's systems.",
              ],
              [
                "🎣",
                "Anomaly Detection",
                "Identify unusual behavior and detect deviations from normal user activity patterns.",
              ],
              [
                "🔓",
                "Threat Risk Analysis",
                "Analyze suspicious activities and assess risk levels to help administrators respond quickly.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-purple-500/30 hover:bg-purple-500/[0.04]"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-xl">
                  {icon}
                </div>

                <div>
                  <h3 className="text-sm font-bold">{title}</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="bg-gradient-to-b from-blue-950/10 to-transparent px-6 py-28 md:px-12 lg:px-20"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <div className="flex items-center justify-center gap-3 text-[11px] tracking-[3px] text-blue-400">
              <span className="h-px w-8 bg-blue-500" />
              SYSTEM ACTIVITy
              <span className="h-px w-8 bg-blue-500" />
            </div>

            <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">
              System{" "}
              <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Access Monitoring
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              Powerful security solutions designed to protect your
              System and data.
            </p>

          </div>

          {/* Service Cards */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              [
                "🔐",
                "Network Security",
                "Protect your network infrastructure against unauthorized access and attacks.",
              ],
              [
                "☁️",
                "Cloud Security",
                "Secure cloud applications and infrastructure while maintaining performance.",
              ],
              [
                "🧠",
                "Threat Intelligence",
                "Identify potential cyber threats using real-time intelligence and analytics.",
              ],
              [
                "👤",
                "Identity Security",
                "Protect user identities and control access to critical resources.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-purple-500/[0.04] hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]"
              >

                <div className="text-4xl">{icon}</div>

                <h3 className="mt-6 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {description}
                </p>

                <a
                  href="#"
                  className="mt-5 inline-block text-xs font-semibold text-purple-400 transition group-hover:text-purple-300"
                >
                  Learn More →
                </a>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= SECURITY APPROACH ================= */}
      <section
        id="solutions"
        className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:px-12 lg:grid-cols-2 lg:px-20"
      >

        {/* Left */}
        <div>

          <div className="mb-5 flex items-center gap-3 text-[11px] tracking-[3px] text-purple-400">
            <span className="h-px w-8 bg-purple-500" />
            OUR APPROACH
          </div>

          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Intelligent Security 

            <br />

            <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
             That Works For You


            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400">
      We continuously analyze user activity, detect unusual behavior,
       and identify potential insider threats before they become serious security risks.
          </p>

          {/* Process */}
          <div className="mt-9 space-y-6">

            {[
              ["01", "Collect", "Gather user activity, login events, system access, and behavioral data."],
              ["02", " Analyze", "Analyze user behavior to establish normal activity patterns."],
              ["03", "Detect", "Identify unusual activities and behavioral anomalies in real time."],
              ["04", "Respond", "Alert administrators and help them take action against potential threats."],
            ].map(([number, title, description]) => (

              <div key={number} className="flex gap-5">

                <div className="font-bold text-purple-500">
                  {number}
                </div>

                <div>
                  <h3 className="font-bold">{title}</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {description}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Dashboard */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/50 to-black p-7 shadow-[0_30px_100px_rgba(124,58,237,0.15)]">

          <div className="flex justify-between text-[10px] tracking-widest text-gray-500">
            <span>SECURITY DASHBOARD</span>

            <span className="text-green-400">
              ● LIVE MONITORING
            </span>
          </div>

          {/* Score */}
          <div className="flex justify-center py-12">

            <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-[8px] border-blue-600 shadow-[0_0_50px_rgba(124,58,237,0.25)]">

              <span className="text-5xl font-extrabold">
                98
              </span>

              <span className="text-[9px] tracking-widest text-gray-500">
                SECURITY
              </span>

            </div>

          </div>

          {/* Dashboard Rows */}
          <div className="space-y-5">

            {[
              ["User Behavior", "98%"],
              ["Login Activity", "96%"],
              ["Access Monitoring ", "99%"],
              ["Anomaly Detection", "97%"],
            ].map(([name, percentage]) => (

              <div key={name}>

                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-gray-400">{name}</span>
                  <span className="font-bold">{percentage}</span>
                </div>

                <div className="h-1.5 rounded-full bg-white/5">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: percentage }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative mx-6 mb-28 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-blue-950/70 to-[#09050f] px-6 py-20 text-center md:mx-12 lg:mx-auto lg:max-w-6xl">

        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/20 blur-[100px]" />

        <div className="relative z-10">

          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[3px] text-purple-400">
            <span className="h-px w-8 bg-purple-500" />
            STAY PROTECTED
            <span className="h-px w-8 bg-purple-500" />
          </div>

          <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Ready to Strengthen
            <br />
            Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              Digital Defense?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500">
            Protect your Organization security with
            modern security solutions.
          </p>

          <button className="mt-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-300 px-7 py-3.5 text-sm font-bold shadow-lg shadow-purple-600/20 transition hover:scale-105">
            Start Protecting Your Organization →
          </button>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 py-16 md:px-12 lg:px-20">

        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h3 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              ThreatIQ
            </h3>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
              Advanced cybersecurity solutions for modern businesses.
              Protecting your digital world, one system at a time.
            </p>

            <div className="mt-6 flex gap-3">

              {["in", "𝕏", "f", "◎"].map((social) => (

                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs text-gray-400 transition hover:border-purple-500/40 hover:text-white"
                >
                  {social}
                </a>

              ))}

            </div>

          </div>

          {/* Footer Columns */}
          <div>
            <h4 className="font-bold">Services</h4>

            <div className="mt-5 space-y-3 text-sm text-gray-500">
              <a href="#" className="block hover:text-white">
                Network Security
              </a>
              <a href="#" className="block hover:text-white">
                Cloud Security
              </a>
              <a href="#" className="block hover:text-white">
                Identity Security
              </a>
              <a href="#" className="block hover:text-white">
                Threat Intelligence
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold">Company</h4>

            <div className="mt-5 space-y-3 text-sm text-gray-500">
              <a href="#" className="block hover:text-white">
                About Us
              </a>
              <a href="#" className="block hover:text-white">
                Partners
              </a>
              <a href="#" className="block hover:text-white">
                Blog
              </a>
              <a href="#" className="block hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold">Resources</h4>

            <div className="mt-5 space-y-3 text-sm text-gray-500">
              <a href="#" className="block hover:text-white">
                Documentation
              </a>
              <a href="#" className="block hover:text-white">
                Security Center
              </a>
              <a href="#" className="block hover:text-white">
                Support
              </a>
              <a href="#" className="block hover:text-white">
                Privacy
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-600 md:flex-row">

          <span>
            © 2026 ThreatIQ. All rights reserved.
          </span>

         
        </div>

      </footer>

    </div>
  );
};

export default App;