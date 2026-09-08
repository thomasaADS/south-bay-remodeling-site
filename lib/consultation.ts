export const projectTypes = [
  "Kitchen remodeling",
  "Bathroom remodeling",
  "ADU construction",
  "Home addition",
  "Whole-home remodeling",
  "Roofing",
  "Landscaping",
  "Painting",
] as const;
export const planningStages = [
  "Exploring ideas",
  "Working on a design",
  "Plans are ready",
  "Permits are in progress",
  "Not sure yet",
] as const;
export const timelines = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "More than a year",
  "Flexible / exploring",
] as const;
export const budgets = [
  "Under $25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000–$250,000",
  "$250,000–$500,000",
  "$500,000+",
  "Not sure yet",
] as const;

export type Consultation = {
  projectTypes: string[];
  city: string;
  zip: string;
  planningStage: string;
  timeline: string;
  budget: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  consent: boolean;
  website: string;
};
export type Errors = Partial<Record<keyof Consultation, string>>;
export const emptyConsultation: Consultation = {
  projectTypes: [],
  city: "",
  zip: "",
  planningStage: "",
  timeline: "",
  budget: "",
  description: "",
  name: "",
  email: "",
  phone: "",
  contactMethod: "Email",
  consent: false,
  website: "",
};

export function validateConsultation(
  data: Consultation,
  step?: number,
): Errors {
  const errors: Errors = {};
  if (step === undefined || step === 0) {
    if (
      !data.projectTypes.length ||
      data.projectTypes.length > projectTypes.length ||
      data.projectTypes.some(
        (type) => !projectTypes.includes(type as (typeof projectTypes)[number]),
      )
    )
      errors.projectTypes = "Choose at least one project type.";
    if (!data.city.trim() || data.city.length > 100)
      errors.city = "Enter the city where the property is located.";
    if (data.zip && !/^\d{5}$/.test(data.zip))
      errors.zip = "Enter a five-digit ZIP code or leave it blank.";
  }
  if (step === undefined || step === 1) {
    if (
      !planningStages.includes(
        data.planningStage as (typeof planningStages)[number],
      )
    )
      errors.planningStage =
        "Choose your planning stage, including ‘Not sure yet’ if needed.";
    if (!timelines.includes(data.timeline as (typeof timelines)[number]))
      errors.timeline = "Choose an approximate timeline.";
    if (!budgets.includes(data.budget as (typeof budgets)[number]))
      errors.budget = "Choose a budget range, or ‘Not sure yet’.";
    if (data.description.length > 2000)
      errors.description = "Keep your project notes under 2,000 characters.";
  }
  if (step === undefined || step === 2) {
    if (!data.name.trim() || data.name.length > 100)
      errors.name = "Enter your name.";
    if (
      data.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    )
      errors.email = "Enter a valid email address.";
    if (
      (data.phone || data.contactMethod === "Phone") &&
      (!/^[+()\d\s.-]+$/.test(data.phone) ||
        !/^\d{10,15}$/.test(data.phone.replace(/\D/g, "")))
    )
      errors.phone = "Enter a phone number with 10–15 digits.";
    if (!["Email", "Phone"].includes(data.contactMethod))
      errors.contactMethod = "Choose email or phone.";
    if (!data.consent)
      errors.consent = "Confirm that FORMA may contact you about this project.";
  }
  return errors;
}

export function parseConsultation(input: unknown): Consultation | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const values = input as Record<string, unknown>;
  if (
    !Array.isArray(values.projectTypes) ||
    !values.projectTypes.every((type) => typeof type === "string") ||
    typeof values.consent !== "boolean"
  )
    return null;
  const result = {
    ...emptyConsultation,
    projectTypes: [...new Set(values.projectTypes)],
    consent: values.consent,
  };
  for (const key of Object.keys(emptyConsultation) as (keyof Consultation)[]) {
    if (key === "projectTypes" || key === "consent") continue;
    if (typeof values[key] !== "string") return null;
    result[key] = values[key].trim();
  }
  return result;
}
