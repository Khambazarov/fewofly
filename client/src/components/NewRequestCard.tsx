import { useState } from "react";
import type { Theme } from "../lib/theme";
import { REQUEST_STATUSES } from "../lib/request-status";
import type { CreateRequestInput } from "../lib/request-api";
import type { AssignableUser } from "../lib/user-api";
import { isRequestFormSubmittable } from "../lib/request-form-validation";

type NewRequestCardProps = {
  theme: Theme;
  currentUserId: string;
  assignableUsers: AssignableUser[];
  onCreateRequest: (input: CreateRequestInput) => Promise<boolean>;
  onCancel: () => void;
  isCreating: boolean;
  createErrorMessage?: string;
};

type NewRequestFormState = {
  companyName: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  title: string;
  status: CreateRequestInput["status"];
  dateFrom: string;
  dateTo: string;
  peopleCount: string;
  locationCity: string;
  locationZIPcode: string;
  locationStreet: string;
  distanceFromDestinationKm: string;
  budget: string;
  mustHave: string;
  niceToHave: string;
  furtherInformation: string;
  assignedToId: string;
};

type FieldName = keyof NewRequestFormState;
type FieldErrors = Partial<Record<FieldName, string>>;
type FieldTouched = Partial<Record<FieldName, boolean>>;

const initialFormState: NewRequestFormState = {
  companyName: "",
  contactPerson: "",
  phoneNumber: "",
  emailAddress: "",
  title: "",
  status: REQUEST_STATUSES.NEW,
  dateFrom: "",
  dateTo: "",
  peopleCount: "",
  locationCity: "",
  locationZIPcode: "",
  locationStreet: "",
  distanceFromDestinationKm: "",
  budget: "",
  mustHave: "",
  niceToHave: "",
  furtherInformation: "",
  assignedToId: "",
};

export default function NewRequestCard({
  theme,
  currentUserId,
  assignableUsers,
  onCreateRequest,
  onCancel,
  isCreating,
  createErrorMessage,
}: NewRequestCardProps) {
  const [formData, setFormData] = useState<NewRequestFormState>({
    ...initialFormState,
    assignedToId: currentUserId,
  });
  const [touchedFields, setTouchedFields] = useState<FieldTouched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const cardClassName =
    theme === "dark"
      ? "mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
      : "mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";

  const titleClassName =
    theme === "dark"
      ? "text-2xl font-semibold text-slate-100"
      : "text-2xl font-semibold text-slate-900";

  const textClassName =
    theme === "dark" ? "text-sm text-slate-300" : "text-sm text-slate-700";

  const labelClassName =
    theme === "dark"
      ? "block text-sm font-medium text-slate-300"
      : "block text-sm font-medium text-slate-700";

  const primaryButtonClassName =
    theme === "dark"
      ? "rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      : "rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500";

  const secondaryButtonClassName =
    theme === "dark"
      ? "rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700"
      : "rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50";

  function getInputClassName(hasError: boolean) {
    if (theme === "dark") {
      return hasError
        ? "w-full rounded-xl border border-rose-500 bg-slate-800 px-4 py-3 text-sm text-slate-100 outline-none"
        : "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 outline-none";
    }

    return hasError
      ? "w-full rounded-xl border border-rose-500 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
      : "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none";
  }

  function validateForm(values: NewRequestFormState): FieldErrors {
    const errors: FieldErrors = {};

    if (!values.contactPerson.trim()) {
      errors.contactPerson = "Contact person is required.";
    }

    const hasPhoneNumber = values.phoneNumber.trim().length > 0;
    const hasEmailAddress = values.emailAddress.trim().length > 0;

    if (!hasPhoneNumber && !hasEmailAddress) {
      errors.phoneNumber =
        "Either phone number or email address must be provided.";
      errors.emailAddress =
        "Either phone number or email address must be provided.";
    }

    if (!values.locationCity.trim()) {
      errors.locationCity = "City is required.";
    }

    if (!values.dateFrom) {
      errors.dateFrom = "Date from is required.";
    }

    if (!values.dateTo) {
      errors.dateTo = "Date to is required.";
    }

    if (
      values.dateFrom &&
      values.dateTo &&
      new Date(values.dateTo) < new Date(values.dateFrom)
    ) {
      errors.dateTo = "Date to must be on or after date from.";
    }

    if (!values.peopleCount.trim()) {
      errors.peopleCount = "People count is required.";
    } else if (Number(values.peopleCount) <= 0) {
      errors.peopleCount = "People count must be greater than 0.";
    }

    if (values.distanceFromDestinationKm.trim()) {
      if (Number(values.distanceFromDestinationKm) < 0) {
        errors.distanceFromDestinationKm = "Distance cannot be negative.";
      }
    }

    if (!values.budget.trim()) {
      errors.budget = "Budget is required.";
    } else if (Number(values.budget) < 0) {
      errors.budget = "Budget cannot be negative.";
    }

    return errors;
  }

  const fieldErrors = validateForm(formData);

  const isFormSubmittable = isRequestFormSubmittable({
    contactPerson: formData.contactPerson,
    phoneNumber: formData.phoneNumber,
    emailAddress: formData.emailAddress,
    dateFrom: formData.dateFrom,
    dateTo: formData.dateTo,
    peopleCount: formData.peopleCount,
    locationCity: formData.locationCity,
    budget: formData.budget,
  });

  function shouldShowFieldError(fieldName: FieldName) {
    return Boolean(
      (touchedFields[fieldName] || submitAttempted) && fieldErrors[fieldName],
    );
  }

  function updateField<K extends FieldName>(
    key: K,
    value: NewRequestFormState[K],
  ) {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function markFieldTouched(fieldName: FieldName) {
    setTouchedFields((previous) => ({
      ...previous,
      [fieldName]: true,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    const success = await onCreateRequest({
      companyName: formData.companyName.trim(),
      contactPerson: formData.contactPerson.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      emailAddress: formData.emailAddress.trim(),
      title: formData.title.trim(),
      status: REQUEST_STATUSES.NEW,
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      peopleCount: Number(formData.peopleCount),
      locationCity: formData.locationCity.trim(),
      locationZIPcode: formData.locationZIPcode.trim(),
      locationStreet: formData.locationStreet.trim(),
      distanceFromDestinationKm: formData.distanceFromDestinationKm.trim()
        ? Number(formData.distanceFromDestinationKm)
        : 0,
      budget: Number(formData.budget),
      mustHave: formData.mustHave.trim(),
      niceToHave: formData.niceToHave.trim(),
      furtherInformation: formData.furtherInformation.trim(),
      assignedToId: formData.assignedToId,
    });

    if (success) {
      setFormData({
        ...initialFormState,
        assignedToId: currentUserId,
      });
      setTouchedFields({});
      setSubmitAttempted(false);
    }
  }

  return (
    <section className={cardClassName}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h2 className={titleClassName}>Create request</h2>
          <p className={textClassName}>
            Add a new operational accommodation request.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className={labelClassName}>
                Title
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <input
                className={getInputClassName(false)}
                placeholder="Describe the request in one sentence"
                value={formData.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Company name
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <input
                className={getInputClassName(false)}
                placeholder="Enter the company name"
                value={formData.companyName}
                onChange={(event) =>
                  updateField("companyName", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>Contact person</label>
              <input
                className={getInputClassName(
                  shouldShowFieldError("contactPerson"),
                )}
                placeholder="Enter the contact person's name"
                value={formData.contactPerson}
                onChange={(event) =>
                  updateField("contactPerson", event.target.value)
                }
                onBlur={() => markFieldTouched("contactPerson")}
              />
              {shouldShowFieldError("contactPerson") ? (
                <p className="text-sm text-rose-500">
                  {fieldErrors.contactPerson}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Phone number
                <span className="ml-1 text-xs text-slate-400">
                  (required: phone or email)
                </span>
              </label>
              <input
                className={getInputClassName(
                  shouldShowFieldError("phoneNumber"),
                )}
                placeholder="Enter the contact person's phone number"
                value={formData.phoneNumber}
                onChange={(event) =>
                  updateField("phoneNumber", event.target.value)
                }
                onBlur={() => markFieldTouched("phoneNumber")}
              />
              {shouldShowFieldError("phoneNumber") ? (
                <p className="text-sm text-rose-500">
                  {fieldErrors.phoneNumber}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Email address
                <span className="ml-1 text-xs text-slate-400">
                  (required: email or phone)
                </span>
              </label>
              <input
                className={getInputClassName(
                  shouldShowFieldError("emailAddress"),
                )}
                placeholder="Enter the contact person's email address"
                value={formData.emailAddress}
                onChange={(event) =>
                  updateField("emailAddress", event.target.value)
                }
                onBlur={() => markFieldTouched("emailAddress")}
              />
              {shouldShowFieldError("emailAddress") ? (
                <p className="text-sm text-rose-500">
                  {fieldErrors.emailAddress}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>City</label>
              <input
                className={getInputClassName(
                  shouldShowFieldError("locationCity"),
                )}
                placeholder="Enter the destination city"
                value={formData.locationCity}
                onChange={(event) =>
                  updateField("locationCity", event.target.value)
                }
                onBlur={() => markFieldTouched("locationCity")}
              />
              {shouldShowFieldError("locationCity") ? (
                <p className="text-sm text-rose-500">
                  {fieldErrors.locationCity}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                ZIP code
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <input
                className={getInputClassName(false)}
                placeholder="Enter the ZIP code"
                value={formData.locationZIPcode}
                onChange={(event) =>
                  updateField("locationZIPcode", event.target.value)
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className={labelClassName}>
                Street
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <input
                className={getInputClassName(false)}
                placeholder="Enter the street address"
                value={formData.locationStreet}
                onChange={(event) =>
                  updateField("locationStreet", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>Date from</label>
              <input
                type="date"
                className={getInputClassName(shouldShowFieldError("dateFrom"))}
                value={formData.dateFrom}
                onChange={(event) =>
                  updateField("dateFrom", event.target.value)
                }
                onBlur={() => markFieldTouched("dateFrom")}
              />
              {shouldShowFieldError("dateFrom") ? (
                <p className="text-sm text-rose-500">{fieldErrors.dateFrom}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>Date to</label>
              <input
                type="date"
                className={getInputClassName(shouldShowFieldError("dateTo"))}
                value={formData.dateTo}
                onChange={(event) => updateField("dateTo", event.target.value)}
                onBlur={() => markFieldTouched("dateTo")}
              />
              {shouldShowFieldError("dateTo") ? (
                <p className="text-sm text-rose-500">{fieldErrors.dateTo}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className={labelClassName}>People count</label>
              <input
                type="number"
                className={getInputClassName(
                  shouldShowFieldError("peopleCount"),
                )}
                placeholder="Enter the number of people"
                value={formData.peopleCount}
                onChange={(event) =>
                  updateField("peopleCount", event.target.value)
                }
                onBlur={() => markFieldTouched("peopleCount")}
              />
              {shouldShowFieldError("peopleCount") ? (
                <p className="text-sm text-rose-500">
                  {fieldErrors.peopleCount}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>Budget (€ pPN)</label>
              <input
                type="number"
                className={getInputClassName(shouldShowFieldError("budget"))}
                placeholder="Enter the budget per person and night"
                value={formData.budget}
                onChange={(event) => updateField("budget", event.target.value)}
                onBlur={() => markFieldTouched("budget")}
              />
              {shouldShowFieldError("budget") ? (
                <p className="text-sm text-rose-500">{fieldErrors.budget}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Distance in km
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <input
                type="number"
                className={getInputClassName(
                  shouldShowFieldError("distanceFromDestinationKm"),
                )}
                placeholder="Enter the maximum distance from destination in km"
                value={formData.distanceFromDestinationKm}
                onChange={(event) =>
                  updateField("distanceFromDestinationKm", event.target.value)
                }
                onBlur={() => markFieldTouched("distanceFromDestinationKm")}
              />
              {shouldShowFieldError("distanceFromDestinationKm") ? (
                <p className="text-sm text-rose-500">
                  {fieldErrors.distanceFromDestinationKm}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Assign to
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <select
                className={getInputClassName(false)}
                value={formData.assignedToId}
                onChange={(event) =>
                  updateField("assignedToId", event.target.value)
                }
              >
                <option value="">Unassigned</option>
                {assignableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label className={labelClassName}>
                Must have
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <textarea
                className={getInputClassName(false)}
                placeholder="Enter the features that are required for this request"
                rows={3}
                value={formData.mustHave}
                onChange={(event) =>
                  updateField("mustHave", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Nice to have
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <textarea
                className={getInputClassName(false)}
                placeholder="Enter the features that are nice to have for this request"
                rows={3}
                value={formData.niceToHave}
                onChange={(event) =>
                  updateField("niceToHave", event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>
                Further information
                <span className="ml-1 text-xs text-slate-400">(optional)</span>
              </label>
              <textarea
                className={getInputClassName(false)}
                placeholder="Enter any further information relevant to this request"
                rows={4}
                value={formData.furtherInformation}
                onChange={(event) =>
                  updateField("furtherInformation", event.target.value)
                }
              />
            </div>
          </div>

          {createErrorMessage ? (
            <p className="text-sm text-rose-500">{createErrorMessage}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="submit"
              className={primaryButtonClassName}
              disabled={isCreating || !isFormSubmittable}
            >
              {isCreating ? "Creating..." : "Create request"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className={secondaryButtonClassName}
              disabled={isCreating}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
