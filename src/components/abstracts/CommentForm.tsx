import * as React from 'react';
import styles from './CommentForm.css';
import { COMMENT_ABSTRACT_API } from '../../config/googleCloud';
import ErrorMessage from '../common/ErrorMessage';
import Loading from '../common/Loading';

interface Props {
	show: boolean;
	abstractName: string;
	onClose: () => void;
	onSuccess: () => void;
}

interface State {
	password: string;
	comment: string;
	loading: boolean;
	error: Error | null;
	success: boolean;
}

class CommentForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			password: '',
			comment: '',
			loading: false,
			error: null,
			success: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	handleInput(field: keyof State) {
		return (event: any) =>
			this.setState({ [field]: event.target.value } as any);
	}
	async handleSubmit() {
		const { abstractName, onSuccess } = this.props;
		const { password, comment } = this.state;
		this.setState({ loading: true, error: null });
		try {
			const url = `${COMMENT_ABSTRACT_API}?password=${password}&abstract=${abstractName}&comment=${comment}`;
			const response = await fetch(url);
			const data = await response.json();
			if (data.error) throw data.error;
			this.setState({ success: true });
			onSuccess();
		} catch (error) {
			this.setState({ error });
		} finally {
			this.setState({ loading: false });
		}
	}
	handleClose() {
		this.setState({ loading: false, error: null, success: false });
		this.props.onClose();
	}
	render() {
		const { show } = this.props;
		const { loading, error, success } = this.state;
		if (!show) return null;
		return (
			<div className={styles.container} onClick={this.handleClose}>
				<div className={styles.form} onClick={e => e.stopPropagation()}>
					{success ? (
						'Send comment successfully.'
					) : (
						<React.Fragment>
							<h2 className={styles.header}>Leave comment</h2>
							<div className={styles.label}>Security code</div>
							<input
								className={styles.passwordInput}
								value={this.state.password}
								onChange={this.handleInput('password')}
								type="text"
								autoFocus={true}
							/>
							<div className={styles.label}>Comment</div>
							<textarea
								className={styles.commentInput}
								value={this.state.comment}
								onChange={this.handleInput('comment')}
							/>
						</React.Fragment>
					)}
					{loading && <Loading />}
					{error && <ErrorMessage>{error}</ErrorMessage>}
					<div className={styles.buttons}>
						{success ? (
							<button onClick={this.handleClose}>Done</button>
						) : (
							<React.Fragment>
								<button onClick={this.handleClose}>Cancel</button>
								<button onClick={this.handleSubmit}>Submit</button>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default CommentForm;
