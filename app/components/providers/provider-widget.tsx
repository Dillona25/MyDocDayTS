interface ProviderWidgetProps {
  firstName: string;
  lastName: string;
  specialty: string;
  type?: "provider" | "clinic";
  phoneNumber?: string;
  imageUrl?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export const ProviderWidget = ({
  firstName,
  lastName,
  specialty,
  type = "provider",
  phoneNumber,
  imageUrl,
  city,
  state,
  zipCode,
}: ProviderWidgetProps) => {
  const fullName = `${firstName} ${lastName}`;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const widgetLabel = type === "clinic" ? "Clinic" : "Provider";
  const location = [city, state].filter(Boolean).join(", ");

  return (
    <article className="h-full rounded-lg border border-primary/10 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {imageUrl ? (
          <img
            alt={fullName}
            className="size-16 shrink-0 rounded-lg object-cover"
            src={imageUrl}
          />
        ) : (
          <div className="grid size-16 shrink-0 place-items-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
            {initials}
          </div>
        )}

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-secondary">
            {widgetLabel}
          </p>
          <h2 className="mt-1 truncate text-lg font-semibold text-primary">
            {fullName}
          </h2>
          <p className="text-sm font-medium text-slate-700">{specialty}</p>
        </div>
      </div>

      {(location || zipCode || phoneNumber) && (
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-start sm:justify-between">
          {(location || zipCode) && (
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Location
              </p>
              <p className="mt-1 text-sm text-body">
                {[location, zipCode].filter(Boolean).join(" ")}
              </p>
            </div>
          )}

          {phoneNumber && (
            <div className={location || zipCode ? "sm:text-right" : ""}>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Phone
              </p>
              <p className="mt-1 text-sm text-body">{phoneNumber}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
