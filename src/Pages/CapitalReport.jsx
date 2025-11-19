import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CapitalReport({ title }) {
  return (
    <AuthenticatedLayout
      header={<h1 className="text-2xl font-bold text-[#4b2e17]">{title}</h1>}
    >

      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-white shadow border border-black rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#4b2e17]">
            January 2025 - Sales Summary
          </h2>

          <table className="w-full border border-black text-sm">
            <thead className="bg-[#f9e7d0]">
              <tr>
                <th className="p-2 border border-black">Date & Time</th>
                <th className="p-2 border border-black">User</th>
                <th className="p-2 border border-black">Action</th>
                <th className="p-2 border border-black">Amount</th>
                <th className="p-2 border border-black">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {/* Map report data here later */}
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
