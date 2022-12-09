import { ColorRing } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrapper>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#303f9f', '#3f51b5', '#303f9f', '#3f51b5', '#849b87']}
      />
    </Wrapper>
  );
};
