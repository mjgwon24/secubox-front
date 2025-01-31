import React, { useState, useEffect } from "react";
import styles from "./Switch.module.css";

export const Switch = ({checked = false, onChange, size = "md", disabled = false, ...props}) => {

    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = (newChecked) => {
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    const handleClick = () => {
        if (!disabled) {
            handleChange(!isChecked);
        }
    };

    const handleKeyDown = (event) => {
        if (disabled) return;

        if (event.key === " " || event.key === "Enter") {
            handleChange(!isChecked);
        }
    };

    const switchClassName = `${styles.switch} ${styles[size]} ${isChecked ? styles.checked : ""} 
    ${disabled ? styles.disabled : ""}`;

    const sliderClassName = `${styles.slider} ${styles[size]} ${isChecked ? styles.checked : ""}
    ${disabled ? styles.disabled : ""}`;

    return (
        <div
            id="switch"
            className={switchClassName}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="switch"
            aria-checked={isChecked}
            aria-disabled={disabled}
            tabIndex={0}
            {...props}
        >
            <div id="slider" className={sliderClassName}/>
        </div>
    );
};