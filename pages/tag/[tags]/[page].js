import styles from 'styles/maingallery.module.css'
import pageStyle from 'styles/pagination.module.css';
import { GalleryItem } from '@comp/GalleryItem';


import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head';
import NotFound from '@comp/NotFound';

export default function TagContent({ data, curPage, tags }) {
	if (data == []) return <NotFound />
  
	const res = JSON.parse(data)
  const { result, num_pages } = res

  function pageNumbers(curPage) {
		const curPageN = parseInt(curPage);

		const p = [];

		const std = [
			curPageN - 5,
			curPageN - 4,
			curPageN - 3,
			curPageN - 2,
			curPageN - 1,
			curPageN,
			curPageN + 1,
			curPageN + 2,
			curPageN + 3,
			curPageN + 4,
			curPageN + 5,
		];

    std.forEach(val => {
    if ( val <= num_pages )
      {if (val > 0) {
        p.push(val)
      }}
    })

    

		return [...new Set(p)]
  }

  const pageNumber = pageNumbers(curPage)

  return (
		<div className={styles.base}>
			<Head>
				<title>{ tags }</title>
			</Head>
			<h3>{tags.toUpperCase()}</h3>
			<div className={styles.container}>
				{result.map((val) => {
					const { images } = val;
					return (
						<GalleryItem key={index} val={val} images={images} />
					);
				})}
			</div> 
			<div className={pageStyle.base}>
				{curPage > 1 ? (
					<Link href={`/tag/${tags}/1`}>
						<a className={pageStyle.pageButton}>First</a>
					</Link>
				) : (
					<></>
				)}
				{pageNumber.map((value, index) => {
					if (value == curPage) {
						return (
							<div
								className={pageStyle.activepageButton}
								key={index}
							>
								{value}
							</div>
						);
					} else {
						return (
							<Link key={index} href={`/tag/${tags}/${value}`}>
								<a className={pageStyle.pageButton}>{value}</a>
							</Link>
						);
					}
				})}
				{curPage < num_pages ? (
					<Link href={`/tag/${tags}/${num_pages}`}>
						<a className={pageStyle.pageButton}>Last</a>
					</Link>
				) : (
					<></>
				)}
			</div>
		</div>
  );
}

export const getServerSideProps = async ({ params }) => {

  const { tags, page } = params
	const result = await axios
		.get(`https://nhentai.net/api/galleries/search?query=english+tags:${tags}&page=${page}&sort=date`)
		.then((res) => res.data);
  // const { data } = await  // your fetch function here 
  return {
    props: {
      data: JSON.stringify(result),
      curPage: page,
      tags: tags
    }
  }
}
