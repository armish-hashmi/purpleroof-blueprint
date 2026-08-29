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

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] font-medium text-red-200">{message}</p>;
}

export default function ContactUs() {
  const form = useSelector((state) => state.contact);
  const dispatch = useDispatch();

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
      e.phone = "Please enter your WhatsApp number.";
    } else if (digits.length < 7) {
      e.phone = "That number looks too short.";
    }
    if (!form.subject) e.subject = "Please choose a topic.";
    if (!form.message?.trim()) {
      e.message = "Please add a short message.";
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
      setTouched({ name: true, email: true, phone: true, subject: true, message: true });
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

  const fieldBase =
    "w-full bg-white px-3.5 py-2.5 rounded-md text-[13px] text-gray-800 placeholder-gray-400 " +
    "border focus:outline-none focus:ring-2 focus:ring-white/60 transition-colors";

  const borderFor = (field) =>
    showError(field) ? "border-red-300" : "border-transparent";

  return (
    <section className="bg-[#6C6FA0] py-8 px-6">
      <div className="max-w-5xl mx-auto rounded-xl p-6 md:p-7">
        <div className="mb-4">
          <h2 className="text-2xl md:text-[28px] font-bold text-white leading-tight">
            Contact us
          </h2>
          <p className="italic text-white/85 text-sm md:text-base mt-0.5">
            Kindly guide us, how we can serve you better
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                placeholder="Enter your name"
                aria-invalid={!!showError("name")}
                className={`${fieldBase} ${borderFor("name")}`}
              />
              <FieldError message={showError("name")} />
            </div>

            <div>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Enter your email"
                aria-invalid={!!showError("email")}
                className={`${fieldBase} ${borderFor("email")}`}
              />
              <FieldError message={showError("email")} />
            </div>

            <div>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                onBlur={handleBlur("phone")}
                placeholder="Enter your WhatsApp"
                aria-invalid={!!showError("phone")}
                className={`${fieldBase} ${borderFor("phone")}`}
              />
              <FieldError message={showError("phone")} />
            </div>

            <div>
              <select
                value={form.subject}
                onChange={handleChange("subject")}
                onBlur={handleBlur("subject")}
                aria-invalid={!!showError("subject")}
                className={`${fieldBase} ${borderFor("subject")} appearance-none`}
              >
                <option value="">Choose your topic</option>
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <FieldError message={showError("subject")} />
            </div>
          </div>

          <div>
            <textarea
              rows={2}
              value={form.message}
              onChange={handleChange("message")}
              onBlur={handleBlur("message")}
              placeholder="Type your message here"
              aria-invalid={!!showError("message")}
              className={`${fieldBase} resize-none text-center sm:text-left ${borderFor("message")}`}
            />
            <FieldError message={showError("message")} />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={form.status === "submitting"}
              className="text-white font-bold text-sm tracking-wide hover:text-white/80 transition-colors disabled:opacity-60"
            >
              {form.status === "submitting" ? "Sending..." : "Submit"}
            </button>
          </div>

          {form.status === "success" && (
            <p className="text-emerald-200 font-medium text-xs text-right">
              Your message has been sent successfully!
            </p>
          )}
          {form.status === "error" && (
            <p className="text-red-200 font-medium text-xs text-right">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}