export const matchStyles = (style2) => {
  // Function to parse styles into an array of individual rules
  const parseStyles = (styleString) => {
    return styleString
      .split(";") // Split by semicolon to separate rules
      .map((rule) => rule.trim()) // Remove extra spaces
      .filter((rule) => rule); // Remove empty rules
  };

  const requiredStyles = ["font-size: 0.9rem"];
  const optionalStyles = ["text-align: left", "text-align: justify"];
  const style2Rules = parseStyles(style2);

  // Check if all required styles exist in style2
  const hasRequiredStyles = requiredStyles.every((requiredStyle) =>
    style2Rules.includes(requiredStyle)
  );

  // Check if at least one optional style exists in style2
  const hasOptionalStyles = optionalStyles.some((optionalStyle) =>
    style2Rules.includes(optionalStyle)
  );

  return hasRequiredStyles && hasOptionalStyles;
};
