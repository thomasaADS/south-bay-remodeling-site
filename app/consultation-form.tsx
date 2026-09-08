"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  budgets,
  emptyConsultation,
  planningStages,
  projectTypes,
  timelines,
  validateConsultation,
  type Consultation,
  type Errors,
} from "@/lib/consultation";

const steps = ["Your project", "Your plans", "Stay in touch"];
const instagram = "https://www.instagram.com/formadpb/";

export function ConsultationForm({ available }: { available: boolean }) {
  const [data, setData] = useState<Consultation>({ ...emptyConsultation });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const requestId = useRef<string | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (moved.current) titleRef.current?.focus();
  }, [step, sent]);
  useEffect(() => {
    if (Object.keys(errors).length || message) errorRef.current?.focus();
  }, [errors, message]);

  function update<K extends keyof Consultation>(
    key: K,
    value: Consultation[K],
  ) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setMessage("");
    requestId.current = null;
  }
  function goTo(next: number) {
    moved.current = true;
    setErrors({});
    setMessage("");
    setStep(next);
  }
  function errorFor(key: keyof Consultation) {
    return errors[key] ? (
      <span className="field-error" id={`error-${key}`}>
        {errors[key]}
      </span>
    ) : null;
  }
  function attrs(key: keyof Consultation) {
    return {
      id: `lead-${key}`,
      name: key,
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? `error-${key}` : undefined,
    };
  }
  function select(
    key: "planningStage" | "timeline" | "budget" | "contactMethod",
    label: string,
    options: readonly string[],
  ) {
    return (
      <div className="form-field">
        <label htmlFor={`lead-${key}`}>{label}</label>
        <select
          {...attrs(key)}
          required
          value={data[key]}
          onChange={(event) => update(key, event.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errorFor(key)}
      </div>
    );
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const nextErrors = validateConsultation(data, step < 2 ? step : undefined);
    if (Object.keys(nextErrors).length) {
      if (step === 2) {
        const firstStep =
          [0, 1, 2].find(
            (value) => Object.keys(validateConsultation(data, value)).length,
          ) ?? 2;
        setStep(firstStep);
      }
      setErrors(nextErrors);
      return;
    }
    if (step < 2) {
      goTo(step + 1);
      return;
    }
    if (!available) return;
    setPending(true);
    setMessage("");
    try {
      requestId.current ??= crypto.randomUUID();
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": requestId.current,
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) {
        setMessage(
          typeof result.error === "string"
            ? result.error
            : "We couldn’t confirm your request. Please try again.",
        );
        return;
      }
      moved.current = true;
      setSent(true);
      setData({ ...emptyConsultation });
    } catch {
      setMessage(
        "We couldn’t confirm your request. Your answers are still here. Please try again or contact us on Instagram.",
      );
    } finally {
      setPending(false);
    }
  }

  if (sent)
    return (
      <div className="consultation-form form-success" role="status">
        <p className="eyebrow">A new beginning</p>
        <h3 ref={titleRef} tabIndex={-1}>
          Your request is received.
        </h3>
        <p>
          Thank you for sharing your plans. FORMA has received your project
          details and your preferred way to get in touch.
        </p>
        <a
          className="text-link"
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit FORMA on Instagram
        </a>
      </div>
    );

  return (
    <form
      className="consultation-form"
      onSubmit={submit}
      noValidate
      aria-labelledby="form-title"
    >
      <ol className="form-progress" aria-label="Project inquiry progress">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={step === index ? "step" : undefined}
            className={index <= step ? "is-active" : ""}
          >
            <span className="form-step-number">0{index + 1}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>
      <p className="form-kicker">Step {step + 1} of 3</p>
      <h3 id="form-title" tabIndex={-1} ref={titleRef}>
        {
          [
            "Tell us what you have in mind.",
            "A little direction goes a long way.",
            "Let’s start a conversation.",
          ][step]
        }
      </h3>
      <p className="form-intro">
        {
          [
            "Choose all that apply. A city is enough to get started.",
            "Early ideas are welcome. Your answers help us understand the scope.",
            "Review your plans, then tell us how to reach you.",
          ][step]
        }{" "}
        Fields are required unless marked optional.
      </p>
      {!available && (
        <p className="form-availability">
          Online requests are not available yet. You can{" "}
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            message FORMA on Instagram
          </a>
          .
        </p>
      )}
      {(Object.values(errors).some(Boolean) || message) && (
        <div
          className="form-error-summary"
          ref={errorRef}
          tabIndex={-1}
          role="alert"
        >
          <p>{message || "Please check the following:"}</p>
          {Object.values(errors).some(Boolean) && (
            <ul>
              {Object.entries(errors)
                .filter(([, value]) => value)
                .map(([key, value]) => (
                  <li key={key}>
                    <a
                      href={`#lead-${key}`}
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(`lead-${key}`)?.focus();
                      }}
                    >
                      {value}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
      <fieldset className="form-body" disabled={pending}>
        <legend className="sr-only">{steps[step]}</legend>
        {step === 0 && (
          <>
            <fieldset
              className="project-options"
              aria-describedby={
                errors.projectTypes ? "error-projectTypes" : undefined
              }
            >
              <legend>What would you like to work on?</legend>
              <div className="project-option-grid">
                {projectTypes.map((type, index) => (
                  <label key={type} className="project-option">
                    <input
                      id={index === 0 ? "lead-projectTypes" : undefined}
                      name="projectTypes"
                      type="checkbox"
                      value={type}
                      checked={data.projectTypes.includes(type)}
                      aria-invalid={Boolean(errors.projectTypes)}
                      onChange={(event) =>
                        update(
                          "projectTypes",
                          event.target.checked
                            ? [...data.projectTypes, type]
                            : data.projectTypes.filter((item) => item !== type),
                        )
                      }
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {errorFor("projectTypes")}
            </fieldset>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="lead-city">Property city</label>
                <input
                  {...attrs("city")}
                  required
                  autoComplete="address-level2"
                  maxLength={100}
                  value={data.city}
                  onChange={(event) => update("city", event.target.value)}
                  placeholder="e.g. San Jose"
                />
                {errorFor("city")}
              </div>
              <div className="form-field">
                <label htmlFor="lead-zip">
                  ZIP code <span>(optional)</span>
                </label>
                <input
                  {...attrs("zip")}
                  autoComplete="postal-code"
                  inputMode="numeric"
                  maxLength={5}
                  value={data.zip}
                  onChange={(event) => update("zip", event.target.value)}
                />
                {errorFor("zip")}
              </div>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            {select(
              "planningStage",
              "Where are you in the process?",
              planningStages,
            )}
            {select(
              "timeline",
              "When would you like construction to begin?",
              timelines,
            )}
            {select(
              "budget",
              "What investment range do you have in mind?",
              budgets,
            )}
            <p className="form-help">
              These ranges help us plan the conversation. They are not project
              estimates or a commitment.
            </p>
            <div className="form-field">
              <label htmlFor="lead-description">
                What would you love to change? <span>(optional)</span>
              </label>
              <textarea
                {...attrs("description")}
                rows={4}
                maxLength={2000}
                value={data.description}
                onChange={(event) => update("description", event.target.value)}
                placeholder="Your priorities, what isn’t working, or any details we should know."
              />
              {errorFor("description")}
              <span className="form-help">
                Please leave out sensitive personal or financial details.
              </span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="project-review">
              <div>
                <span className="eyebrow">Your project at a glance</span>
                <button type="button" onClick={() => goTo(0)}>
                  Edit project
                </button>
              </div>
              <p>{data.projectTypes.join(" · ")}</p>
              <p>
                {data.city}
                {data.zip ? `, ${data.zip}` : ""}
              </p>
              <dl>
                <div>
                  <dt>Stage</dt>
                  <dd>{data.planningStage}</dd>
                </div>
                <div>
                  <dt>Start</dt>
                  <dd>{data.timeline}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{data.budget}</dd>
                </div>
              </dl>
              {data.description && (
                <p className="review-notes">{data.description}</p>
              )}
              <button type="button" onClick={() => goTo(1)}>
                Edit plans
              </button>
            </div>
            <div className="form-field">
              <label htmlFor="lead-name">Full name</label>
              <input
                {...attrs("name")}
                required
                autoComplete="name"
                maxLength={100}
                value={data.name}
                onChange={(event) => update("name", event.target.value)}
              />
              {errorFor("name")}
            </div>
            <div className="form-field">
              <label htmlFor="lead-email">Email address</label>
              <input
                {...attrs("email")}
                required
                type="email"
                autoComplete="email"
                maxLength={254}
                value={data.email}
                onChange={(event) => update("email", event.target.value)}
              />
              {errorFor("email")}
            </div>
            {select("contactMethod", "How would you prefer we contact you?", [
              "Email",
              "Phone",
            ])}
            <div className="form-field">
              <label htmlFor="lead-phone">
                Phone number{" "}
                {data.contactMethod !== "Phone" && <span>(optional)</span>}
              </label>
              <input
                {...attrs("phone")}
                type="tel"
                autoComplete="tel"
                required={data.contactMethod === "Phone"}
                maxLength={30}
                value={data.phone}
                onChange={(event) => update("phone", event.target.value)}
              />
              {errorFor("phone")}
            </div>
            <label className="form-consent">
              <input
                {...attrs("consent")}
                type="checkbox"
                required
                checked={data.consent}
                onChange={(event) => update("consent", event.target.checked)}
              />
              <span>
                FORMA may contact me about this project using the details I
                provide.
              </span>
            </label>
            {errorFor("consent")}
          </>
        )}
        <div className="form-trap" aria-hidden="true">
          <label htmlFor="lead-website">Leave this blank</label>
          <input
            id="lead-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
        <div className="form-actions">
          {step > 0 && (
            <button
              className="form-back"
              type="button"
              onClick={() => goTo(step - 1)}
            >
              Back
            </button>
          )}
          <button
            className="button button-dark"
            type="submit"
            disabled={pending || (step === 2 && !available)}
          >
            {pending
              ? "Sending your request…"
              : step < 2
                ? "Continue"
                : "Request a consultation"}
          </button>
        </div>
      </fieldset>
      <p className="form-alternative">
        Prefer a direct message?{" "}
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          Find us on Instagram
        </a>
        .
      </p>
    </form>
  );
}
