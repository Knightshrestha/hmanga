import Link from 'next/link';
import { ThumbHolder } from '@components/ImageHolder';
import styles from './GalleryItem.module.css'

export const GalleryItem = ({val, images}) => {
	return (
		<div key={val.id} className={styles.gallery}>
			<Link href={`/view/${val.id}`}>
				<a className={styles.a}>
					<ThumbHolder
						h={images.thumbnail.h}
						w={images.thumbnail.w}
						t={images.thumbnail.t}
						media_id={val.media_id}
						className={styles.gal}
					/>
					<div className={styles.caption}>{val.title.pretty}</div>
				</a>
			</Link>
		</div>
	);
}
