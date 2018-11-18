import * as React from 'react';
import styles from './Controls.css';
import CommentForm from './CommentForm';

interface Props {
	currentCategory: string;
	allCategories: string[];
	onCategoryChange: (cat: string) => void;
	onAnnotationToggle: () => void;
	onCommentSuccess: () => void;
	showAnnotation: boolean;
	abstractName: string;
}

interface State {
	showCommentForm: boolean;
}

class Controls extends React.Component<Props, State> {
	state = {
		showCommentForm: false,
	};
	render() {
		const {
			currentCategory,
			allCategories,
			onCategoryChange,
			showAnnotation,
			onAnnotationToggle,
			onCommentSuccess,
		} = this.props;
		return (
			<div className={styles.container}>
				<select
					className={styles.categorySelector}
					value={currentCategory}
					onChange={e => onCategoryChange(e.target.value)}
				>
					{allCategories.map(cat => (
						<option value={cat} key={cat}>
							{cat}
						</option>
					))}
				</select>
				<button
					className={showAnnotation ? styles.toggleButtonActive : undefined}
					onClick={onAnnotationToggle}
				>
					{showAnnotation ? 'Hide Annotation' : 'Show Annotation'}
				</button>
				<button onClick={() => this.setState({ showCommentForm: true })}>
					Leave comment
				</button>
				<CommentForm
					show={this.state.showCommentForm}
					onClose={() => this.setState({ showCommentForm: false })}
					onSuccess={onCommentSuccess}
					abstractName={this.props.abstractName}
				/>
			</div>
		);
	}
}

export default Controls;
