export function toPhoneFormat(input: string) {
  input = input.replace(/\D/g, "");
  input = input.substring(0, 10);

  const size = input.length;
  if (size < 4) {
    input = `(${input}`;
  } else if (size < 7) {
    input = `(${input.substring(0, 3)}) ${input.substring(3, 6)}`;
  } else {
    input = `(${input.substring(0, 3)}) ${input.substring(
      3,
      6
    )}-${input.substring(6, 10)}`;
  }

  return input;
}
