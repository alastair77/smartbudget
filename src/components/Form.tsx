import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../types";
import { entries } from "../data/entries";
import { items } from "../data/item";
import {
  TransactionActions,
  TransactionState,
} from "../reducers/transaction-reducer";

type FormProps = {
  dispatch: Dispatch<TransactionActions>;
  state: TransactionState;
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const initialState: Transaction = {
  id: uuidv4(),
  entrie: 1,
  item: 4,
  amount: 0,
  date: getCurrentDate(),
};

export default function Form({ dispatch, state }: FormProps) {
  const [transaction, setTransaction] = useState<Transaction>(initialState);
  console.log(transaction)
  useEffect(() => {
    if(state.activeId) {
      const selectedTransaction = state.transactions.filter(stateTransaction => 
        stateTransaction.id === state.activeId)[0]
        setTransaction(selectedTransaction);
      }
    
  }, [state.activeId])

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    
    const isNumberField = ["item", "entrie", "amount"].includes(e.target.id);
    setTransaction({
      ...transaction,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidTransaction = () => {
    const { amount } = transaction;
    return amount > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e.target)
    e.preventDefault();
    dispatch({
      type: "save-transaction",
      payload: { newTransaction: transaction },
    });

    setTransaction({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Entrie */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="entrie" className="font-bold">
          Entry:
        </label>
        <select
          name=""
          id="entrie"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={transaction.entrie}
          onChange={handleChange}
        >
          {entries.map((entrie) => (
            <option key={entrie.id} value={entrie.id}>
              {entrie.name}
            </option>
          ))}
        </select>
      </div>

      {/* Item */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="item" className="font-bold">
          Item:
        </label>
        <select
          name=""
          id="item"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={transaction.item}
          onChange={handleChange}
        >
          {/*Filtra el arreglo dependiendo del valor de Entrie  */}
          {items
            .filter((item) => item.idEntrie === transaction.entrie)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      {/* Amount */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="amount" className="font-bold">
          Amount:
        </label>
        <input
          id="amount"
          type="number"
          placeholder="$"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={transaction.amount}
          onChange={handleChange}
        />
      </div>

      {/* Date  */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="date" className="font-bold">
          Date:
        </label>
        <input
          id="date"
          type="date"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={transaction.date}
          onChange={handleChange}
        />
      </div>

      {/*Submit */}
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10"
        disabled={!isValidTransaction()}
        value={transaction.entrie === 1 ? "Submit income" : "Submit expense"}
      />
    </form>
  );
}
