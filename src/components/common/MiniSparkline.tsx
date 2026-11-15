import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface MiniSparklineProps {
  data?: number[];
  isGain?: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
  style?: ViewStyle;
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data = [10, 12, 9, 14, 11, 15, 18, 16, 20, 22],
  isGain = true,
  width = 64,
  height = 24,
  strokeWidth = 1.75,
  style,
}) => {
  const strokeColor = isGain ? '#00D09C' : '#EB5B5B';

  if (!data || data.length < 2) {
    return <View style={[{ width, height }, style]} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Generate SVG bezier / linear path
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 4) + 2;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;

  return (
    <View style={[{ width, height, justifyContent: 'center' }, style]}>
      <Svg width={width} height={height}>
        <Path
          d={pathData}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default React.memo(MiniSparkline);
