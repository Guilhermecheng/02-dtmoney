import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransaciontModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import { TransactionsProvider } from './TransactionsContext';

Modal.setAppElement('#root');

export function App() {

	const [isNewTransacionModalOpen, setIsNewTransacionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransacionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransacionModalOpen(false);
    }

	return (
		<TransactionsProvider>
			<Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
			<Dashboard />

			<NewTransaciontModal isOpen={isNewTransacionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

			<GlobalStyle />
		</TransactionsProvider>
	);
}
