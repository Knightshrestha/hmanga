import styles from 'styles/galleryPage.module.css';
import Image from 'next/image';
import { ImageHolder, CoverHolder } from '@components/ImageHolder';
import axios from 'axios'
import Loading from '@components/Loading';
import Head from 'next/head';
import Details from '@components/Details';

export default function GalleryPage({ data }) {

	if (!data) return <Loading />
	
	const parsed = JSON.parse(data)

	const { media_id, images, id, tags } = parsed
	const { pages, cover } = images
  
	return (
		<>
			<Head>
				<title>{parsed.title.pretty}</title>
			</Head>
			<div className={styles.main}>
				<h2>{parsed.title.pretty}</h2>
				<p>#{id}</p>
				<CoverHolder w={cover.w} h={cover.h} t={cover.t} media_id={media_id}/>
				<Details tags={tags} />
				<div>
					{pages.map((page, index) => {
						return (
							<ImageHolder
								t={page.t}
								id={id}
								key={index}
								w={page.w}
								h={page.h}
								media_id={media_id}
								index={index}
							/>
						);
					})}
				</div>
			</div>
		</>
	);

  
}

export async function getServerSideProps({ params }) {
	
	const id = params.code
	const result = await axios.get(`https://nhentai.net/api/gallery/${id}`).then( res=> res.data)

	return {
		props: {
			data: JSON.stringify(result),
		},
	};
}
