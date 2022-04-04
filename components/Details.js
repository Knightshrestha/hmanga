import Link from 'next/link';
import React from 'react';
import styles from '@styles/Detail.module.css';

const Details = ({ tags }) => {
	function renderTags(tags) {
		const tags_dict = {};
		tags.forEach((tag) => {
			if (!tags_dict[tag.type]) {
				tags_dict[tag.type] = [tag];
			} else {
				tags_dict[tag.type] = [...tags_dict[tag.type], tag];
			}
		});
		return tags_dict;
	}

	const sortList = renderTags(tags);

	function parseTags(tag_entry) {
		const key = tag_entry[0]
		const val = tag_entry[1]
		return(<Detail keyName={key} tagList={val} key={key} />)
	}

	return (
		<div className={styles.box}>
			{Object.entries(sortList).map(parseTags)}
		</div>
	);
};

const Detail = ({ keyName, tagList }) => {
	return (
		<div className={styles.main}>
			<div className={styles.keyName}>
				{keyName.charAt(0).toUpperCase() + keyName.slice(1)}
				{': '}
			</div>
			{tagList.map((tag) => {
				return (
					<Link key={tag.id} href={tag.url}>
						<a className={styles.Holder}>
							<span className={styles.name}>{tag.name}</span>
							<span className={styles.count}>{tag.count}</span>
						</a>
					</Link>
				);
			})}
		</div>
	);
};

export default Details;
