import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fieldChanged,
  submitStarted,
  submitSucceeded,
  submitFailed,
} from "../redux/contactReducer";

const subjectOptions = [
  "Property Search",
  "Property Listings",
  "Mortgage Enquiries",
  "Company Registration",
  "Recruitment",
  "Careers",
  "Training",
  "Partnerships",
];

const countryCodes = [
  { code: "+92", flag: "🇵🇰", label: "Pakistan" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+351", flag: "🇵🇹", label: "Portugal" },
  { code: "+1", flag: "🇺🇸", label: "United States" },
  { code: "+44", flag: "🇬🇧", label: "United Kingdom" },
];

function guessCountryCode() {
  const region = (navigator.language || "en-US").split("-")[1];
  const map = {
    PK: "+92",
    AE: "+971",
    PT: "+351",
    US: "+1",
    CA: "+1",
    GB: "+44",
  };
  return map[region] || "+971";
}

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p>;
}

export default function ContactUs() {
  const form = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const defaultCountryCode = useMemo(() => guessCountryCode(), []);
  const countryCode = form.countryCode || defaultCountryCode;

  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (!form.name?.trim()) e.name = "Please enter your name.";
    if (!form.email?.trim()) {
      e.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    const digits = (form.phone || "").replace(/\D/g, "");
    if (!digits) {
      e.phone = "Please enter your phone number.";
    } else if (digits.length < 7) {
      e.phone = "That number looks too short.";
    }
    if (!form.subject) e.subject = "Please choose a subject.";
    if (!form.message?.trim()) {
      e.message = "Please add a short message.";
    } else if (form.message.trim().length < 10) {
      e.message = "A few more details would help — at least 10 characters.";
    }
    return e;
  }, [form.name, form.email, form.phone, form.subject, form.message]);

  const handleChange = (field) => (e) => {
    dispatch(fieldChanged(field, e.target.value));
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const showError = (field) => touched[field] && errors[field];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        subject: true,
        message: true,
      });
      return;
    }

    dispatch(submitStarted());
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      dispatch(submitSucceeded());
    } catch (err) {
      dispatch(submitFailed());
    }
  };

  const inputBase =
    "w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 transition-colors";

  const borderFor = (field) =>
    showError(field)
      ? "border-red-400 focus:ring-red-300"
      : "border-gray-300 focus:ring-[#5D5FA3]";

  return (
    <section className="bg-[#6C6FA0] py-14 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Purple Roof</h1>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Curious about our services? Contact our team for guidance. We will respond as soon as we receive your message.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    placeholder="Enter your name"
                    aria-invalid={!!showError("name")}
                    className={`${inputBase} pl-10 pr-4 ${borderFor("name")}`}
                  />
                </div>
                <FieldError message={showError("name")} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    placeholder="Enter email"
                    aria-invalid={!!showError("email")}
                    className={`${inputBase} pl-10 pr-4 ${borderFor("email")}`}
                  />
                </div>
                <FieldError message={showError("email")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <div className="relative shrink-0">
                    <select
                      value={countryCode}
                      onChange={handleChange("countryCode")}
                      className="h-full appearance-none border border-gray-300 border-r-0 rounded-l-lg pl-3 pr-8 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5D5FA3] focus:z-10 relative"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    placeholder="12 345 6789"
                    aria-invalid={!!showError("phone")}
                    className={`flex-1 px-4 py-3 border rounded-r-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${borderFor(
                      "phone"
                    )}`}
                  />
                </div>
                <FieldError message={showError("phone")} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Subject / Are You Interested In? <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={form.subject}
                    onChange={handleChange("subject")}
                    onBlur={handleBlur("subject")}
                    aria-invalid={!!showError("subject")}
                    className={`${inputBase} appearance-none pr-10 bg-white ${borderFor("subject")}`}
                  >
                    <option value="">Choose your interest</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                <FieldError message={showError("subject")} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                onBlur={handleBlur("message")}
                placeholder="Tell us what you're looking for - a location, budget, or timeline helps us point you in the right direction."
                aria-invalid={!!showError("message")}
                className={`${inputBase} resize-none ${borderFor("message")}`}
              />
              <FieldError message={showError("message")} />
            </div>

           
            <button
              type="submit"
              disabled={form.status === "submitting"}
              className="w-full bg-gradient-to-r from-[#4B3F91] to-[#5D5FA3] hover:from-[#3F3479] hover:to-[#4E4F8C] text-white font-semibold py-3.5 rounded-lg transition-all text-base shadow-lg shadow-[#2D1540]/30 disabled:opacity-60"
            >
              {form.status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {form.status === "success" && (
              <p className="text-green-600 font-medium text-sm text-center">
                Your message has been sent successfully!
              </p>
            )}
            {form.status === "error" && (
              <p className="text-red-600 font-medium text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
