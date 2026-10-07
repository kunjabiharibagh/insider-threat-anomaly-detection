import React from "react";
import {
  ShieldCheck,
  Monitor,
  Usb,
  Activity,
  BrainCircuit,
  Users,
  Target,
  LockKeyhole,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Background Blue Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="absolute right-[-150px] top-[30%] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute bottom-[-150px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-700/10 blur-[150px]" />

      </div>


      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">

        {/* ================= HEADER ================= */}

        <section className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 backdrop-blur-xl">

            <ShieldCheck className="h-7 w-7 text-blue-400" />

          </div>


          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            About the Project
          </p>


          <h1 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">

            Insider Threat

            <span className="block text-blue-400">
              Anomaly Detection
            </span>

          </h1>


          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">

            A cybersecurity platform designed to help organizations monitor
            authorized systems, detect unusual behavior, and identify
            potential insider threats before they become serious security
            risks.

          </p>

        </section>


        {/* ================= ABOUT PROJECT ================= */}

        <section className="mt-20 grid gap-8 lg:grid-cols-2">


          {/* What is Project */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl transition duration-300 hover:border-blue-500/30">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">

              <BrainCircuit className="h-6 w-6 text-blue-400" />

            </div>


            <h2 className="text-2xl font-semibold">
              What is this project?
            </h2>


            <p className="mt-5 text-sm leading-8 text-white/50 md:text-base">

              Insider Threat Anomaly Detection is a security monitoring
              solution designed for organizations to identify unusual
              internal activity that may indicate a potential insider threat.

            </p>


            <p className="mt-4 text-sm leading-8 text-white/50 md:text-base">

              The platform analyzes authorized system and user activity,
              including system usage, USB connections, and data-transfer
              events. Suspicious behavior can then be identified and
              presented to administrators and security managers for
              investigation.

            </p>

          </div>


          {/* Project Objective */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl transition duration-300 hover:border-blue-500/30">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">

              <Target className="h-6 w-6 text-blue-400" />

            </div>


            <h2 className="text-2xl font-semibold">
              Project Objective
            </h2>


            <div className="mt-6 space-y-4">


              <p className="flex gap-3 text-sm leading-7 text-white/50">

                <span className="text-blue-400">
                  ●
                </span>

                Monitor organizational systems and user activity.

              </p>


              <p className="flex gap-3 text-sm leading-7 text-white/50">

                <span className="text-blue-400">
                  ●
                </span>

                Detect unusual or abnormal behavior.

              </p>


              <p className="flex gap-3 text-sm leading-7 text-white/50">

                <span className="text-blue-400">
                  ●
                </span>

                Identify potentially risky USB and data-transfer activity.

              </p>


              <p className="flex gap-3 text-sm leading-7 text-white/50">

                <span className="text-blue-400">
                  ●
                </span>

                Help security managers investigate potential threats.

              </p>


            </div>

          </div>

        </section>


        {/* ================= SYSTEM CAPABILITIES ================= */}

        <section className="mt-24">

          <div className="mb-10">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              System Capabilities
            </p>


            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              How the system works
            </h2>


            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">

              The platform combines system monitoring, activity analysis,
              and anomaly detection to provide security teams with better
              visibility into potential threats.

            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">


            {/* System Monitoring */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">

              <Monitor className="mb-5 h-8 w-8 text-blue-400" />

              <h3 className="text-lg font-semibold">
                System Monitoring
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">

                Monitor organizational systems to identify active,
                inactive, and shutdown states.

              </p>

            </div>


            {/* USB Monitoring */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">

              <Usb className="mb-5 h-8 w-8 text-blue-400" />

              <h3 className="text-lg font-semibold">
                USB Monitoring
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">

                Detect USB and removable devices connected to monitored
                organizational systems.

              </p>

            </div>


            {/* Activity Analysis */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">

              <Activity className="mb-5 h-8 w-8 text-blue-400" />

              <h3 className="text-lg font-semibold">
                Activity Analysis
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">

                Analyze user and system activity to identify behavior
                that differs from normal patterns.

              </p>

            </div>


            {/* Anomaly Detection */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">

              <BrainCircuit className="mb-5 h-8 w-8 text-blue-400" />

              <h3 className="text-lg font-semibold">
                Anomaly Detection
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/45">

                Identify unusual behavior that may indicate a potential
                insider threat.

              </p>

            </div>


          </div>

        </section>


        {/* ================= USERS ================= */}

        <section className="mt-24">


          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl md:p-12">


            <div className="grid gap-10 lg:grid-cols-2">


              {/* Left */}

              <div>

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">

                  <Users className="h-6 w-6 text-blue-400" />

                </div>


                <h2 className="text-3xl font-semibold">
                  Who uses the system?
                </h2>


                <p className="mt-5 text-sm leading-8 text-white/50">

                  The platform is primarily designed for authorized
                  organizational administrators and security managers
                  who need to monitor security events and investigate
                  potential threats.

                </p>

              </div>


              {/* Right */}

              <div className="grid gap-5 sm:grid-cols-2">


                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-blue-500/30">

                  <ShieldCheck className="mb-4 h-7 w-7 text-blue-400" />

                  <h3 className="font-semibold">
                    Administrator
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/45">

                    Monitors organizational systems and reviews security
                    events through the dashboard.

                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-black/40 p-6 transition hover:border-blue-500/30">

                  <LockKeyhole className="mb-4 h-7 w-7 text-blue-400" />

                  <h3 className="font-semibold">
                    Security Manager
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/45">

                    Investigates suspicious activities and evaluates
                    potential insider-threat risks.

                  </p>

                </div>


              </div>

            </div>

          </div>

        </section>


        {/* ================= FINAL SECTION ================= */}

        <section className="mt-24 pb-10 text-center">

          <ShieldCheck className="mx-auto h-12 w-12 text-blue-400" />


          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">

            Monitor. Detect. Protect.

          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45 md:text-base">

            Helping organizations gain visibility into suspicious activity
            and strengthen the protection of sensitive information.

          </p>

        </section>


      </main>

    </div>
  );
};

export default About;