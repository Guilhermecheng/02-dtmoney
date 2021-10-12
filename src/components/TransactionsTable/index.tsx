import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";


export function TransactionsTable() {
    const { transactions } = useTransactions();
    console.log(transactions)

    return (
        <Container>
            <table>
                <thead>
                    <th>Título</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </thead>
                <tbody>
                    
                    {transactions.map(transact => {
                        return (
                            <tr key={transact.id}>
                                <td>{transact.title}</td>
                                <td className={transact.type}>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transact.amount)}
                                </td>
                                <td>{transact.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-BR').format(
                                        new Date(transact.createdAt)
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )    
}