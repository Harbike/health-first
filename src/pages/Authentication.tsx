import HeaderLayout from "@/layouts/HeaderLayout";

function Authentication() {
  return (
    <div className="w-full max-w-sm mx-auto mt-6">
      {/* Minimal header */}
      <HeaderLayout />

      <main className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter OTP"
          className="p-2 border rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Verify</button>
      </main>
    </div>
  );
}

export default Authentication;
