import { useSelector } from 'react-redux';
import News from '../../components/news/news';

const PopularNews = () => {
  const { popularNews } = useSelector((store) => store?.news || {});
  const { popularNewsError } = useSelector((store) => store?.errors || {});
  const { isLoadingData } = useSelector((store) => store?.loader || {});

  return (
    <div>
      {isLoadingData ? (
        <h3>Loading... </h3>
      ) : (
        <News
          news={popularNews}
          error={popularNewsError}
          title="Popular News"
        />
      )}
    </div>
  );
};

export default PopularNews;
