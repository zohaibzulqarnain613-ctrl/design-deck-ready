import React, { useState, useEffect } from 'react';
import VaporizeTextCycle, { Tag } from './ui/vapour-text-effect';

interface ResponsiveVaporizeTextProps {
  texts: string[];
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
}

const ResponsiveVaporizeText: React.FC<ResponsiveVaporizeTextProps> = ({
  texts,
  color = "rgb(147, 197, 253)",
  spread = 4,
  density = 7,
  animation = {
    vaporizeDuration: 1.8,
    fadeInDuration: 0.8,
    waitDuration: 1.2
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.H2
}) => {
  const [fontSize, setFontSize] = useState(32);

  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setFontSize(24);
      } else if (width < 768) {
        setFontSize(28);
      } else {
        setFontSize(32);
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    <VaporizeTextCycle
      texts={texts}
      font={{
        fontFamily: "Inter, sans-serif",
        fontSize: `${fontSize}px`,
        fontWeight: 700
      }}
      color={color}
      spread={spread}
      density={density}
      animation={animation}
      direction={direction}
      alignment={alignment}
      tag={tag}
    />
  );
};

export default ResponsiveVaporizeText;
