import { inventoryAlerts } from "@/lib/hms-data";

export default function InventoryPage() {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-care-ink">Inventory management</h1>
      <div className="mt-6 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Item</th><th className="p-3">Batch</th><th className="p-3">Qty</th><th className="p-3">Status</th></tr></thead>
          <tbody>{inventoryAlerts.map((item) => <tr className="border-t" key={item.item}><td className="p-3 font-semibold">{item.item}</td><td className="p-3">{item.batch}</td><td className="p-3">{item.qty}</td><td className="p-3 text-primary">{item.status}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
