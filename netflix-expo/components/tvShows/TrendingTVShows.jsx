import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Constants from "expo-constants";

const Base_Image_URL = Constants.expoConfig.extra.Base_Image_URL;

const TrendingTVShows = ({ item, index }) => {

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/movies/details/[id]",
          params: { id: item.id, mediaType: item.media_type,start:"" },
        })
      }
    >
      <Image
      source={{ uri: `${Base_Image_URL}${item.poster_path}` }}
      style={{ width: 120, height: 180, marginLeft:index != 0 && 20 }}
      contentFit="cover"
      transition={500}
      />
    </TouchableOpacity>
  );
};

export default TrendingTVShows;
