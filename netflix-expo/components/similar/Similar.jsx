import { Image } from "expo-image";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Base_Image_URL = Constants.expoConfig.extra.Base_Image_URL;

const Similar = ({ item, index,mediaType }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => {
      router.push({
        pathname: "/movies/similarDetails/[id]",
        params: { id: item.id, mediaType: mediaType, start: "" },
      })
    }} >
      <Image
        source={{ uri: `${Base_Image_URL}${item.poster_path}` }}
        style={{ width: 150, height: 180, marginLeft: index != 0 && 20 }}
        contentFit="cover"
        transition={500}
      />
    </TouchableOpacity>
  );
};

export default Similar;
