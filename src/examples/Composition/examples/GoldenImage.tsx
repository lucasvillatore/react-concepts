import { BaseImage } from '../components/BaseImage';
import { BorderFrame } from '../components/BorderFrame';

const IMG_URL = "https://picsum.photos/id/10/300/200";

export const GoldBorderImage = () => {
  return (
    <BorderFrame color="gold" width="8px" style="double" padding="8px">
      <BaseImage src={IMG_URL} alt="Paisagem Dourada" />
    </BorderFrame>
  );
};
