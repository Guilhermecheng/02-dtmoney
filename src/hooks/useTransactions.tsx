import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionCreate {
    transaction: Transaction;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')        
        .then(response => {
            let { transactions } = response.data;
            setTransactions(transactions)
        });
    }, []);

    async function createTransaction(transactionInput: TransactionInput) { 
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });

        const newTransaction = await response.data as unknown as TransactionCreate;
        const transaction = newTransaction.transaction;

        setTransactions([...transactions, transaction]);
    }

    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
