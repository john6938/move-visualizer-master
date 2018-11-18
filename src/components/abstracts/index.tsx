import * as React from 'react';
import styles from './index.css';
import { AbstractPaths } from '../../services/storage';
import AbstractDisplayer from './AbstractDisplayer';
import Controls from './Controls';

interface Props {
	abstracts: AbstractPaths;
}

interface State {
	category: string;
	index: number;
	showAnnotation: boolean;
}

class Abstracts extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			category: Object.keys(this.props.abstracts)[0],
			index: 0,
			showAnnotation: false,
		};
		this.handleCatChange = this.handleCatChange.bind(this);
		this.handleAnnotationToggle = this.handleAnnotationToggle.bind(this);
		this.getPageMax = this.getPageMax.bind(this);
		this.handlePageBack = this.handlePageBack.bind(this);
		this.handlePageForward = this.handlePageForward.bind(this);
		this.handlePageNumberInput = this.handlePageNumberInput.bind(this);
	}
	handleCatChange(category: string) {
		this.setState({
			category,
			index: 0,
		});
	}
	handleAnnotationToggle() {
		this.setState(prevState => ({ showAnnotation: !prevState.showAnnotation }));
	}
	getPageMax() {
		return this.props.abstracts[this.state.category].length - 1;
	}
	handlePageBack() {
		const pageMax = this.getPageMax();
		this.setState(prevState => ({
			index: prevState.index === 0 ? pageMax : prevState.index - 1,
		}));
	}
	handlePageForward() {
		const pageMax = this.getPageMax();
		this.setState(prevState => ({
			index: prevState.index === pageMax ? 0 : prevState.index + 1,
		}));
	}
	handlePageNumberInput(event: any) {
		const input: string = event.target.value;
		// Check if input is number
		if (!/^\d+$/.test(input)) return;

		const newIndex = parseInt(input, 10);
		if (newIndex < 1 || newIndex > this.getPageMax() + 1) return;
		this.setState({ index: newIndex - 1 });
	}
	render() {
		const { abstracts } = this.props;
		const { category, index, showAnnotation } = this.state;
		const allCategories = Object.keys(abstracts);
		const abstractPath = abstracts[category][index];
		return (
			<div className={styles.container}>
				<Controls
					currentCategory={category}
					allCategories={allCategories}
					onCategoryChange={this.handleCatChange}
					showAnnotation={showAnnotation}
					onAnnotationToggle={this.handleAnnotationToggle}
					abstractName={abstractPath.name}
					onCommentSuccess={this.handlePageForward}
				/>
				<div className={styles.abstractContainer}>
					<AbstractDisplayer
						abstractPath={abstractPath}
						showAnnotation={showAnnotation}
					/>
				</div>
				<div className={styles.bottomControl}>
					<button onClick={this.handlePageBack}>Previous</button>
					<div className={styles.pageNumber}>
						<input
							value={index + 1}
							onChange={this.handlePageNumberInput}
							onFocus={(e: any) => e.target.select()}
						/>
						{' / '}
						{this.getPageMax() + 1}
					</div>
					<button onClick={this.handlePageForward}>Next</button>
				</div>
			</div>
		);
	}
}

export default Abstracts;
