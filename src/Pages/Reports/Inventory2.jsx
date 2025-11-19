import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Inventory2() {
  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory 2 Report</h2>}
    >

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white shadow-sm sm:rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Inventory 2 Overview</h1>
            <p className="text-gray-600 mb-6">
              This section shows your latest product and stock activity in Inventory 2.
            </p>

            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-[#e0f2fe] text-[#1e3a8a]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.length > 0 ? (
                  transactions.map((t, index) => (
                    <tr key={t.id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(t.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500 italic"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
