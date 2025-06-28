export const formatReadableDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).replace(/ (\d{4})$/, ', $1');
};
