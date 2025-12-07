import React from "react";
import ActionButton from "@/Components/ActionButton";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";

export default function InventoryTable({
  title,
  products,
  editProduct,
  deleteProduct,
  archiveProduct,
  unarchiveProduct,
  lowStock = false,
  archived = false,
}) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-black mb-3 mt-8">{title}</h2>

      <div className="border border-[#4b2e17] bg-white shadow-[5px_5px_0px_gray] p-4 overflow-x-auto w-[68rem]">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#d6d6d6] text-black border-b border-[#4b2e17]">
            <tr>
              {[
                "Product Image",
                "Product #",
                "Category",
                "Product Name",
                "Price",
                "Quantity",
                "Actions",
              ].map((th) => (
                <th key={th} className="px-3 py-2 text-left text-sm font-semibold">
                  {th}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <tr
                  key={item.id}
                  className={`${lowStock ? "bg-[#fff4e1]" : "bg-white"} text-sm text-gray-700`}
                >
                  <td className="px-3 py-2">
                    <img
                      src={`/${item.file_path}`}
                      alt={item.name}
                      className="w-12 h-12 rounded-md"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </td>

                  <td className="px-3 py-2">{item.id}</td>
                  <td className="px-3 py-2">{item.category}</td>
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">₱ {item.price}</td>
                  <td className="px-3 py-2">{item.quantity}</td>

                  <td className="px-3 py-2 flex justify-center gap-2">
                    {!archived && (
                      <>
                        <ActionButton
                          color="#44b954"
                          hover="#297233"
                          onClick={() => editProduct(item.id)}
                        >
                          <IconPencil size={16} />
                        </ActionButton>

                        <ActionButton
                          color="#f12323"
                          hover="#9e1818"
                          onClick={() => deleteProduct(item.id)}
                        >
                          <IconTrash size={16} />
                        </ActionButton>

                        <ActionButton
                          color="#753500"
                          hover="#532600"
                          onClick={() => archiveProduct(item.id)}
                        >
                          <IconEye size={16} />
                        </ActionButton>
                      </>
                    )}

                    {archived && (
                      <ActionButton
                        color="#2970ff"
                        hover="#1e4fb8"
                        onClick={() => unarchiveProduct(item.id)}
                      >
                        Unarchive
                      </ActionButton>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
