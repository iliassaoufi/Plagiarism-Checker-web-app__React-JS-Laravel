import React from "react";

export default function FormError({ errors }) {
    return (
        <div style={styles.full}>
            {errors.length > 0 &&
                errors.map((error, index) => (
                    <p key={index} style={styles.error}>{error} *</p>
                ))
            }

        </div>
    );
}

const styles = {
    full: {
        width: "90%",
        marginTop: "10px",
    },
    error: {
        width: "100%",
        color: "#da2020f1",
        fontSize: "13px",
        textAlign: "start",
    },
};
