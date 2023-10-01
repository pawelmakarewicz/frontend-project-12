export default function disableInputTemporary(setInputState) {
  setInputState(true);
  setTimeout(
    () => {
      setInputState(false);
    },
    3000,
  );
}
