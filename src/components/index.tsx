import * as React from 'react';
import { AbstractPaths, getAllAbstractPaths } from '../services/storage';
import Header from './header';
import Loading from './common/Loading';
import ErrorMessage from './common/ErrorMessage';
import Abstracts from './abstracts';
import styles from './index.css';

interface State {
	loading: boolean;
	error: Error | null;
	abstracts: AbstractPaths;
}

class Root extends React.Component<any, State> {
	state = {
		abstracts: {},
		loading: true,
		error: null,
	};
	async componentDidMount() {
		try {
			const abstracts = await getAllAbstractPaths();
			this.setState({ abstracts });
		} catch (error) {
			this.setState({ error });
		} finally {
			this.setState({ loading: false });
		}
	}
	render() {
		const { error, loading, abstracts } = this.state;
		if (loading) return <Loading />;
		if (error) return <ErrorMessage>{error}</ErrorMessage>;
		return (
			<div className={styles.container}>
				<Header />
				<Abstracts abstracts={abstracts} />
			</div>
		);
	}
}

export default Root;
