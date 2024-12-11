import { useMemo, Dispatch } from "react";
import { Transaction } from "../types";
import { entries } from "../data/entries";
import { items } from "../data/item";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TransactionActions } from "../reducers/transaction-reducer";

type TransactionListProps = {
  transactions: Transaction[];
  dispatch: Dispatch<TransactionActions>;
};

export default function TransactionList({
  transactions,
  dispatch,
}: TransactionListProps) {
  console.log(transactions)
  const entrieName = useMemo(
    () => (entrie: Transaction["entrie"]) =>
      entries.map((entry) => (entry.id === entrie ? entry.name : "")),
    [transactions]
  );
  const itemName = useMemo(
    () => (item: Transaction["item"]) =>
      items.map((it) => (it.id === item ? it.name : "")),
    [transactions]
  );

  return (
    <>
      <h2 className="text-4xl p-5 font-bold text-slate-600 text-center">
        Income & Expenses
      </h2>
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="px-4 py-2 text-gray-700 font-semibold">Entry</th>
            <th className="px-4 py-2 text-gray-700 font-semibold">Item</th>
            <th className="px-4 py-2 text-gray-700 font-semibold">Amount</th>
            <th className="px-4 py-2 text-gray-700 font-semibold">Date</th>
            <th className="px-4 py-2 text-gray-700 font-semibold"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{entrieName(+transaction.entrie)}</td>
              <td>{itemName(+transaction.item)}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch({
                      type: "set-activeId",
                      payload: { id: transaction.id },
                    });
                  }}
                >
                  <PencilSquareIcon className="h-8 w-8 text-red-800" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

