import { useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);



    const trailX = useSpring(cursorX, {
        damping: 40,
        stiffness: 200,
    });

    const trailY = useSpring(cursorY, {
        damping: 40,
        stiffness: 200,
    });

    const handleMouseMove = useCallback(
        (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        },
        [cursorX, cursorY]
    );

    useEffect(() => {
        window.addEventListener("pointermove", handleMouseMove);

        return () => {
            window.removeEventListener("pointermove", handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <>
            {/* Trail glow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: trailX,
                    y: trailY,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(255, 122, 26, 0.15) 0%, transparent 70%)",
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Main dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-accent-orange)",
                    boxShadow: "0 0 15px 3px rgba(255, 122, 26, 0.6)",
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};

export default CustomCursor;