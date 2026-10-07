import React from "react";
import {
  ShieldCheck,
  Phone,
  Mail,
  MessageSquare,
  Clock,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= BACKGROUND BLUE GLOW ================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="absolute right-[-150px] top-[30%] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute bottom-[-150px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-700/10 blur-[150px]" />

      </div>


      {/* ================= MAIN CONTENT ================= */}

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">

        {/* ================= HEADER ================= */}

        <section className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 backdrop-blur-xl">

            <ShieldCheck className="h-7 w-7 text-blue-400" />

          </div>


          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
            Get In Touch
          </p>


          <h1 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">

            Contact

            <span className="block text-blue-400">
              Us
            </span>

          </h1>


          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/55 md:text-lg">

            Have a question, need technical support, or want to know
            more about our Insider Threat Anomaly Detection system?
            Get in touch with our team.

          </p>

        </section>


        {/* ================= CONTACT OPTIONS ================= */}

        <section className="mt-20 grid gap-8 md:grid-cols-2">


          {/* ================= PHONE ================= */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">

              <Phone className="h-7 w-7 text-blue-400" />

            </div>


            <h2 className="text-2xl font-semibold">
              Contact by Phone
            </h2>


            <p className="mt-5 text-sm leading-8 text-white/50 md:text-base">

              You can directly contact our team by calling the
              following number for assistance or security-related
              queries.

            </p>


            <a
              href="tel:912342103"
              className="mt-8 block rounded-2xl border border-white/10 bg-black/40 p-6 transition duration-300 hover:border-blue-500/40 hover:bg-blue-500/5"
            >

              <p className="text-sm text-white/40">
                Phone Number
              </p>

              <p className="mt-2 text-2xl font-semibold text-blue-400">
                912342103
              </p>

              <p className="mt-2 text-sm text-white/40">
                Click to call
              </p>

            </a>

          </div>


          {/* ================= EMAIL ================= */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">

              <Mail className="h-7 w-7 text-blue-400" />

            </div>


            <h2 className="text-2xl font-semibold">
              Contact by Email
            </h2>


            <p className="mt-5 text-sm leading-8 text-white/50 md:text-base">

              For technical questions, feedback, or other inquiries,
              you can contact our team through email.

            </p>


            <a
              href="mailto:support@threatiq.com"
              className="mt-8 block rounded-2xl border border-white/10 bg-black/40 p-6 transition duration-300 hover:border-blue-500/40 hover:bg-blue-500/5"
            >

              <p className="text-sm text-white/40">
                Email Address
              </p>

              <p className="mt-2 break-all text-xl font-semibold text-blue-400">
                support@threatiq.com
              </p>

              <p className="mt-2 text-sm text-white/40">
                Click to send an email
              </p>

            </a>

          </div>

        </section>


        {/* ================= SUPPORT INFORMATION ================= */}

        <section className="mt-16">

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl md:p-12">

            <div className="grid gap-10 md:grid-cols-3">


              {/* Support */}

              <div className="text-center">

                <MessageSquare className="mx-auto mb-5 h-8 w-8 text-blue-400" />

                <h3 className="text-lg font-semibold">
                  Support
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  Contact us for technical assistance and
                  system-related questions.
                </p>

              </div>


              {/* Availability */}

              <div className="text-center">

                <Clock className="mx-auto mb-5 h-8 w-8 text-blue-400" />

                <h3 className="text-lg font-semibold">
                  Availability
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  Monday – Friday
                  <br />
                  9:00 AM – 6:00 PM
                </p>

              </div>


              {/* Security */}

              <div className="text-center">

                <ShieldCheck className="mx-auto mb-5 h-8 w-8 text-blue-400" />

                <h3 className="text-lg font-semibold">
                  Security Support
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  Report suspicious activity or security
                  concerns to our team.
                </p>

              </div>


            </div>

          </div>

        </section>


        {/* ================= FINAL SECTION ================= */}

        <section className="mt-24 pb-10 text-center">

          <ShieldCheck className="mx-auto h-12 w-12 text-blue-400" />


          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">

            We're Here to Help

          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45 md:text-base">

            Whether you have a question about the system or need
            assistance with a security concern, feel free to reach
            out to us.

          </p>

        </section>

      </main>

    </div>
  );
};

export default Contact;