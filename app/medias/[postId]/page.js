import Tablo from "../../../components/data/Tablo";
import Card from "../../../components/mediacard/Card";
function medias({ params }) {
  const decode = decodeURIComponent(params.postId);

  const myfilter = Tablo.filter((filter) => filter.mediatype == decode);

  return (
    <div className="mt-36">
      <Card myfilter={myfilter}/>
    </div>
  );
}

export default medias;
