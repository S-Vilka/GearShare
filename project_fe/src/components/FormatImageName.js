const formatToImageName = (name) => {
  if (!name) return "";
  return name.toLowerCase().replace(/\s+/g, "");
};
export { formatToImageName };
