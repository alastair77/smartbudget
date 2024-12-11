import { useReducer } from "react";
import Form from "./components/Form";
import {
  initialState,
  transactionReducer,
} from "./reducers/transaction-reducer";
import TransactionList from "./components/TransactionList"; 

function App() {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  console.log(state)
  return (
    <>
      <header className="bg-slate-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white">
            BudgetSmart
          </h1>
        </div>
      </header>
      <section className="bg-slate-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch} 
            state={state} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <TransactionList
          transactions={state.transactions}
          dispatch={dispatch}
        />
      </section>
    </>
  );
}

export default App;
