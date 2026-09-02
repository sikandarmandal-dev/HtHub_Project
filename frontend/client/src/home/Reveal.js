import { useEffect, useRef, useState } from "react";

export default function Reveal({ children }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        setVisible(true);
                    });

                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -60px 0px",
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,

                transform: visible
                    ? "translate3d(0,0,0)"
                    : "translate3d(0,60px,0)",

                transition: `
          opacity 0.9s ease-out,
          transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)
        `,

                willChange: "opacity, transform",
                backfaceVisibility: "hidden",
            }}
        >
            {children}
        </div>
    );
}