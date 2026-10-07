import React from "react";
import {
  ShieldCheck,
  Monitor,
  Usb,
  UserRound,
  LockKeyhole,
  Database,
  BellRing,
  Eye,
  KeyRound,
  Server,
  ChevronRight,
} from "lucide-react";

const PrivacySecurity = () => {
  const monitoringFeatures = [
    {
      icon: Monitor,
      title: "System Monitoring",
      description:
        "Monitor authorized organizational systems to track system availability, activity periods, and unusual system behavior.",
    },
    {
      icon: Usb,
      title: "USB Device Monitoring",
      description:
        "Detect USB and removable devices connected to monitored systems and identify potentially risky device usage.",
    },
    {
      icon: UserRound,
      title: "User Activity",
      description:
        "Associate security events with authorized users and devices to help security managers investigate suspicious behavior.",
    },
    {
      icon: Database,
      title: "Data Transfer Monitoring",
      description:
        "Identify suspicious data-transfer activity involving removable devices and other monitored transfer channels.",
    },
  ];

  const securityControls = [
    {
      icon: LockKeyhole,
      title: "Role-Based Access",
      description:
        "Only authorized administrators and security managers can access sensitive monitoring information.",
    },
    {
      icon: KeyRound,
      title: "Authentication",
      description:
        "Secure authentication helps prevent unauthorized users from accessing the monitoring platform.",
    },
    {
      icon: BellRing,
      title: "Security Alerts",
      description:
        "Potentially abnormal activities can generate alerts so security teams can investigate them quickly.",
    },
    {
      icon: Server,
      title: "Secure Data Storage",
      description:
        "Security events and monitoring records should be stored securely and protected from unauthorized access.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#05020d] text-white">

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute right-[-100px] top-1/3 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[160px]" />
        <div className="absolute bottom-[-150px] left-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">

        {/* Header */}
        <section className="mb-16 max-w-4xl">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 backdrop-blur-xl">
              <ShieldCheck className="h-6 w-6 text-purple-300" />
            </div>

            <span className="text-sm font-medium uppercase tracking-[0.25em] text-purple-300">
              Privacy & Security
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Protecting your organization
            <span className="block bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              through intelligent monitoring.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">
            Insider Threat Anomaly Detection helps organizations monitor
            authorized systems, identify unusual activity, and detect potential
            insider threats before they become serious security incidents.
          </p>

        </section>


        {/* Monitoring Section */}
        <section className="mb-20">

          <div className="mb-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-purple-300">
              Monitoring Scope
            </p>

            <h2 className="text-2xl font-semibold md:text-3xl">
              What the system monitors
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
              The platform provides security teams with visibility into
              authorized organizational systems and activities that may indicate
              potential security risks.
            </p>
          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {monitoringFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.06]"
                >

                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10">
                    <Icon className="h-6 w-6 text-purple-300" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/45">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-medium text-purple-300 opacity-0 transition group-hover:opacity-100">
                    Learn more
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* Privacy Section */}
        <section className="mb-20">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Left */}
            <div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <Eye className="h-7 w-7 text-cyan-300" />
              </div>

              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                Privacy First
              </p>

              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Security monitoring with
                <span className="block text-white/55">
                  responsible data handling.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-white/50 md:text-base">
                Monitoring should be performed only for legitimate
                organizational security purposes. Access to monitoring data
                should be limited to authorized personnel, while sensitive
                security records should be protected through appropriate
                authentication, authorization, and secure storage.
              </p>

            </div>


            {/* Right */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-2xl">

              <h3 className="text-xl font-semibold">
                Privacy Principles
              </h3>

              <div className="mt-7 space-y-5">

                {[
                  "Authorized monitoring only",
                  "Least-privilege access",
                  "Protection of sensitive monitoring data",
                  "Data collection for legitimate security purposes",
                  "Restricted access to security events",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10">
                      <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    </div>

                    <span className="text-sm text-white/65">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>


        {/* Security Controls */}
        <section className="mb-20">

          <div className="mb-8">

            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-300">
              Security Controls
            </p>

            <h2 className="text-2xl font-semibold md:text-3xl">
              Built for controlled security operations
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {securityControls.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-blue-400/25 hover:bg-white/[0.05]"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                    <Icon className="h-6 w-6 text-blue-300" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-white/45">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* Bottom CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-500/[0.08] via-white/[0.03] to-blue-500/[0.08] p-8 backdrop-blur-2xl md:p-12">

          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

          <div className="relative z-10 max-w-3xl">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10">
              <ShieldCheck className="h-6 w-6 text-purple-300" />
            </div>

            <h2 className="text-2xl font-semibold md:text-3xl">
              Monitor. Detect. Protect.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/50 md:text-base">
              Give your security team the visibility they need to identify
              abnormal activity, investigate potential insider threats, and
              protect critical organizational information.
            </p>

          </div>

        </section>

      </main>
    </div>
  );
};

export default PrivacySecurity;