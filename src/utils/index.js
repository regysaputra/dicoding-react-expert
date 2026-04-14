function showFormattedDate(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const unit of units) {
    if (diffInSeconds >= unit.seconds) {
      const value = Math.floor(diffInSeconds / unit.seconds);
      return rtf.format(-value, unit.name);
    }
  }
}

function validateProps(schema, props, componentName) {
  const validationResult = schema.validate(props, { abortEarly: false });

  if (validationResult.error) {
    const { details } = validationResult.error;
    details.forEach((error) =>
      console.warn(`[${componentName}] Validation Error: ${error.message}`),
    );
  }

  return validationResult.value;
}

export { showFormattedDate, validateProps };
