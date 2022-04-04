import styles from 'styles/galleryPage.module.css';
import styl from '@styles/Detail.module.css';

import Image from 'next/image';
import { ImageHolder, CoverHolder } from '@components/ImageHolder';
import axios from 'axios'
import Loading from '@components/Loading';
import Head from 'next/head';
import Details from '@components/Details';

export default function GalleryPage({ data }) {

	if (!data) return <Loading />
	
	const parsed = JSON.parse(data)

	const { media_id, images, id, tags, num_pages, upload_date, scanlator } = parsed
	const { pages, cover } = images



	const date = new Date('2019-02-19T23:00:00.000000').toLocaleDateString(
		'en-gb',
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'utc',
		}
	);
	const time = new Date(upload_date * 1000).toLocaleTimeString('en-us', {
		timeZone: 'UTC',
		timeZoneName: 'short',
	});
  
	const minute = 1000 * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const year = day * 365;

	var date2 = new Date()

	var diff = date2 - upload_date * 1000

	var year2 = Math.floor(diff/(year))
	var days = Math.floor((diff - year2 * year)/day)

	return (
		<>
			<Head>
				<title>{parsed.title.pretty}</title>
			</Head>
			<div className={styles.main}>
				<h1>{parsed.title.pretty}</h1>
				<p>#{id}</p>
				<CoverHolder
					w={cover.w}
					h={cover.h}
					t={cover.t}
					media_id={media_id}
				/>
				<Details tags={tags} />
				<div className={styl.main}>
					<div className={styl.keyName}>Pages: </div>
					<div className={styl.Holder}>
						<span className={styl.name}> {num_pages}</span>
						<span className={styl.count}></span>
					</div>
				</div>
				<div>
					<div className={styl.main}>
						<div className={styl.keyName}>Uploaded date: </div>
						<div className={styl.Holder}>
							<span className={styl.name}> {date}</span>
							<span className={styl.count}>{time}</span>
						</div>
					</div>
					<div className={styl.main}>
						<div className={styl.keyName}>Before: </div>
						<div className={styl.Holder}>
							<span className={styl.name}>
								{' '}
								{year2 + ' years '}
							</span>
							<span className={styl.count}>
								{days + ' days ago'}
							</span>
						</div>
					</div>
				</div>
<div className={styles.spacer} />
				<div>
					{pages.map((page, index) => {
						return (
							<div key={index}>
								<ImageHolder
									t={page.t}
									id={id}
									w={page.w}
									h={page.h}
									media_id={media_id}
									index={index}
								/>
								<p>{'Page ' + (index + 1)}</p>
							</div>
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
