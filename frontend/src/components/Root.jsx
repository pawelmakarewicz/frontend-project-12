// eslint-disable-next-line react/prop-types
export default function Root({ children }) {
  return (
    <div className="d-flex flex-column h-100">
      {children}
    </div>
  );
}
