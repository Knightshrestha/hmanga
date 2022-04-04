import { useRouter } from 'next/router';
import React from 'react';
import styles from './Navbar.module.css';

const NavBar = () => {
	const router = useRouter();
	const submitContact = async (event) => {
		event.preventDefault();
		router.push('/search/' + event.target.searchFor.value);
	};

	return (
		<div className={styles.base}>
			<form className={styles.form} onSubmit={submitContact}>
				<input
					className={styles.input}
					type='text'
					required
					placeholder='Search For...'
					name='searchFor'
				/>
				<button type='submit' className={styles.button}>
					GO
				</button>
			</form>
		</div>
	);
};

export default NavBar;
