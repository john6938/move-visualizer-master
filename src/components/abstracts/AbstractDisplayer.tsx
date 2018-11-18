import * as React from 'react';
import styles from './AbstractDisplayer.css';
import { FilePath } from '../../services/storage';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import AbstractText from './AbstractText';

interface Props {
	abstractPath: FilePath;
	showAnnotation: boolean;
}

interface State {
	loading: boolean;
	error: Error | null;
	abstract: any;
}

class AbstractDisplayer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: true,
			error: null,
			abstract: '',
		};
		this.fetchAbstract = this.fetchAbstract.bind(this);
	}
	async fetchAbstract() {
		this.setState({ loading: true, error: null });
		try {
			const response = await fetch(this.props.abstractPath.downloadUrl);
			const xml = await response.text();
			this.setState({ abstract: xml });
		} catch (error) {
			this.setState({ error });
		} finally {
			this.setState({ loading: false });
		}
	}
	componentDidMount() {
		this.fetchAbstract();
	}
	componentDidUpdate(prevProps: Props) {
		if (this.props.abstractPath !== prevProps.abstractPath) {
			this.fetchAbstract();
		}
	}
	render() {
		const { showAnnotation } = this.props;
		const { loading, error, abstract } = this.state;
		if (loading) return <Loading />;
		if (error) return <ErrorMessage>{error}</ErrorMessage>;
		return (
			<div className={styles.container}>
				<div className={styles.title}>{this.props.abstractPath.name}</div>
				<div className={styles.content}>
					<AbstractText xmlText={abstract} showAnnotation={showAnnotation} />
				</div>
			</div>
		);
	}
}

export default AbstractDisplayer;
