import Lottie, { LottieComponentProps } from 'lottie-react';
import { useMemo } from 'react';

type AnimationProps = Omit<LottieComponentProps, 'animationData'> & {
  animation: 'loader' | 'success';
};

const Animation: React.FC<AnimationProps> = ({ animation, ...props }) => {
  const animationData = useMemo(() => {
    switch (animation) {
      case 'loader':
        return require('./animations/loader.json');
      case 'success':
        return require('./animations/success.json');
    }
  }, [animation]);
  return <Lottie animationData={animationData} {...props} />;
};

export default Animation;
