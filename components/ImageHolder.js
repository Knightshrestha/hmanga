import Image from 'next/image';

const i = { t: 'j', w: 1200, h: 1711 };

const ImageHolder = ({ t, w, h, media_id, index, id }) => {
  var ect = { j: 'jpg', p: 'png'}
  const page = parseInt(index) + 1
  const url =
		'https://i3.nhentai.net/galleries/' +
		parseInt(media_id) +
		'/' +
		page +
		'.' +
		ect[t];
  return (
    <Image
        width={parseInt(w)}
        height={h}
        src={url}
        alt="something went wrong"
    />
  )
}

const CoverHolder = ({ t, w, h, media_id }) => {
	var ect = { j: 'jpg', p: 'png' };
	const url =
		'https://t3.nhentai.net/galleries/' +
		parseInt(media_id) +
		'/cover.' +
		ect[t];
	return (
		<Image
			width={parseInt(w)}
			height={h}
			src={url}
			alt='something went wrong'
		/>
	);
};

const ThumbHolder = ({ t, w, h, media_id }) => {
	var ect = { j: 'jpg', p: 'png' };
	const url =
		'https://t3.nhentai.net/galleries/' +
		parseInt(media_id) +
		'/thumb.' +
		ect[t];
	return (
		<Image
			width={parseInt(w)}
			height={h}
			src={url}
			alt='something went wrong'
		/>
	);
};


export { ImageHolder, CoverHolder, ThumbHolder };