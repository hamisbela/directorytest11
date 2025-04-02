import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideIn' | 'scaleUp' | 'bounce';

interface AnimateProps {
  children: React.ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
}

const Animate: React.FC<AnimateProps> = ({
  children,
  type = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
  triggerOnce = true
}) => {
  const [shouldRender, setShouldRender] = useState(!triggerOnce);
  
  useEffect(() => {
    // If triggerOnce is true, we want to render immediately
    if (triggerOnce) {
      setShouldRender(true);
    }
  }, [triggerOnce]);

  // Animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration,
          delay
        }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration,
          delay
        }
      }
    },
    slideIn: {
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration,
          delay
        }
      }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration,
          delay
        }
      }
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants[type]}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Animate;