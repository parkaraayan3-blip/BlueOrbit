import { motion } from 'framer-motion';

const defaultAnimations = {
  hidden: { opacity: 0, y: "1.2em", rotate: 0.001 },
  visible: {
    opacity: 1,
    y: "0em",
    rotate: 0.001,
    transition: {
      duration: 1.0,
      ease: [0.215, 0.610, 0.355, 1.000], // power3.out
    },
  },
};

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = true,
  delay = 0,
}) => {
  return (
    <Wrapper className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={{
          visible: { transition: { staggerChildren: 0.02, delayChildren: delay } },
          hidden: {},
        }}
        aria-hidden
      >
        {text.split(" ").map((word, wordIndex) => (
          <span className="inline-block overflow-hidden" key={`${word}-${wordIndex}`}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                variants={defaultAnimations}
                className="inline-block"
                key={`${char}-${charIndex}`}
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Wrapper>
  );
};
