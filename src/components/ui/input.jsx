export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 text-black focus:ring-green-500 ${className}`}
      {...props}
    />
  );
}
