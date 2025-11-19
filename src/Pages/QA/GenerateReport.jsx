// resources/js/Pages/Reports/CreateReport.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function GenerateReport() {
    return (
        <AuthenticatedLayout>

            <div className="py-12 px-6">
                <div>
                    <h1
                        className="text-4xl font-extrabold text-[#4b2e17] drop-shadow-sm"
                        style={{
                            WebkitTextStroke: ".8px #000000",
                            backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            lineHeight: "1.3",
                            fontSize: "3rem",
                            marginLeft: "5rem",
                            marginTop:"-5rem",
                            marginBottom:"1rem"
                        }}
                    >
                        Create Report
                    </h1>
               

                    {/* Buttons */}
                    <div className="space-y-4 mb-10">
  <button
  className="block text-left border border-[#4b2e17] text-black font-bold px-8 py-3 bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors duration-200
  w-full sm:w-[50rem] lg:w-[68rem] mx-auto text-2xl"
>
  Generate Sales Report
</button>


  <button
    className="block text-left border border-[#4b2e17] text-black font-bold px-8 py-3 bg-[#f9f5f0] hover:bg-[#e8d4b8] transition-colors duration-200
    w-full sm:w-[50rem] lg:w-[68rem] mx-auto text-2xl"
  >
    Generate Capital Report
  </button>
</div>


                    {/* Sales and Capital History Tables */}
<div className="space-y-12 mx-auto w-full sm:w-[50rem] lg:w-[68rem]">

  {/* 🟫 Sales History Box */}
<section className="mb-10">
  <h2 className="text-2xl font-bold text-[#2e1a0e] mb-4">
    Sales History
  </h2>

  {/* Outer Box */}
  <div className="border border-black bg-white p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#d6d6d6] text-black">
            <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">
              Sales Transaction #
            </th>
            <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">
              Date
            </th>
            <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">
              Total Sales
            </th>
            <th className="border-b border-[#4b2e17] px-4 py-3 w-1/6"></th>
          </tr>
        </thead>
        <tbody>
          {sales?.length ? (
            sales.map((item, index) => (
              <tr key={index} className="hover:bg-[#f9f5f0] text-center">
                <td className="border-b border-gray-300 px-6 py-2">#{item.id}</td>
                <td className="border-b border-gray-300 px-6 py-2">{item.date}</td>
                <td className="border-b border-gray-300 px-6 py-2">₱ {item.amount}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-right">→</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-600">
                No sales records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</section>

{/* 🟫 Capital History Box */}
<section>
  <h2 className="text-2xl font-bold text-[#2e1a0e] mb-4">
    Capital History
  </h2>

  {/* Outer Box */}
  <div className="border border-black bg-white p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#d6d6d6] text-black">
            <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">
              Capital #
            </th>
            <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">
              Date
            </th>
            <th className="border-b border-[#4b2e17] px-6 py-3 text-center w-1/4">
              Total Capital
            </th>
            <th className="border-b border-[#4b2e17] px-4 py-3 w-1/6"></th>
          </tr>
        </thead>
        <tbody>
          {capital?.length ? (
            capital.map((item, index) => (
              <tr key={index} className="hover:bg-[#f9f5f0] text-center">
                <td className="border-b border-gray-300 px-6 py-2">#{item.id}</td>
                <td className="border-b border-gray-300 px-6 py-2">{item.date}</td>
                <td className="border-b border-gray-300 px-6 py-2">₱ {item.amount}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-right">→</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-600">
                No capital records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</section>

</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
